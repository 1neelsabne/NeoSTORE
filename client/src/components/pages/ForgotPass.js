// Importing Required Packages and Libraries

import React from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Image,
	Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../validations/forgotValidations";
import { postOtp } from "../../config/myServices";

// Defining Functional Component

function ForgotPass() {
	// Defining useForm Hook for Form Handling

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(emailSchema),
	});

	const navigate = useNavigate();

	// Function for Submitting OTP To Verfy

	const onSubmit = (data) => {
		if (data) {
			postOtp(data).then((res) => {
				//console.log(res.data);
				if (res.data.flg === 1) {
					toast.success(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
					let info = { email: data.email, secret: res.data.secret };
					setTimeout(() => {
						navigate("/recover-password", { state: info });
					}, 3000);
				} else {
					toast.error(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
				}
			});
		} else {
			toast.error("Data is not comming !", {
				position: "top-left",
				autoClose: 5000,
				theme: "dark",
			});
		}
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<NavBar />
			<section className="bg-image">
				<Container
					fluid
					className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"
				>
					<Card className="card0 border-0 m-auto">
						<Row className="d-flex">
							<Col className="col-lg-6">
								<div className="card1 pb-5">
									<Row>
										<Image
											src=".././images/techg.png"
											className="logo"
										/>
									</Row>
									<Row className="px-3 justify-content-center mt-4 mb-5 border-line">
										<Image
											src=".././images/fp.png"
											className="image"
										/>
									</Row>
								</div>
							</Col>

							<Col className="col-lg-6">
								<Card className="card2 border-0 px-4 py-5">
									<Row className="mt-5 mb-3 px-3">
										<h4 className="mb-0 mr-4 mt-5">
											Enter Your Registerd Email ID
										</h4>
									</Row>

									<hr />

									<Form onSubmit={handleSubmit(onSubmit)}>
										<Row className="px-3">
											<Form.Label className="mb-2">
												<h5 className="mb-1 text-sm">
													Email Id
												</h5>
											</Form.Label>
											<Form.Control
												className="mb-1"
												type="email"
												{...register("email")}
												placeholder="Enter a valid email id "
												required
											/>

											<Form.Text className="text-muted mb-3">
												We'll never share your email
												with anyone else.
											</Form.Text>
											<Col>
												<Form.Text className="text-right text-danger font-italic mb-1">
													{errors.email?.message}
												</Form.Text>
											</Col>
										</Row>
										<Row className="mb-3 px-3">
											<Button
												variant="warning"
												type="submit"
												className="btn-blue"
											>
												Send OTP
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

									<Row className="mb-4 px-3">
										<small className="font-weight-bold">
											Remember Password?{" "}
											<Link
												to="/log-in"
												className="text-warning"
											>
												Login
											</Link>
										</small>
									</Row>
								</Card>
							</Col>
						</Row>

						<div className="bg-blue py-4">
							<Row className="px-3">
								<small className="ml-4 ml-sm-5 mb-2">
									Copyright &copy; 2021. All rights reserved.
								</small>
								<div className="social-contact ml-4 ml-sm-auto">
									<span className="fa fa-facebook mr-4 text-sm"></span>
									<span className="fa fa-google-plus mr-4 text-sm"></span>
									<span className="fa fa-linkedin mr-4 text-sm"></span>
									<span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
								</div>
							</Row>
						</div>
					</Card>
				</Container>
			</section>
			<ToastContainer newestOnTop />
			<FooterSec />
		</>
	);
}

// Exporting Functional Component

export default ForgotPass;
