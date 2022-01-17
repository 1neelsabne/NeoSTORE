// Importing Required Packages and Libraries

import express from "express";
import connectDB from "../config/dbCon.js";
import "colors";
import routes from "../routes/index.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

// Function for Creating Server Prot

const nodeServer = () => {
	// Calling routes function

	routes(app);

	// Calling Mongo DB Connect function

	connectDB();

	// Listening Port

	app.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server Working on Port ${PORT}`.yellow);
	});
};

// Exporting Server

export default nodeServer;
