// Importing Required Packages and Libraries

import React from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";

// Function for Open Terms and Condition PDF

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Terms and Conditions
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<iframe
					title="terms"
					src="../../pdf/terms.pdf"
					width="100%"
					height="500px"
				></iframe>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

// Defining Functional Component

function FooterSec() {
	const [modalShow, setModalShow] = React.useState(false);

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<section>
				<Row className="text-center m-auto">
					<Col className="col1">
						<a href="https://wwww.facebook.com" className="an">
							<i
								className="fa fa-facebook"
								style={{
									marginRight: "10px",
									fontSize: "18px",
								}}
							></i>
							FACEBOOK
						</a>
					</Col>
					<Col className="col2">
						<a href="https://wwww.twitter.com" className="an">
							<i
								className="fa fa-twitter"
								style={{
									marginRight: "10px",
									fontSize: "18px",
								}}
							></i>
							TWITTER
						</a>
					</Col>
					<Col className="col3">
						<a href="https://wwww.instagram.com" className="an">
							<i
								className="fa fa-instagram"
								style={{
									marginRight: "10px",
									fontSize: "18px",
								}}
							></i>
							INSTAGRAM
						</a>
					</Col>
					<Col className="col4">
						<a href="https://wwww.dribbble.com" className="an">
							<i
								className="fa fa-dribbble"
								style={{
									marginRight: "10px",
									fontSize: "18px",
								}}
							></i>
							DRIBBBLE
						</a>
					</Col>
					<Col className="col5">
						<a href="https://wwww.pinterest.com" className="an">
							<i
								className="fa fa-pinterest"
								style={{
									marginRight: "10px",
									fontSize: "18px",
								}}
							></i>
							PINTEREST
						</a>
					</Col>
				</Row>
			</section>
			<section>
				<div className="text-center bl">
					<img
						src=".././images/techg.png"
						height="50"
						width="50"
						alt=""
					/>
					<h2 className="mt-2">
						<b>
							<font color="white">Neo</font>
							<font color="red">STORE</font>
						</b>
					</h2>
					<p className="it mt-3">
						<i>
							" Technology is nothing. What’s important is that
							you have a faith in people, that they’re basically
							good and smart, and if you give them tools, they’ll
							do wonderful things with them. "
						</i>
					</p>
					<br />
					<section className="text-white mt-4">
						<Row>
							<Col>
								<h5 className="mb-4">ABOUT US</h5>
								<p style={{ color: "gray" }}>
									NeoSOFT Technologies is here at your quick
									and easy service for shopping.
								</p>
								<p style={{ color: "gray" }}>
									<i className="fa fa-inbox"></i>
									&nbsp;{" "}
									<a href="#xyz" style={{ color: "gray" }}>
										contact@neosofttech.com
									</a>
								</p>
								<p style={{ color: "gray" }}>
									<i className="fa fa-phone"></i> &nbsp;
									<a href="#xyz" style={{ color: "gray" }}>
										+91 - 8446542912
									</a>
								</p>
								<p style={{ color: "gray" }}>
									<i className="fa fa-globe"></i> &nbsp;PUNE,
									INDIA
								</p>
							</Col>
							<Col>
								<h5 className="mb-4">INFORMATION</h5>
								<p>
									<a href="#xyz" style={{ color: "gray" }}>
										Gurantee and Return Policy
									</a>
								</p>
								<p>
									<a
										href="#abc"
										style={{ color: "gray" }}
										onClick={() => setModalShow(true)}
									>
										Terms and Conditions
									</a>
								</p>
								<p>
									<a href="#xyz" style={{ color: "gray" }}>
										Privacy Policy
									</a>
								</p>
								<p>
									<a
										href="https://goo.gl/maps/bZNoW6poYxs53e9q8"
										target="_blank"
										rel="noreferrer"
										style={{ color: "gray" }}
									>
										Locate US
									</a>
								</p>
							</Col>
							<Col>
								<h5 className="mb-4">NEWSLETTER</h5>
								<p style={{ color: "gray" }}>
									SignUP to get exclusive offer from our
									brands and to tell well up in the news.
								</p>
								<Form>
									<Row>
										<Col md="10" className="m-auto">
											<Form.Control
												type="email"
												placeholder="Enter Your Email Address"
												required
											></Form.Control>
										</Col>
									</Row>
									<Row className="mt-3">
										<Col md="10" className="m-auto">
											<Button
												variant="warning"
												style={{ width: "100%" }}
												type="submit"
											>
												<i className="fa fa-send"></i>
												&nbsp; Subscribe
											</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</section>
					<p className="bt">
						<label className="b">.</label>
						<label className="r">.</label>
						<label className="y">.</label>
					</p>
					<br />
					<i
						className="fa fa-cc-visa"
						style={{ fontSize: "24px", color: "rgb(14, 247, 216)" }}
					></i>{" "}
					<i
						className="fa fa-cc-paypal"
						style={{ fontSize: "24px", color: "rgb(14, 247, 216)" }}
					></i>{" "}
					<i
						className="fa fa-cc-amex"
						style={{ fontSize: "24px", color: "rgb(14, 247, 216)" }}
					></i>{" "}
					<i
						className="fa fa-cc-mastercard"
						style={{ fontSize: "24px", color: "rgb(14, 247, 216)" }}
					></i>
				</div>
			</section>
			<section>
				<footer className="text-center ft">
					<p style={{ fontSize: "13px" }}>
						Copyright &copy; 2022 Designed by Niranjan Sabne - All
						Rights Reserved.
					</p>
				</footer>
			</section>
			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
}

// Exporting Functional Component

export default FooterSec;
