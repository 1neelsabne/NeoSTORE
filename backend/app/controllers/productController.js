// Importing Required Packages and Libraries

import productModel from "../models/productModel.js";
import catModel from "../models/catModel.js";
import colorModel from "../models/colorModel.js";

// Exporting all controllers related to Products

export const getTop = (req, res) => {
	productModel
		.find({ product_rating: { $gte: 4 } }, { __v: 0 })
		.populate("color_id", "-__v")
		.populate("category_id", "-__v")
		.exec((err, data) => {
			if (err) throw err;
			res.send(data);
		});
};

export const getCatImage = (req, res) => {
	catModel.find({}, { __v: 0 }, (err, data) => {
		if (data) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
};

export const commonProduct = (req, res) => {
	productModel
		.find({}, { __v: 0 })
		.populate("color_id", "-__v")
		.populate("category_id", "-__v")
		.exec((err, data) => {
			if (err) throw err;
			res.send(data);
		});
};

export const getColors = (req, res) => {
	colorModel.find({}, { __v: 0 }, (err, data) => {
		if (data) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
};

export const filterProduct = (req, res) => {
	if (req.body.catid && req.body.colorid) {
		res.send("bothid found");
	} else if (req.body.colorid) {
		productModel
			.find({ color_id: req.body.colorid }, { __v: 0 })
			.populate("color_id", "-__v")
			.populate("category_id", "-__v")
			.exec((err, data) => {
				if (err) throw err;
				res.send(data);
			});
	} else if (req.body.catid) {
		productModel
			.find({ category_id: req.body.catid }, { __v: 0 })
			.populate("color_id", "-__v")
			.populate("category_id", "-__v")
			.exec((err, data) => {
				if (err) throw err;
				res.send(data);
			});
		// res.send("catid found");
	} else if (req.body.id) {
		// res.send("id found");
		// console.log(req.body.id);
		productModel
			.findOne({ _id: req.body.id }, { __v: 0 })
			.populate("color_id", "-__v")
			.populate("category_id", "-__v")
			.exec((err, data) => {
				if (err) throw err;
				res.send(data);
			});
	} else {
		res.send("Reqest Body is Blank");
	}
};

export const searchProduct = (req, res) => {
	let name = new RegExp(req.params.name, "i");
	productModel.find({ product_name: name }, { __v: 0 }, (err, result) => {
		if (result) {
			if (result.length > 0) {
				res.send({ flg: 1, result: result });
			} else {
				res.send({ flg: 0, message: "No result found" });
			}
			// console.log(result);
		} else {
			res.send(err);
		}
	});
};
