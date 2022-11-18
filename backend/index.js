const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const verifyRoute = require("./routes/verify"); 
const razorpayRoute = require("./routes/razorpay");
const cors = require("cors");
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

mongoose
	.connect(
		"mongodb+srv://mohdhaider07:<password>@mernproject.1v6he.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("DB connected");
	})
	.catch((error) => {
		console.log("DB error", error);
	});

app.get("/", async (req, res) => {
	res.send("app running on this ");
});

app.use("/api/checkout", razorpayRoute);
app.use("/api/verify", verifyRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// let PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, () => {
	console.log(`server running on ${process.env.PORT}`);
});
