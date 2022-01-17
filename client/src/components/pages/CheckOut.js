// Importing Required Packages and Libraries

import React, { useState, useEffect } from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Form, ProgressBar } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { getAddress } from "../../config/myServices";
import { ATMCard } from "atm-card-react";
import { postOrderDetail } from "../../config/productServices";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function CheckOut() {
	const location = useLocation();
	const navigate = useNavigate();
	const [filtadd, setFiltadd] = useState([]);
	const [ids, setIds] = useState();

	/////////
	const [number, setNumber] = useState("");
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [holder, setHolder] = useState("");
	const [cvv, setCvv] = useState("");
	/////////

	// Defining useEffect Hook

	useEffect(() => {
		if (localStorage.getItem("_token")) {
			let decode = jwtDecode(localStorage.getItem("_token"));
			getAddress(decode.uid)
				.then((res) => {
					setFiltadd(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			navigate("/");
		}
	}, [navigate]);

	// Function for getting address id

	const addId = (id) => {
		id.preventDefault();
		setIds(id.target.value);
	};

	// Function for Placing Order and Posting Data to Orders Collection

	const orderPlaced = () => {
		if (ids && number && month && year && holder && cvv) {
			let decode = jwtDecode(localStorage.getItem("_token"));
			const cd = { card_no: number, card_holder: holder };
			const sd = JSON.parse(localStorage.getItem("mycart"));
			let data = {
				email: decode.uid,
				order_list: sd,
				address: filtadd[ids],
				card_details: cd,
				sub_total: location.state.subtotal,
				gst: location.state.gst,
				total: location.state.subtotal + location.state.gst,
			};
			//console.log(data);
			postOrderDetail(data)
				.then((res) => {
					if (res.data.flg === 1) {
						localStorage.removeItem("mycart");
						toast.success("Order placed successfully", {
							position: "top-right",
							autoClose: 5000,
							theme: "dark",
						});
						setTimeout(() => {
							navigate("/order");
						}, 3000);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			toast.warning("Please select address and enter full card details", {
				position: "top-right",
				autoClose: 5000,
				theme: "dark",
			});
		}
	};

	// Rendering HTML elements and Designing part

	return (
		<>
			<NavBar />
			<section className="bgimage">
				<h2 className="text-white text-center mb-2">Select Address</h2>
				<hr style={{ backgroundColor: "white" }} />
				{/* <Form onSubmit={(e) => orderPlaced(e)}> */}
				<Row className="ml-3 mr-3 mt-5">
					<Col>
						{/* <Card style={{ padding: "20px" }}> */}
						<Row>
							<Col md={1}>
								<h4 className="text-right text-white">Cart</h4>
							</Col>
							<Col md={10}>
								<ProgressBar
									animated
									now={100}
									className="mt-1"
								/>
							</Col>
							<Col md={1}>
								<h4 className="text-left text-white">
									Address
								</h4>
							</Col>
						</Row>
						{/* </Card> */}
					</Col>
				</Row>
				<Row className="ml-3 mr-3 mt-4">
					<Col md={8}>
						<Card
							className="text-left"
							style={{ padding: "20px", width: "100%" }}
						>
							<Form.Group controlId="formGridState">
								<h4 className="mb-3">ADDRESS</h4>
								<Form.Control
									as="select"
									defaulvalue="Choose..."
									onChange={(id) => addId(id)}
								>
									<option disabled>Choose Address...</option>
									{filtadd
										? filtadd.map((item, index) => {
												return (
													<option
														key={index}
														value={index}
													>
														{item.fname}{" "}
														{item.lname}, {item.add}
														, {item.city},{" "}
														{item.state},{" "}
														{item.country} -{" "}
														{item.pin}
													</option>
												);
										  })
										: ""}
									<option href="/my-account">
										Add Address...
									</option>
								</Form.Control>
							</Form.Group>
							<br />

							<h4>Card Details</h4>
							<br />
							<div className="m-auto">
								<ATMCard
									year={year}
									month={month}
									cvv={cvv}
									number={number}
									holderName={holder}
									bankLogo={
										<h1
											style={{
												fontFamily: "Arial",
												fontSize: 30,
												color: "white",
											}}
										>
											StanChart
										</h1>
									}
									bgImage="../../../images/bg1.jpg"
									lifted
									system="visa"
									dark={true}
									onChange={(data) => {
										setNumber(data.number);
										setCvv(data.cvv);
										setMonth(data.month);
										setYear(data.year);
										setHolder(data.holder);
									}}
								/>
							</div>
						</Card>
					</Col>
					<Col md={4}>
						<Card
							className="text-center"
							style={{ padding: "20px", width: "100%" }}
						>
							<h2 className="text-center">Confirm Order</h2>
							<hr />
							<br />

							<Row>
								<Col md={6} className="text-left">
									{" "}
									<h5>Subtotal</h5>
								</Col>
								<Col md={6}>
									<h5 className="text-right text-danger">
										&#8377;{" "}
										{location.state.subtotal.toFixed(2)}
									</h5>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col md={6} className="text-left">
									<h5>GST(18%)</h5>
								</Col>
								<Col md={6}>
									<h5 className="text-right text-danger">
										&#8377; {location.state.gst.toFixed(2)}
									</h5>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col md={6} className="text-left">
									<h5>Order Total</h5>
								</Col>
								<Col md={6}>
									<h5 className="text-right text-danger">
										&#8377;{" "}
										{(
											location.state.subtotal +
											location.state.gst
										).toFixed(2)}
									</h5>
								</Col>
							</Row>
							<br />
							<br />
							<Button
								variant="warning"
								type="submit"
								onClick={() => orderPlaced()}
							>
								CHECKOUT
							</Button>
						</Card>
					</Col>
				</Row>
				{/* </Form> */}
				<br />
			</section>
			<FooterSec />
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Componenet

export default CheckOut;
