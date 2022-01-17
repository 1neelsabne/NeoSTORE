// Importing Required Packages and Libraries

import * as Yup from "yup";

// Exporting email Validation Schema

export const emailSchema = Yup.object()
	.shape({
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
	})
	.required();

// Exporting Password Validation Schema

export const passSchema = Yup.object()
	.shape({
		otp: Yup.string()
			.min(6, "OTP must be 6 digit")
			.max(6, "OTP must be 6 digit")
			.required("OTP is required"),
		password: Yup.string().min(8).max(16).required("Password is required"),
		cpass: Yup.string()
			.oneOf([Yup.ref("password")], "Password does not match")
			.required(),
	})
	.required();

// Exporting Change Pass Validation Schema

export const changeSchema = Yup.object()
	.shape({
		oldpass: Yup.string().required(" Old password is required"),
		password: Yup.string().min(8).max(16).required("Password is required"),
		cpass: Yup.string()
			.oneOf([Yup.ref("password")], "Password does not match")
			.required(),
	})
	.required();
