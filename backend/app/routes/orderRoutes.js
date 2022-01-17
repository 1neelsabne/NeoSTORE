// Importing Required Packages and Libraries

import express from "express";
import {
	downloadInvo,
	genInvoice,
	orderDetail,
	orderInfo,
} from "../controllers/orderController.js";

// Order Routes

const orderRouter = express.Router();

orderRouter.post("/order-detail", orderDetail);

orderRouter.get("/get-order/:email", orderInfo);

orderRouter.post("/invoice", genInvoice);

orderRouter.get("/download", downloadInvo);

export default orderRouter;
