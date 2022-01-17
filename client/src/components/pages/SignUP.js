// Importing Required Packages and Libraries

import React from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Image,
	Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar";
import FooterSec from "../FooterSec";
import { postSignup } from "../../config/myServices";
import { signupSchema } from "../../validations/userValidations";
import SocialComponent from "../SocialComponent";

// Defining Functional Component

export function SignUP() {
	// Defining useForm Hook for Handling Form fields

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupSchema),
	});

	const navigate = useNavigate();

	// Function for Submitting Signup Data

	const onSubmit = (data) => {
		//console.warn(data);
		if (data) {
			postSignup(data).then((res) => {
				//console.log(res);
				if (res.data.flg === 1) {
					toast.success(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
					setTimeout(() => {
						navigate("/log-in");
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
			toast.warning(`Data is not comming`, {
				position: "top-left",
				autoClose: 5000,
				theme: "dark",
			});
		}
	};

	// Function for Handling Social Signup

	const handleSocialLogin = (user) => {
		console.log(user);
		console.log(user._profile.firstName);
		if (user) {
			let data = {
				fname: user._profile.firstName,
				lname: user._profile.lastName,
				email: user._profile.email,
				provider: user._provider,
				profilepic: user._profile.profilePicURL,
			};
			postSignup(data).then((res) => {
				//console.log(res);
				if (res.data.flg === 1) {
					toast.success(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
					setTimeout(() => {
						navigate("/log-in");
					}, 3000);
				} else {
					toast.error(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
				}
			});
		}
	};

	// Function for Handling Social Signup Failure

	const handleSocialLoginFailure = (err) => {
		console.error(err);
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
											src=".././images/shop2.png"
											className="image"
										/>
									</Row>
								</div>
							</Col>
							<Col className="col-lg-6">
								<Card className="card2 border-0 px-4 py-5">
									<Row className="mb-4 px-3">
										<h6 className="mb-0 mr-4 mt-2">
											Sign up with
										</h6>
										<SocialComponent
											className="facebook text-center mr-3"
											provider="facebook"
											appId="460751412227720"
											onLoginSuccess={handleSocialLogin}
											onLoginFailure={
												handleSocialLoginFailure
											}
										>
											<div className="fa fa-facebook"></div>
										</SocialComponent>
										<div className="twitter text-center mr-3">
											<div className="fa fa-twitter"></div>
										</div>
										<SocialComponent
											className="linkedin text-center mr-3"
											provider="google"
											appId="887747976013-n421fi8sbvc4roqdgrv6kdsiugpr4ivd.apps.googleusercontent.com"
											onLoginSuccess={handleSocialLogin}
											onLoginFailure={
												handleSocialLoginFailure
											}
										>
											<div className="fa fa-google"></div>
										</SocialComponent>
									</Row>

									<Row className="px-3 mb-4">
										<div className="line"></div>
										<small className="or text-center">
											Or
										</small>
										<div className="line"></div>
									</Row>
									<Form onSubmit={handleSubmit(onSubmit)}>
										<Row className="mb-2">
											<Col>
												<Form.Label className="mb-1">
													<h6 className="mb-1 text-sm">
														First Name
													</h6>
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
													<h6 className="mb-1 text-sm">
														Last Name
													</h6>
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
													<h6 className="mb-1 text-sm">
														Email Address
													</h6>
												</Form.Label>

												<Form.Control
													type="email"
													{...register("email")}
													placeholder="Enter a valid email address"
													required
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
													<h6 className="mb-1 text-sm">
														Mobile
													</h6>
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

										<Row className="mb-1">
											<Col>
												<Form.Label className="mb-1">
													<h6 className="mb-1 text-sm">
														Password
													</h6>
												</Form.Label>

												<Form.Control
													type="password"
													{...register("password")}
													placeholder="Enter password"
													required
												/>

												<Form.Text
													id="emailHelp"
													className="text-danger font-italic"
												>
													{errors.password?.message}
												</Form.Text>
											</Col>
											<Col>
												<Form.Label className="mb-1">
													<h6 className="mb-1 text-sm">
														Confirm Password
													</h6>
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
											</Col>
										</Row>

										<Row className="mb-3">
											<Col>
												<div className="custom-control custom-checkbox custom-control-inline">
													<input
														id="chk1"
														type="checkbox"
														name="chk"
														className="custom-control-input"
														required
													/>
													<label
														htmlFor="chk1"
														className="custom-control-label text-sm"
													>
														I accept the{" "}
														<a href="/#">
															Terms of Use
														</a>{" "}
														&amp;{" "}
														<a href="/#">
															Privacy Policy
														</a>
													</label>
												</div>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col>
												<Button
													variant="primary"
													type="submit"
													className="btn-blue"
												>
													Signup
												</Button>{" "}
												&nbsp;&nbsp;
												<Button
													variant="danger"
													type="reset"
													className="btn-blue"
												>
													Reset
												</Button>
											</Col>
										</Row>
									</Form>

									<Row className="mb-4">
										<Col>
											<Form.Text className="font-weight-bold">
												Already have an account?{" "}
												<Link
													to="/log-in"
													className="text-warning"
												>
													Login
												</Link>
											</Form.Text>
										</Col>
									</Row>
								</Card>
							</Col>
						</Row>

						<div className="bg-blue py-4">
							<Row className="px-3">
								<Form.Text className="ml-4 ml-sm-5 mb-2">
									Copyright &copy; 2022. All rights reserved.
								</Form.Text>
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

export default SignUP;
