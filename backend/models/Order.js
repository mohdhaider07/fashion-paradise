const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OrderSchema = mongoose.Schema(
	{
		userId: { type: ObjectId, ref: "User" },
		products: [
			{
				productId: {
					type: ObjectId,
					ref: "Product",
				},
				quantity: {
					type: Number,
					default: 1,
				},
				title: {
					type: String,
				},
				price: {
					type: Number,
				},
				size: {
					type: String,
				},
				color: {
					type: String,
				},
			},
		],
		razorpay: {
			orderId: String,
			paymentId: String,
			signature: String,
		},
		amount: { type: Number, required: true },
		address: { type: Object, required: true },
		phone: { type: Object, required: true },
		status: { type: String, default: "pending" },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
