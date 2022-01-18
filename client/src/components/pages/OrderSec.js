// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { Row, Container, Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
	deleteOrder,
	downInvoice,
	getOrderDetail,
} from "../../config/productServices";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function OrderSec() {
	const navigate = useNavigate();
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("_token")) {
			const decode = jwtDecode(localStorage.getItem("_token"));
			getOrderDetail(decode.uid)
				.then((res) => {
					setOrderdata(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
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
		// if (localStorage.getItem("mycart")) {
		// 	const info = JSON.parse(localStorage.getItem("mycart"));
		// 	info.forEach((item) => dispatch(addToCart()));
		// }
	}, [navigate, refresh]);

	const [orderdata, setOrderdata] = useState([]);

	// Function for Generating Invoice and Downloading PDF

	const invoicePdf = (ordr) => {
		downInvoice(ordr)
			.then((res) => {
				//console.log("PDF Downloaded");
				if (res.data.flg === 1) {
					// loadingInvoice();

					toast.success(`${res.data.message}`, {
						position: "top-left",
						autoClose: 5000,
						theme: "dark",
					});
					// window.location.href = res.data.path;
					console.log(res.data.path);
					//window.open(res.data.path, "_blank");
					var link = document.createElement("a");
					link.href = res.data.path;
					link.download = "invo.pdf";
					link.dispatchEvent(new MouseEvent("click"));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Function for Cancelling Orders

	const cancelOrder = (id, index) => {
		console.log(id);
		deleteOrder(id)
			.then((res) => {
				if (res.data.flg === 1) {
					// let data = [...orderdata];
					// data.splice(index, 0);
					setRefresh(true);
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
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<NavBar />
			<section className="bgimage">
				<h2 className="text-white text-center mb-2">Product Orders</h2>
				<hr style={{ backgroundColor: "white" }} />
				<Container
					fluid
					className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"
				>
					{orderdata
						? orderdata.map((main, index) => {
								return (
									<Card
										style={{ padding: "30px" }}
										key={index}
										className="mb-3"
									>
										<Row>
											<Col md={6}>
												<h4 className="mb-3">
													Order Number : {main._id}
												</h4>
												<h4>
													Order :{" "}
													<font color="green">
														Completed
													</font>
												</h4>
											</Col>
											<Col md={6} className="text-right">
												<h4 className="mb-3">
													Date :{" "}
													{main.createdAt.substring(
														0,
														10
													)}
												</h4>
												<h4>
													Status :{" "}
													<font color="blue">
														In Transit
													</font>
												</h4>
											</Col>
										</Row>
										<hr />
										<Row>
											{main.order_list.map(
												(sub, indexx) => {
													return (
														<div
															className="mt-2 ml-2 mr-2 mb-2"
															key={indexx}
														>
															<img
																alt={
																	sub.product_name
																}
																src={
																	sub.product_image
																}
																width="130px"
																height="90px"
															/>
														</div>
													);
												}
											)}
										</Row>
										<hr />
										<Row className="mt-2">
											<Col md={6}>
												<Button
													variant="warning"
													size="lg"
													onClick={() =>
														invoicePdf(main)
													}
												>
													Download Invoice as PDF
												</Button>
												&nbsp;&nbsp;
												<Button
													variant="danger"
													size="lg"
													onClick={() =>
														cancelOrder(
															main._id,
															index
														)
													}
												>
													Cancel Order
												</Button>
											</Col>
											<Col md={6}>
												<h3 className="text-right">
													Total :{" "}
													<font color="red">
														&#8377; {main.total}
													</font>
												</h3>
											</Col>
										</Row>
									</Card>
								);
						  })
						: ""}
				</Container>
			</section>
			<FooterSec />
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default OrderSec;
