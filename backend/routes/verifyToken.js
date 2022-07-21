const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	// console.log("inside verifyToken");

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		console.log("inside authHeader", authHeader);

		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) {
				console.log("jwt", err);
				return res.status(403).json({ message: "Token are not valid!" });
			}
			// console.log("inside token validation");
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json({ message: "You are not authenticated!" });
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	// console.log("inside verifyTokenAndAuthorization");
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			// console.log("inside verifyTokenAndAuthorization if in");

			next();
		} else {
			console.log(req.user, "prams", req.params.id);
			res.status(403).json({ message: "You are not allowed to do that!" });
		}
	});
};
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json({
				message: "You are not allowed to do that only admin can do this !",
			});
		}
	});
};
module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
