// Importing Required Packages and Libraries
import mongoose from "mongoose";

// Category Collection Schema

const catModel = new mongoose.Schema(
	{
		category_name: {
			type: String,
			required: true,
			unique: true,
		},
		category_image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Category", catModel);
