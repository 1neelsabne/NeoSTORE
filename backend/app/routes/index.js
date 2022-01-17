// Importing Required Packages and Libraries

import express from "express";
import cors from "cors";
import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js";
import orderRouter from "./orderRoutes.js";

// Function for Defining API Routes

const routes = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	app.use(process.env.API_LINK, userRouter);
	app.use(process.env.API_LINK, productRouter);
	app.use(process.env.API_LINK, orderRouter);
};

// Exporting API Routes

export default routes;
