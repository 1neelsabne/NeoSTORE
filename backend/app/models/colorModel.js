// Importing Required Packages and Libraries

import mongoose from "mongoose";

// Color Collection Schema

const colorModel = new mongoose.Schema(
	{
		color_name: {
			type: String,
			required: true,
			unique: true,
		},
		color_code: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Color", colorModel);
