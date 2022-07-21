const router = require("express").Router();
const cryptoJs = require("crypto-js");
const User = require("../models/User");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");
//UPDATE
router.put("/:id", async (req, res) => {
	console.log(req.body.password);
	console.log(req.params.id);
	if (req.body.password) {
		req.body.password = cryptoJs.AES.encrypt(
			req.body.password,
			process.env.CRYPTO_JS_KEY
		).toString();
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		const { password, ...other } = updatedUser._doc;
		console.log(other);
		res.status(201).json(other);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "User has been deleted" });
	} catch (err) {
		res.status(500).json(err);
	}
});
//GET user
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...other } = user._doc;
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
});
//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	const query = req.query.new;
	console.log(query);
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).select("-password").limit(5)
			: await User.find().select("-password");
		// const { password, ...other } = users._doc;
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/find/stats", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
