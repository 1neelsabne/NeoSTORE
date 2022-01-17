// JWT Authentivation Token Verifire

import jwt from "jsonwebtoken";
const sKey = "komal@neel@jeff@madhuri@vinayak@anushka";

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	//console.log(token);
	if (token == null) {
		res.send({ message: "Token not match" });
	} else {
		jwt.verify(token, sKey, (err, data) => {
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
