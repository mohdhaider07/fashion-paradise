const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken } = require("./verifyToken");
const Razorpay = require("razorpay");
const Product = require("../models/Product");

const total = async (productArrayCart) => {
	let total = 0;

	for (let i = 0; i < productArrayCart.length; i++) {
		let product = await Product.findById(productArrayCart[i].productId);

		total += product.price * productArrayCart[i].quantity;
	}
	return total;
};

router.get("/get-razorpay-key", (req, res) => {
	res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", verifyToken, async (req, res) => {
	const { productArrayCart } = req.body;
	// console.log("CREATE ORDER ");
	let amount = await total(productArrayCart);
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});
		const options = {
			amount: amount * 100,
			currency: "INR",
		};
		// console.log("INSIDE CREATE ORDER 35 ");
		const order = await instance.orders.create(options);
		if (!order) {
			return res.status(500).send("Some error occured");
		}
		// console.log("INSIDE CREATE ORDER 37 ");
		res.status(201).send(order);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/pay-order", verifyToken, async (req, res) => {
	// console.log(" INSIDE pay-orde  ");
	const {
		razorpayPaymentId,
		razorpayOrderId,
		razorpaySignature,
		productArrayCart,
		address,
		phone,
	} = req.body;

	let amount = await total(productArrayCart);
	try {
		const newOrder = Order({
			userId: req.user.id,
			products: productArrayCart,
			razorpay: {
				orderId: razorpayOrderId,
				paymentId: razorpayPaymentId,
				signature: razorpaySignature,
			},
			amount: amount,
			address: address,
			phone: phone,
		});
		await newOrder.save();
		res.send({
			msg: "Payment was successfull",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

module.exports = router;
