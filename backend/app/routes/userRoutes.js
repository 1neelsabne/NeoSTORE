// Importing Required Packages and Libraries

import express from "express";
import {
	userLogin,
	userSignup,
	userForgot,
	userRecover,
	userProfile,
	changePass,
	userDetails,
	userAddress,
	addAddress,
	delAddress,
	editAddress,
	cartData,
	cartDataSet,
} from "../controllers/userController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// User Routes

userRouter.post("/log-in", userLogin);

userRouter.post("/sign-up", userSignup);

userRouter.post("/forgot-password", userForgot);

userRouter.post("/recover-password", userRecover);

userRouter.post("/change-password", authenticateToken, changePass);

userRouter.post("/update-detail", authenticateToken, userDetails);

userRouter.get("/profile-data/:email", authenticateToken, userProfile);

userRouter.get("/address/:email", authenticateToken, userAddress);

userRouter.post("/add-address/:email", authenticateToken, addAddress);

userRouter.post("/del-address/:email", authenticateToken, delAddress);

userRouter.post("/edit-address/:email", authenticateToken, editAddress);

userRouter.get("/cart-data/:email", cartData);

userRouter.post("/insert-cartdata/:email", cartDataSet);

export default userRouter;
