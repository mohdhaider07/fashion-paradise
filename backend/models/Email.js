const mongoose = require("mongoose");
const EmailSchema = new mongoose.Schema(
	{
		email: { type: String, require: true, unique: true },
		otp: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);
