// Importing Required Packages and Libraries

import express from "express";
import connectDB from "../config/dbCon.js";
import userRouter from "../routes/userRoutes.js";
import cors from "cors";
import "colors";
import productRouter from "../routes/productRoutes.js";
import orderRouter from "../routes/orderRoutes.js";

const app = express();
const PORT = 8080;

// Function for Creating Server Prot

const nodeServer = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	//app.use(express.static("../invoices"));
	app.use("/api/v1", userRouter);
	app.use("/api/v1", productRouter);
	app.use("/api/v1", orderRouter);

	connectDB();

	app.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server Working on Port ${PORT}`.yellow);
	});
};

// Exporting Server

export default nodeServer;
