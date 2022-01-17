// Importing Required Packages and Libraries

import mongoose from "mongoose";

// Order Collection Schema

const orderModel = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		order_list: {
			type: Array,
			required: true,
		},
		address: {
			type: Array,
			required: true,
		},
		card_details: {
			type: Array,
			required: true,
		},
		sub_total: {
			type: Number,
			required: true,
		},
		gst: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderModel);
