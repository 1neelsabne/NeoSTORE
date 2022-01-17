// Importing Required Packages and Libraries

import * as Yup from "yup";
import "yup-phone";

// Exporting Signup Validation Schema

export const signupSchema = Yup.object()
	.shape({
		fname: Yup.string()
			.min(2, "First name must be at least two characters")
			.required("First name is required"),
		lname: Yup.string()
			.min(2, "Last name must be at least two characters")
			.required("Last name is required"),
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		phone: Yup.string().phone().required(),
		password: Yup.string().min(8).max(16).required("Password is required"),
		cpass: Yup.string()
			.oneOf([Yup.ref("password")], "Password does not match")
			.required(),
	})
	.required();

// Exporting Login Validation Schema

export const loginSchema = Yup.object()
	.shape({
		email: Yup.string()
			.email("Email must be a valid email address")
			.required("Email is required"),
		password: Yup.string().min(8).max(16).required("Password is required"),
	})
	.required();

// Exporting Edit Profile Validation Schema

export const editSchema = Yup.object()
	.shape({
		fname: Yup.string()
			.min(2, "First name must be at least two characters")
			.required("First name is required"),
		lname: Yup.string()
			.min(2, "Last name must be at least two characters")
			.required("Last name is required"),
		phone: Yup.string().phone().required(),
	})
	.required();

// Exporting Address Validation Schema

export const addSchema = Yup.object()
	.shape({
		fname: Yup.string()
			.min(2, "First name must be at least two characters")
			.required("First name is required"),
		lname: Yup.string()
			.min(2, "Last name must be at least 2 characters")
			.required("Last name is required"),
		add: Yup.string()
			.min(8, "Address must be at least 8 characters")
			.required("Address is required"),
		city: Yup.string()
			.min(3, "City name must be at least 3 characters")
			.required("City name is required"),
		state: Yup.string()
			.min(5, "State name must be at least 5 characters")
			.required("State name is required"),
		country: Yup.string()
			.min(3, "Country name must be at least 3 characters")
			.required("Country name is required"),
		pin: Yup.string()
			.min(6, "Pin must be 6 digit")
			.max(6, "Pin must be 6 digit")
			.required("Pin is required"),
	})
	.required();
