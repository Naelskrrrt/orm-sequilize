import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		console.log("Access Denied: No token provided");
		return res.status(401).send("Access Denied");
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.log("Invalid Token", err);
			return res.status(403).send("Invalid Token");
		}
		req.user = user;
		next();
	});
};

export default authenticateToken;
