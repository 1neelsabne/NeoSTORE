// Importing Required Packages and Libraries

import mongoose from "mongoose";

// Product Collection Schema

const productModel = new mongoose.Schema(
	{
		product_name: {
			type: String,
			required: true,
		},
		product_image: {
			type: String,
			required: true,
		},
		product_subimg: [{ type: Array }],
		product_desc: {
			type: String,
			required: true,
		},
		product_rating: {
			type: Number,
			required: true,
		},
		product_producer: {
			type: String,
			required: true,
		},
		product_cost: {
			type: Number,
			required: true,
		},
		product_stock: {
			type: Number,
			required: true,
		},
		product_quantity: {
			type: Number,
			required: true,
		},
		product_dimension: {
			type: String,
			required: true,
		},
		product_material: {
			type: String,
			required: true,
		},
		color_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Color",
		},
		category_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Product", productModel);
