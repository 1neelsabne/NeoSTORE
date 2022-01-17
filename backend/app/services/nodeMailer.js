// Importing Required Packages and Libraries

import nodemailer from "nodemailer";
import { USER_EMAIL, USER_PASS } from "./info.js";

// function for Sending OTP through Email

export const sendOtp = (recEmail, otp) => {
	//let flag = false;
	let transporter = nodemailer.createTransport({
		host: `smtp.gmail.com`,
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
			user: USER_EMAIL,
			pass: USER_PASS,
		},
	});

	let mailOptions = {
		from: USER_EMAIL,
		to: `${recEmail}`,
		subject: `Password Recovery OTP`,
		html: `<h1 style="color:blue">Neo<span style="color:red">STORE</span></h1>
		<h1>Your one time password is : <font color="red">${otp}</font></h1>
		<h3><font color="blue">Please do not share with anyone else.</font></h3>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return false;
		} else {
			console.log("Email sent: " + info.response);
			return true;
		}
	});
	//console.log(flag);
	//return await flag;
};
