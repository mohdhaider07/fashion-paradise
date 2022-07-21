const router = require("express").Router();
const cryptoJs = require("crypto-js");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");
const { json } = require("express");

// CREATE
router.post("/", verifyToken, async (req, res) => {
	const newOrder = new Order(req.body);
	try {
		const savedOrder = await newOrder.save();

		res.status(201).json(savedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});
// // //UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(201).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});
// // // //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json("Order has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});
// // // //GET all  Cart

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
	console.log("geting orders");
	try {
		const orders = await Order.find({ userId: req.params.id }).sort({
			createdAt: -1,
		});
		console.log(orders);
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});
// //GET ALL Product
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	const query = req.query.new;
	console.log(query);
	try {
		const orders = query
			? await Order.find()
					.populate("userId", "name")
					.sort({ createdAt: -1 })
					.limit(5)
			: await Order.find();
		// console.log(orders[0]);
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET MONTHLY INCOME

router.get("/find/income", verifyTokenAndAdmin, async (req, res) => {
	console.log("income page");
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(
		new Date().setMonth(lastMonth.getMonth() - 1)
	);

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: previousMonth } } },
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$amount",
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);
		res.status(200).json(income);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
