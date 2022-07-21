const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
		console.log(
			req.body.username,
			"  	",
			req.body.email,
			"		",
			req.body.password
		);
		return res
			.status(400)
			.json({ message: "PLEASE FILL TRHE FORM CORRECTLY" });
	}
	const user = await User.findOne({
		$or: [{ username: req.body.username }, { email: req.body.email }],
	});
	if (user) {
		return res
			.status(400)
			.json({ message: "This username or email is already in taken" });
	}
	const newUser = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: cryptoJs.AES.encrypt(
			req.body.password,
			process.env.CRYPTO_JS_KEY
		).toString(),
		phone: req.body.phone,
		address: req.body.address,
	});
	try {
		const savedUser = await newUser.save();
		const { password, ...others } = savedUser._doc;
		res.status(201).json(others);
	} catch (err) {
		console.log("register user", err);
		res.status(500).json(err);
	}
});
// LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(401).json({ message: "Username don't  exist" });
		}
		const decryptedPassword = cryptoJs.AES.decrypt(
			user.password,
			process.env.CRYPTO_JS_KEY
		).toString(cryptoJs.enc.Utf8);

		if (decryptedPassword !== req.body.password)
			return res.status(401).json({ message: "Wrong credentials!" });
		console.log("log in success");
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "7d" }
		);
		const { password, ...others } = user._doc;
		res.status(201).json({ ...others, accessToken });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
