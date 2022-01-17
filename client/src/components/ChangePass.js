// Importing Required Packages and Libraries

import React from "react";
import { Card, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeSchema } from "../validations/forgotValidations";
import { postChangePass } from "../config/myServices";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function ChangePass({ profile }) {
	// Defining useForm Hook for Handling form Fields

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(changeSchema),
	});

	// Function for Submitting Change Password data

	const onSubmit = (data) => {
		console.log(data);
		if (data) {
			let info = {
				email: profile.email,
				oldpass: data.oldpass,
				cpass: data.cpass,
			};
			postChangePass(info)
				.then((res) => {
					if (res.data.flg === 1) {
						toast.success(`${res.data.message}`, {
							position: "top-left",
							autoClose: 5000,
							theme: "dark",
						});
					} else {
						toast.error(`${res.data.message}`, {
							position: "top-left",
							autoClose: 5000,
							theme: "dark",
						});
					}
				})
				.catch((err) => {
					throw err;
				});
		}
	};

	// Rendering HTML Element and Designing Part

	return (
		<>
			<h1>Change Password</h1>
			<br />
			<Card style={{ padding: "30px", width: "100%", margin: "auto" }}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row className="mb-2 px-3 text-left">
						<Form.Label className="mb-2">
							<h6 className="mb-1 text-sm">Old Password</h6>
						</Form.Label>

						<Form.Control
							type="password"
							{...register("oldpass")}
							placeholder="Enter old password"
							required
						/>

						<Form.Text
							id="emailHelp"
							className="text-danger font-italic"
						>
							{errors.oldpass?.message}
						</Form.Text>
					</Row>
					<Row className="mb-2 px-3 text-left">
						<Form.Label className="mb-2 mt-2">
							<h6 className="mb-1 text-sm">New Password</h6>
						</Form.Label>

						<Form.Control
							type="password"
							{...register("password")}
							placeholder="Enter new password"
							required
						/>

						<Form.Text
							id="emailHelp"
							className="text-danger font-italic"
						>
							{errors.password?.message}
						</Form.Text>
					</Row>
					<Row className="px-3 mb-4">
						<Form.Label className="mb-2 mt-2">
							<h6 className="mb-1 text-sm">Confirm Password</h6>
						</Form.Label>

						<Form.Control
							type="password"
							id="exampleInputCPassword1"
							placeholder="Confirm Password"
							{...register("cpass")}
							required
						/>

						<Form.Text
							id="emailHelp"
							className="text-danger font-italic"
						>
							{errors.cpass?.message}
						</Form.Text>
					</Row>
					<Row className="mb-1 px-3">
						<Button
							variant="info"
							type="submit"
							className="btn-blue"
							style={{ width: "200px" }}
						>
							Change Password
						</Button>
						&nbsp;&nbsp;&nbsp;
						<Button
							variant="danger"
							type="reset"
							className="btn-blue"
						>
							Reset
						</Button>
					</Row>
				</Form>
			</Card>
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default ChangePass;
