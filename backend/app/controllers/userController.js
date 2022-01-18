// Importing Required Packages and Libraries

import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendOtp } from "../services/nodeMailer.js";
import { authenticator } from "otplib";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
authenticator.options = { epoch: Date.now(), step: 30, window: 0 };

// Exporting all Controllers Related to User

export const userLogin = (req, res) => {
	userModel.findOne(
		{
			email: req.body.email,
		},
		(err, user) => {
			if (user) {
				//console.log(user.provider);
				if (req.body.provider) {
					if (user.provider !== undefined) {
						console.log("done");
						if (user.provider === "google") {
							let payload = {
								uid: user.email,
							};
							res.send({
								message: "Google login Successfull!",
								// userDet: det,
								token: jwt.sign(payload, process.env.S_KEY, {
									expiresIn: 10600000000000,
								}),
							});
						} else {
							let payload = {
								uid: user.email,
							};
							res.send({
								message: "Facebook login Successfull!",
								// userDet: det,
								token: jwt.sign(payload, process.env.S_KEY, {
									expiresIn: 10600000000000,
								}),
							});
						}
					} else {
						res.send({ message: "User not registered !!" });
					}
				} else {
					bcrypt.compare(
						req.body.password,
						user.pass,
						(err, result) => {
							if (result === true) {
								// let det = {
								// 	fname: user.fname,
								// 	lname: user.lname,
								// 	email: user.email,
								// };
								let payload = {
									uid: user.email,
								};
								res.send({
									message: "Login Successfull!",
									// userDet: det,
									token: jwt.sign(
										payload,
										process.env.S_KEY,
										{
											expiresIn: 10600000000000,
										}
									),
								});
							} else {
								if (user.provider !== undefined) {
									res.send({
										message:
											"Please login with social account",
									});
								} else {
									res.send({
										message: "Password didn't match!",
									});
								}
							}
						}
					);
				}
			} else {
				res.send({
					message: "User not registered!",
				});
			}
		}
	);
};

export const userSignup = (req, res) => {
	//console.log(req.body);
	userModel.findOne(
		{
			email: req.body.email,
		},
		(err, user) => {
			if (user) {
				//console.log(data.email);
				res.send({
					message: "User Already Registered",
				});
			} else {
				if (req.body.provider) {
					//console.log(req.body);
					let ins = new userModel(req.body);
					ins.save((err) => {
						if (err) {
							res.send(err);
						} else {
							res.send({
								flg: 1,
								message: "Registered Successfully!",
							});
						}
					});
				} else {
					bcrypt.hash(req.body.cpass, 10, (err, hash) => {
						if (err) throw err;
						let field = {
							fname: req.body.fname,
							lname: req.body.lname,
							email: req.body.email,
							phone: req.body.phone,
							pass: hash,
						};
						let ins = new userModel(field);
						ins.save((err) => {
							if (err) {
								res.send(err);
							} else {
								res.send({
									flg: 1,
									message: "Registered Successfully!",
								});
							}
						});
					});
				}
			}
		}
	);
};

export const userForgot = (req, res) => {
	userModel.findOne({ email: req.body.email }, (err, user) => {
		if (user) {
			const secret = authenticator.generateSecret();
			const token = authenticator.generate(secret);
			sendOtp(user.email, token);
			res.send({
				flg: 1,
				message: "OTP sent to your email address",
				secret: secret,
			});
		} else {
			res.send({ flg: 0, message: "Entered email id not found" });
		}
	});
};

export const userRecover = (req, res) => {
	const isValid = authenticator.check(req.body.otp, req.body.secret);
	console.log(isValid);
	if (isValid) {
		bcrypt.hash(req.body.cpass, 10, (err, hash) => {
			if (err) throw err;
			else {
				userModel.findOneAndUpdate(
					{ email: req.body.email },
					{ $set: { pass: hash } },
					(err, user) => {
						if (user) {
							res.send({
								flg: 1,
								message: "Password updated successfully",
							});
						} else {
							res.send({
								flg: 0,
								message: "Password not updated",
							});
						}
					}
				);
			}
		});
	} else {
		res.send({ message: "OTP is invalid" });
	}
};

