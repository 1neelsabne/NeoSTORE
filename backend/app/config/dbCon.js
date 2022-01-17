// Importing Required Packages and Libraries

import mongoose from "mongoose";
import "colors";

const db = "mongodb://localhost:27017/NeoSTORE";

// Function for Creating Connection to Database

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected Successfully!`.blue);
	} catch (err) {
		console.log(err.message);
	}
};

// Exporting connectDB Function

export default connectDB;
