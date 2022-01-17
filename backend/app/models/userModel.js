// Importing Required Packages and Libraries

import mongoose from "mongoose";

// User Collection Schema

const userModel = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		provider: { type: String },
		profilepic: { type: String },
		phone: {
			type: String,
		},
		address: [
			{
				_id: mongoose.Types.ObjectId,
				fname: String,
				lname: String,
				add: String,
				city: String,
				state: String,
				country: String,
				pin: String,
			},
		],
		cart: { type: Array },
		pass: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("User", userModel);
