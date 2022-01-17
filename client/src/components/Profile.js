// Importing Required Packages and Libraries

import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../validations/userValidations";
import { postDetails } from "../config/myServices";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function Profile({ profile, setProfile }) {
	// Defining useform for Handling Form Data

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: profile,
		resolver: yupResolver(editSchema),
	});

	// Function for Posting updated Data to server

	const onSubmit = (data) => {
		console.log(data);
		if (data) {
			postDetails(data)
				.then((res) => {
					if (res.data.flg === 1) {
						setProfile(data);
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

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<h1>Profile Details</h1>
			<br />
			<Card style={{ padding: "30px", width: "100%", margin: "auto" }}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row className="mb-3 text-left">
						<Col>
							<Form.Label className="mb-1">
								<h5 className="mb-1 text-sm">First Name</h5>
							</Form.Label>

							<Form.Control
								type="text"
								name="fname"
								aria-describedby="emailHelp"
								placeholder="Enter your first name"
								{...register("fname")}
								required
							/>

							<Form.Text
								id="emailHelp"
								className="text-danger font-italic mb-1"
							>
								{errors.fname?.message}
							</Form.Text>
						</Col>
						<Col>
							<Form.Label className="mb-1">
								<h5 className="mb-1 text-sm">Last Name</h5>
							</Form.Label>

							<Form.Control
								type="text"
								id="exampleInputLname"
								aria-describedby="emailHelp"
								placeholder="Enter your last name"
								{...register("lname")}
								required
							/>

							<Form.Text
								id="emailHelp"
								className="text-danger font-italic"
							>
								{errors.lname?.message}
							</Form.Text>
						</Col>
					</Row>
					<Row className="mb-3 text-left">
						<Col>
							<Form.Label className="mb-1">
								<h5 className="mb-1 text-sm">Email Address</h5>
							</Form.Label>

							<Form.Control
								type="email"
								{...register("email")}
								placeholder="Email address"
								required
								disabled
							/>

							<Form.Text
								id="emailHelp"
								className="text-danger font-italic"
							>
								{errors.email?.message}
							</Form.Text>
						</Col>
						<Col>
							<Form.Label className="mb-1">
								<h5 className="mb-1 text-sm">Mobile</h5>
							</Form.Label>

							<Form.Control
								type="number"
								{...register("phone")}
								aria-describedby="phoneHelp"
								placeholder="Enter mobile number"
								required
							/>

							<Form.Text
								id="phoneHelp"
								className="text-danger font-italic"
							>
								{errors.phone?.message}
							</Form.Text>
						</Col>
					</Row>
					{/* <Row>
						<Form.Group>
							<Fo
								className="position-relative"
								required
								name="file"
								label="File"
							/>
						</Form.Group>
					</Row> */}
					<Row>
						<Col>
							<Button
								className="w-100 mt-2"
								type="submit"
								variant="danger"
							>
								<i className="fa fa-pencil"></i> &nbsp; Update
								Details
							</Button>
						</Col>
					</Row>
				</Form>
			</Card>
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default Profile;
