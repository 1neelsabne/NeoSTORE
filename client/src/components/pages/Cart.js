// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { useDispatch } from "react-redux";
import { addToCart, remFromCart } from "../../redux/actions/actions";
import {
	Card,
	Col,
	Row,
	Table,
	Form,
	Button,
	Image,
	ProgressBar,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Defining Functional Componenet

function Cart() {
	const [items, setItems] = useState([]);
	let total = [0];
	let subtotal;
	let gst;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Defining useEffect Hook

	useEffect(() => {
		if (localStorage.getItem("mycart") !== undefined) {
			const info = JSON.parse(localStorage.getItem("mycart"));
			if (info !== null) {
				info.forEach((item) => dispatch(addToCart()));
				setItems(info);
			}
		}
	}, [dispatch]);

	// Function for Incrementing Product Quantity

	const onPlus = (product) => {
		const exist = items.find((item) => item._id === product._id);
		if (exist) {
			items.forEach((item) => {
				if (item._id === product._id) {
					item.product_quantity = item.product_quantity + 1;
				}
			});
			setItems([...items]);
			localStorage.setItem("mycart", JSON.stringify(items));
		} else {
			items.push(product);
			setItems([...items]);
		}
	};

	// Function for Decrement Product Quantity

	const onMinus = (product) => {
		const exist = items.find((item) => item._id === product._id);
		if (exist.product_quantity === 1) {
			// setCart(items.filter((item) => item._id !== product._id));
		} else {
			items.forEach((item) => {
				if (item._id === product._id) {
					item.product_quantity = item.product_quantity - 1;
				}
			});
			setItems([...items]);
			localStorage.setItem("mycart", JSON.stringify(items));
		}
	};

	// Function for Removing Items From Cart

	const onDelete = (index) => {
		let lstore = JSON.parse(localStorage.getItem("mycart"));
		lstore.splice(index, 1);
		dispatch(remFromCart());
		console.log(lstore);
		let setStore = JSON.stringify(lstore);
		localStorage.setItem("mycart", setStore);
		setItems(lstore);
		toast.success("Removed Successfully", {
			position: "top-right",
			autoClose: 5000,
			theme: "dark",
		});
	};

	// Function for Cecking Whether cart is Empty or not when Click on proceed to buy without items

	const goOut = () => {
		if (localStorage.getItem("_token")) {
			if (JSON.parse(localStorage.getItem("mycart")).length < 1) {
				toast.warning(`Cart is empty, add products`, {
					position: "top-left",
					autoClose: 5000,
					theme: "dark",
				});
				setTimeout(() => {
					navigate("/products");
				}, 3000);
			} else {
				navigate("/check-out", { state: { subtotal, gst } });
			}
		} else {
			toast.error(`Please login first`, {
				position: "top-left",
				autoClose: 5000,
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/log-in");
			}, 3000);
		}
	};

	// Rendering HTML elements and Designing Part

	return (
		<>
			<NavBar />
			<section className="bgimage">
				<h2 className="text-white text-center mb-2">My Cart</h2>
				<hr style={{ backgroundColor: "white" }} />
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
									now={50}
									className="mt-1"
									variant="danger"
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
							className="text-center"
							style={{ padding: "20px", width: "100%" }}
						>
							<h2 className="text-left">Cart Items</h2>
							<br />
							<Table striped bordered hover borderless>
								<thead>
									<tr>
										<th>Sr.No</th>
										{/* <th>Image</th> */}
										<th>Products</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{items
										? items.map((value, index) => {
												return (
													<tr
														key={index}
														className="mt-3"
													>
														<td
															style={{
																paddingTop:
																	"40px",
															}}
														>
															{index + 1}
														</td>
														{/* <td>
															<Image
																src="../../../images/boy.png"
																width="90px"
																height="80px"
															></Image>{" "}
														</td> */}
														<td>
															<Row>
																<Col
																	md={5}
																	className="text-right"
																>
																	<Image
																		src={
																			value.product_image
																		}
																		width="90px"
																		height="80px"
																	></Image>
																</Col>
																<Col
																	md={7}
																	className="text-left"
																	style={{
																		paddingTop:
																			"25px",
																	}}
																>
																	{
																		value.product_name
																	}
																</Col>
															</Row>
														</td>
														<td
															style={{
																paddingTop:
																	"40px",
															}}
														>
															{value.product_cost}
														</td>
														<td
															style={{
																paddingTop:
																	"35px",
															}}
														>
															<Row>
																<Col md={4}>
																	<Button
																		variant="warning"
																		onClick={() =>
																			onMinus(
																				value
																			)
																		}
																		className="mr-auto"
																	>
																		-
																	</Button>
																</Col>
																<Col md={4}>
																	<Form.Control
																		type="number"
																		placeholder="Enter quantity"
																		min="1"
																		max="20"
																		value={
																			value.product_quantity
																		}
																		style={{
																			width: "100%",
																		}}
																	/>
																</Col>
																<Col md={4}>
																	<Button
																		variant="warning"
																		onClick={() =>
																			onPlus(
																				value
																			)
																		}
																		className="ml-auto"
																	>
																		+
																	</Button>
																</Col>
															</Row>
														</td>
														<td
															style={{
																paddingTop:
																	"40px",
															}}
														>
															{value.product_quantity *
																value.product_cost}
														</td>
														<td
															style={{
																paddingTop:
																	"35px",
															}}
														>
															<Button
																variant="danger"
																onClick={() =>
																	onDelete(
																		index
																	)
																}
															>
																<i className="fa fa-trash" />
															</Button>
														</td>
														{console.log(
															total.push(
																value.product_cost *
																	value.product_quantity
															)
														)}
													</tr>
												);
										  })
										: ""}
								</tbody>
							</Table>
						</Card>
					</Col>
					<Col md={4}>
						<Card style={{ padding: "20px" }}>
							<h2 className="text-center">Review Order</h2>
							<br />
							<Row>
								<Col md={6}>
									{" "}
									<h4>Subtotal</h4>
								</Col>
								<Col md={6}>
									<h4 className="text-right text-danger">
										&#8377;{" "}
										{(subtotal = total.reduce(
											(result, number) => result + number
										)).toFixed(2)}
									</h4>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col md={6}>
									<h4>GST(18%)</h4>
								</Col>
								<Col md={6}>
									<h4 className="text-right text-danger">
										&#8377;{" "}
										{(gst = (subtotal * 18) / 100).toFixed(
											2
										)}
									</h4>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col md={6}>
									<h4>Order Total</h4>
								</Col>
								<Col md={6}>
									<h4 className="text-right text-danger">
										&#8377; {(subtotal + gst).toFixed(2)}
									</h4>
								</Col>
							</Row>
							<br />
							<br />
							<Button variant="success" onClick={() => goOut()}>
								Proceed To Buy
							</Button>
						</Card>
					</Col>
				</Row>
				<br />
			</section>
			<FooterSec />
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Componenet

export default Cart;
