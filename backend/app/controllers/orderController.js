// Importing Required Packages and Libraries

import createInvoice from "../middlewares/invoiceGen.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Exporting all controllers related to Orders

export const orderDetail = (req, res) => {
	let ins = new orderModel(req.body);
	ins.save((err) => {
		if (err) {
			res.send(err);
		} else {
			userModel.findOneAndUpdate(
				{ email: req.body.email },
				{ $set: { cart: [] } },
				(err, user) => {
					if (user) {
						res.send({
							flg: 1,
						});
					} else {
						res.send(err);
					}
				}
			);
		}
	});
};

export const orderInfo = (req, res) => {
	orderModel.find({ email: req.params.email }, { __v: 0 }, (err, user) => {
		if (user) {
			res.send(user);
		} else {
			res.send(err);
		}
	});
};

export const genInvoice = (req, res) => {
	//console.log(req.body);
	const pdf = createInvoice(req.body);
	if (pdf === true) {
		// const path =
		// ("/media/user/6b0fc8c0-6c15-410f-9e7f-73631fbe0920/Full Stack/MERN JS/ECommerce/backend/app/invoices/invoice.pdf");
		res.send({
			flg: 1,
			message: "Download successfully",
			path: "file:///media/user/6b0fc8c0-6c15-410f-9e7f-73631fbe0920/Full%20Stack/MERN%20JS/ECommerce/backend/app/invoices/invoice.pdf",
		});
		//console.log(path);
		// res.download(path);
	} else {
		res.send("error while creating pdf");
	}
};

export const downloadInvo = (req, res) => {
	const file = "";
	console.log("../invoices/invoice.pdf");
	//console.log(file);
	res.download(file, (err) => {
		console.log(err);
	});
};

export const cancelOrders = (req, res) => {
	orderModel.findOneAndDelete({ _id: req.params.id }, (err, result) => {
		if (result) {
			res.send({ flg: 1, message: "Order Cancelled" });
		} else {
			res.send(err);
		}
	});
};
