// Importing Required Packages and Libraries

import React from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSchema } from "../validations/userValidations";
import { updateAddress } from "../config/myServices";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional component

function EditModal(props) {
	// Defining useForm Hook for Handling form Data

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: props.add,
		resolver: yupResolver(addSchema),
	});

	// Function for submitting updated data

	const onSubmit = (data) => {
		console.log(data);
		if (data) {
			updateAddress(props.email, data)
				.then((res) => {
					if (res.data.flg === 1) {
						const info = [...props.address];
						let i = info.findIndex((x) => x._id === props.add._id);
						info.splice(i, 1, data);
						console.log(i);
						props.setAddress(info);
						toast.success(`${res.data.message}`, {
							position: "top-left",
							autoClose: 5000,
							theme: "dark",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Adress Details
					</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<Row className="mb-2">
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">First Name</h6>
								</Form.Label>

								<Form.Control
									type="text"
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
									<h6 className="mb-1 text-sm">Last Name</h6>
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
						<Row className="mb-2">
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">Address</h6>
								</Form.Label>

								<Form.Control
									type="text"
									id="exampleInputLname"
									aria-describedby="emailHelp"
									placeholder="Enter your address "
									{...register("add")}
									required
								/>

								<Form.Text
									id="emailHelp"
									className="text-danger font-italic"
								>
									{errors.add?.message}
								</Form.Text>
							</Col>
						</Row>
						<Row className="mb-2">
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">City</h6>
								</Form.Label>

								<Form.Control
									type="text"
									id="exampleInputLname"
									aria-describedby="emailHelp"
									placeholder="Enter your city"
									{...register("city")}
									required
								/>

								<Form.Text
									id="emailHelp"
									className="text-danger font-italic"
								>
									{errors.city?.message}
								</Form.Text>
							</Col>
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">State</h6>
								</Form.Label>

								<Form.Control
									type="text"
									id="exampleInputLname"
									aria-describedby="emailHelp"
									placeholder="Enter your state"
									{...register("state")}
									required
								/>

								<Form.Text
									id="emailHelp"
									className="text-danger font-italic"
								>
									{errors.state?.message}
								</Form.Text>
							</Col>
						</Row>
						<Row className="mb-2">
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">Country</h6>
								</Form.Label>

								<Form.Control
									type="text"
									id="exampleInputLname"
									aria-describedby="emailHelp"
									placeholder="Enter your country"
									{...register("country")}
									required
								/>

								<Form.Text
									id="emailHelp"
									className="text-danger font-italic"
								>
									{errors.country?.message}
								</Form.Text>
							</Col>
							<Col>
								<Form.Label className="mb-1">
									<h6 className="mb-1 text-sm">Pin</h6>
								</Form.Label>

								<Form.Control
									type="number"
									id="exampleInputLname"
									aria-describedby="emailHelp"
									placeholder="Enter your pin"
									{...register("pin")}
									required
								/>

								<Form.Text
									id="emailHelp"
									className="text-danger font-italic"
								>
									{errors.pin?.message}
								</Form.Text>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button type="submit" variant="success">
							Update
						</Button>
						<Button onClick={() => props.setEditmodal(false)}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default EditModal;
