// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment", async (req, res) => {
// 	var chargeObject = {};
// 	chargeObject.amount = req.body.amount;
// 	chargeObject.currency = "usd";
// 	chargeObject.source = req.body.tokenId;

// 	await stripe.paymentIntents.create
// 		.create(chargeObject)
// 		.then((charge) => {
// 			console.log("created");
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// module.exports = router;
// // chargeObject.amount = req.body.amount;
// // 	chargeObject.currency = "usd";
// // 	chargeObject.source = req.body.tokenId;
