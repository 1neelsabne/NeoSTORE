// Importing Required Packages and Libraries

import mongoose from "mongoose";
import "colors";

// Function for Creating Connection to Database

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CON, {
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
