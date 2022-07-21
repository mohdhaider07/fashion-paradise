const Email = require("../models/Email");
const router = require("express").Router();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { find, findOneAndUpdate } = require("../models/Email");
const User = require("../models/User");
const OAuth2 = google.auth.OAuth2;

dotenv.config();

const oauth2Client = new OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
	refresh_token: process.env.REFRESH_TOKEN,
});

const createTransporter = async () => {
	const oauth2Client = new OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		"https://developers.google.com/oauthplayground"
	);

	oauth2Client.setCredentials({
		refresh_token: process.env.REFRESH_TOKEN,
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				console.log(err);
				reject();
			}
			resolve(token);
		});
	});

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.AUTH_USER,
			accessToken,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
		},
	});

	return transporter;
};

const sendEmail = async (emailOptions) => {
	let emailTransporter = await createTransporter();
	await emailTransporter.sendMail(emailOptions);
};

// router.post("/sendmail", (req, res) => {
// 	const { to, subject, message } = req.body;
// });

router.post("/email", async (req, res) => {
	let otp = Math.trunc(Math.random() * 100000 + 1);

	const savedUser = await User.findOne({ email: req.body.email });
	if (savedUser) {
		return res.status(500).send({ message: "user Already exist" });
	}

	await sendEmail({
		subject: "OUR SHOP OTP ",
		html: `<div style="display: flex;   ">
		<div style="border-radius: 0.5rem;  width: 20rem;  padding-bottom: 2rem;  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
		">
			<div style="background-color:#14b8a6; height: 1.5rem; text-align: center; padding: 8px; border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem; 
			 ">
				<span style="color: #ffffff; font-size: 1.125rem;
				line-height: 1.75rem; "> Your Verification Code</span>
			</div>
			<div style="height:10rem ;   text-align: center; ">
				<div style="color: #6b7280; font-size: 0.9rem;
				line-height: 1.75rem; margin-top: 20px;"> Enter this Verification code in field:</div>
				<br />
				<div style="text-align: center; ">
	
					<span
						style=" background-color:#d1d5db;  font-size: 1.5rem;letter-spacing: 0.2em; 
			   line-height: 1.75rem; margin-top: 10px; padding: 15px; border-radius: 9999px;  width: fit-content; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); ">
						${otp}
					</span>
				</div>
				<br />
				<div style="color: #9ca3af; font-size: 0.9rem;font-style: italic; 
				line-height: 1.75rem; margin-top: 10px;"> Verification code is valid only for 30min </div>
	
	
			</div>
	
		</div>
	</div>`,
		to: req.body.email,
		from: process.env.AUTH_USER,
	});

	const user = await Email.findOne({ email: req.body.email });
	if (!user) {
		const email = new Email({
			email: req.body.email,
			otp,
		});
		try {
			savedEmail = await email.save();
			const { otp, ...other } = savedEmail._doc;
			return res.status(201).json(other);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	} else {
		try {
			const savedEmail = await Email.findOneAndUpdate(
				{ email: req.body.email },
				{ otp: otp },
				{ new: true }
			).select("-otp");
			// console.log("98 line ", savedEmail);

			res.status(201).json(savedEmail);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
});
router.post("/otp", async (req, res) => {
	const user = await Email.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send({ message: "email do not match" });
	}
	if (user.otp == req.body.otp) {
		return res.status(201).send({ message: "user verifieds" });
	} else {
		return res.status(400).send({ message: "Wrong otp" });
	}
});

router.post("/user", async (req, res) => {
	let otp = Math.trunc(Math.random() * 100000 + 1);
	console.log("email", req.body.email);
	const savedUser = await User.findOne({ email: req.body.email });
	if (!savedUser) {
		console.log("user does not exist");
		return res.status(500).send({ message: "Can't find user" });
	}
	await sendEmail({
		subject: "OUR SHOP OTP ",
		html: `<div style="display: flex;   ">
		<div style="border-radius: 0.5rem;  width: 20rem;  padding-bottom: 2rem;  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
		">
			<div style="background-color:#14b8a6; height: 1.5rem; text-align: center; padding: 8px; border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem; 
			 ">
				<span style="color: #ffffff; font-size: 1.125rem;
				line-height: 1.75rem; "> Your Verification Code</span>
			</div>
			<div style="height:10rem ;   text-align: center; ">
				<div style="color: #6b7280; font-size: 0.9rem;
				line-height: 1.75rem; margin-top: 20px;"> Enter this Verification code in field:</div>
				<br />
				<div style="text-align: center; ">
	
					<span
						style=" background-color:#d1d5db;  font-size: 1.5rem;letter-spacing: 0.2em; 
			   line-height: 1.75rem; margin-top: 10px; padding: 15px; border-radius: 9999px;  width: fit-content; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); ">
						${otp}
					</span>
				</div>
				<br />
				<div style="color: #9ca3af; font-size: 0.9rem;font-style: italic; 
				line-height: 1.75rem; margin-top: 10px;"> Verification code is valid only for 30min </div>
	
	
			</div>
	
		</div>
	</div>`,
		to: req.body.email,
		from: process.env.AUTH_USER,
	});
	console.log("mail sent");

	const user = await Email.findOne({ email: req.body.email });
	if (!user) {
		const email = new Email({
			email: req.body.email,
			otp,
		});
		try {
			savedEmail = await email.save();
			const { otp, ...other } = savedEmail._doc;
			return res.status(201).json(other);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	} else {
		try {
			const savedEmail = await Email.findOneAndUpdate(
				{ email: req.body.email },
				{ otp: otp },
				{ new: true }
			).select("-otp");
			// console.log("98 line ", savedEmail);

			res.status(201).json({ savedEmail, _id: savedUser._id });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
});

module.exports = router;
