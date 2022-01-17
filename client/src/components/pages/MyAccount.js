// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import { lazy } from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { Container, Card, Tab, Row, Col, Nav, Image } from "react-bootstrap";
import { getProfile } from "../../config/myServices";
import jwt_decode from "jwt-decode";

// Performing Lazy Loading

const Profile = lazy(() => import("../Profile"));
const Address = lazy(() => import("../Address"));
const Orders = lazy(() => import("../Orders"));
const ChangePass = lazy(() => import("../ChangePass"));

// Defining Functional Component

function MyAccount() {
	const [profile, setProfile] = useState();

	// Defining useEffect Hook

	useEffect(() => {
		const token = localStorage.getItem("_token");
		const decode = jwt_decode(token);
		getProfile(decode.uid)
			.then((res) => {
				setProfile(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<NavBar />
			<section className="bgimage">
				<Container
					fluid
					className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"
				>
					<Card style={{ padding: "30px", minHeight: "600px" }}>
						<Tab.Container
							id="left-tabs-example"
							defaultActiveKey="first"
						>
							<Row>
								<Col sm={3} md={3} className="text-center mt-3">
									<Image
										src={
											profile
												? profile.profilepic ||
												  "../../../images/boy.png"
												: "Loading"
										}
										width="150px"
										style={{ borderRadius: "50%" }}
										className="mb-4"
									/>
									<h3>
										{profile ? profile.fname : "Loading"}{" "}
										{profile ? profile.lname : "Loading"}
									</h3>
									<br /> <br />
									<Nav
										variant="pills"
										className="flex-column text-left"
									>
										<Nav.Item>
											<Nav.Link eventKey="first">
												<i className="fa fa-user"></i>{" "}
												&nbsp; Profile
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="second">
												<i className="fa fa-list"></i>{" "}
												&nbsp; Orders
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="third">
												<i className="fa fa-address-card"></i>{" "}
												&nbsp; Address
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="fourth">
												<i className="fa fa-lock"></i>{" "}
												&nbsp; Change Password
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
								<Col
									sm={9}
									md={9}
									className="text-center px-5 mt-2"
								>
									<Tab.Content>
										<Tab.Pane eventKey="first">
											{profile ? (
												<Profile
													profile={profile}
													setProfile={setProfile}
												/>
											) : (
												<h2>Loading...</h2>
											)}
										</Tab.Pane>
										<Tab.Pane
											eventKey="second"
											className="text-left"
										>
											{profile ? (
												<Orders />
											) : (
												<h2>Loading...</h2>
											)}
										</Tab.Pane>
										<Tab.Pane eventKey="third">
											{profile ? (
												<Address profile={profile} />
											) : (
												<h2>Loading...</h2>
											)}
										</Tab.Pane>
										<Tab.Pane eventKey="fourth">
											{profile ? (
												<ChangePass profile={profile} />
											) : (
												<h2>Loading...</h2>
											)}
										</Tab.Pane>
									</Tab.Content>
								</Col>
							</Row>
						</Tab.Container>
					</Card>
				</Container>
			</section>
			<FooterSec />
		</>
	);
}

// Exporting Functional Component

export default MyAccount;
