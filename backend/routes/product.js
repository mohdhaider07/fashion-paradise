const router = require("express").Router();
const cryptoJs = require("crypto-js");
const User = require("../models/User");
const Product = require("../models/Product");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");
const { query } = require("express");

// CREATE
router.post("/", async (req, res) => {
	const newProduct = new Product(req.body);
	try {
		const savedProduct = await newProduct.save();

		res.status(201).json(savedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.status(201).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});
// //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Product has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});
// //GET Product
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});
//GET ALL Product
router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;
		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(5);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/search/:query", async (req, res) => {
	// console.log(req.params.query);
	try {
		const items = await Product.find({
			$or: [
				{ title: { $regex: req.params.query, $options: "i" } },
				{ dec: { $regex: req.params.query, $options: "i" } },
			],
		}).select("_id title");

		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

module.exports = router;
