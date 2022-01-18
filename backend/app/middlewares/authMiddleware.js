// JWT Authentivation Token Verifire

import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	//console.log(token);
	if (token == null) {
		res.send({ message: "Token not match" });
	} else {
		jwt.verify(token, process.env.S_KEY, (err, data) => {
			if (err) {
				res.send({ message: "Token incorrect" });
			} else {
				console.log("Token verified");
				next();
			}
		});
	}
};

export default authenticateToken;