export const changePass = (req, res) => {
	userModel.findOne({ email: req.body.email }, (err, user) => {
		if (user) {
			bcrypt.compare(req.body.oldpass, user.pass, (err, result) => {
				if (result === true) {
					bcrypt.hash(req.body.cpass, 10, (err, hash) => {
						if (hash) {
							userModel.updateOne(
								{ email: user.email },
								{ $set: { pass: hash } },
								(err, user) => {
									if (user) {
										res.send({
											flg: 1,
											message:
												"Password Changed Successfully",
										});
									} else {
										throw err;
									}
								}
							);
						} else {
							throw err;
						}
					});
				} else {
					res.send({ flg: 0, message: "Password not Matched" });
				}
			});
		} else {
			res.send({ flg: 0, message: "User not found" });
		}
	});
};

// export const insertData = (req, res) => {
// 	let field = {
// 		product_name: "HP Keyboard",
// 		product_image: "../../assets/images/k2.jpg",
// 		product_desc: "HP Keyboard is the moderate board",
// 		product_rating: 4,
// 		product_producer: "HP Inc.",
// 		product_cost: 800,
// 		product_stock: 100,
// 		product_dimension: "84*28",
// 		product_material: "Fiber Body Material",
// 		color_id: "61d3e507a05be7fb94ceb614",
// 		category_id: "61d3e8f486cd66e0fa870f01",
// 	};
// 	let ins = new productModel(field);
// 	ins.save((err) => {
// 		if (err) {
// 			res.send(err);
// 		} else {
// 			res.send({
// 				flg: 1,
// 				message: "Data Inserted",
// 			});
// 		}
// 	});
// };

export const userProfile = (req, res) => {
	userModel.findOne(
		{ email: req.params.email },
		{ pass: 0, __v: 0, _id: 0, updatedAt: 0 },
		(err, user) => {
			if (user) {
				res.send(user);
			} else {
				res.send({ flg: 1, message: "error" });
			}
		}
	);
};

export const userDetails = (req, res) => {
	userModel.findOneAndUpdate(
		{ email: req.body.email },
		{
			$set: {
				fname: req.body.fname,
				lname: req.body.lname,
				phone: req.body.phone,
			},
		},
		(err, user) => {
			if (user) {
				res.send({ flg: 1, message: "Updated Successfully" });
			} else {
				throw err;
			}
		}
	);
};

export const userAddress = (req, res) => {
	userModel.findOne({ email: req.params.email }, (err, user) => {
		if (user) {
			res.send(user.address);
		} else {
			res.send(err);
		}
	});
};

export const addAddress = (req, res) => {
	let body = {
		_id: mongoose.Types.ObjectId(),
		fname: req.body.fname,
		lname: req.body.lname,
		add: req.body.add,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		pin: req.body.pin,
	};
	userModel.findOneAndUpdate(
		{ email: req.params.email },
		{ $push: { address: body } },
		(err, user) => {
			if (user) {
				res.send({
					flg: 1,
					message: "Address added successfully",
					dress: body,
				});
			} else {
				res.send(err);
			}
		}
	);
};

export const delAddress = (req, res) => {
	//console.log(req.body.id, req.params.email);
	// userModel.findByIdAndDelete(req.params.email, (err, user) => {
	// 	if (user) {
	// 		res.send("done");
	// 	}
	// });
	userModel.findOneAndUpdate(
		{ email: req.params.email },
		{ $pull: { address: { _id: req.body.id } } },
		(err, user) => {
			if (user) {
				res.send({ flg: 1, message: "Address removed successfully" });
			} else {
				res.send(err);
			}
		}
	);
};

export const editAddress = (req, res) => {
	userModel.findOneAndUpdate(
		{ "address._id": req.body._id },
		{
			$set: {
				"address.$.fname": req.body.fname,
				"address.$.lname": req.body.lname,
				"address.$.add": req.body.add,
				"address.$.city": req.body.city,
				"address.$.state": req.body.state,
				"address.$.country": req.body.country,
				"address.$.pin": req.body.pin,
			},
		},
		(err, user) => {
			if (user) {
				res.send({ flg: 1, message: "Address updated successfully" });
			} else {
				res.send(err);
			}
		}
	);
};

export const cartData = (req, res) => {
	userModel.findOne({ email: req.params.email }, (err, user) => {
		if (user) {
			res.send(user.cart);
		} else {
			res.send(err);
		}
	});
};

export const cartDataSet = (req, res) => {
	userModel.findOneAndUpdate(
		{ email: req.params.email },
		{ $set: { cart: req.body.item } },
		(err, user) => {
			if (user) {
				res.send({ flg: 1 });
			} else {
				res.send(err);
			}
		}
	);
};
