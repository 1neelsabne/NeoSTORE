// Importing Required Packages and Libraries

import express from "express";
import {
	commonProduct,
	filterProduct,
	getCatImage,
	getColors,
	getTop,
	searchProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Product Routes

productRouter.get("/top-product", getTop);

productRouter.get("/category-images", getCatImage);

productRouter.get("/common-product", commonProduct);

productRouter.get("/product-colors", getColors);

productRouter.post("/filter-product", filterProduct);

productRouter.get("/search-product/:name", searchProduct);

export default productRouter;
