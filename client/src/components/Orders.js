// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { getOrderDetail } from "../config/productServices";
import { downInvoice } from "../config/productServices";

// Functional Component

function Orders() {
	// Defining useEffect for getting Order Details

	useEffect(() => {
		const decode = jwtDecode(localStorage.getItem("_token"));
		getOrderDetail(decode.uid)
			.then((res) => {
				setOrderdata(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [orderdata, setOrderdata] = useState([]);

	// Function for downloading pdf

	const invoicePdf = (ordr) => {
		downInvoice(ordr)
			.then((res) => {
				if (res.data.flg === 1) {
					// loadingInvoice();
					//window.open("");
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<h1 className="text-center">Order Details</h1>
			<br />
			{orderdata
				? orderdata.map((main, index) => {
						return (
							<Card style={{ padding: "30px" }} key={index}>
								<Row>
									<Col md={6}>
										<h6 className="mb-3">
											Order Number : {main._id}
										</h6>
										<h6>
											Order :{" "}
											<font color="green">Completed</font>
										</h6>
									</Col>
									<Col md={6} className="text-right">
										<h6 className="mb-3">
											Date :{" "}
											{main.createdAt.substring(0, 10)}
										</h6>
										<h6>
											Status :{" "}
											<font color="blue">In Transit</font>
										</h6>
									</Col>
								</Row>
								<hr />
								<Row>
									{main.order_list.map((sub, indexx) => {
										return (
											<div
												className="mt-2 ml-2 mr-2 mb-2"
												key={indexx}
											>
												<img
													alt={sub.product_name}
													src={sub.product_image}
													width="90px"
													height="50px"
												/>
											</div>
										);
									})}
								</Row>
								<hr />
								<Row className="mt-2">
									<Col md={6}>
										<Button
											variant="warning"
											onClick={() => invoicePdf(main)}
										>
											Download Invoice as PDF
										</Button>
									</Col>
									<Col md={6}>
										<h5 className="text-right">
											Total :{" "}
											<font color="red">
												&#8377; {main.total}
											</font>
										</h5>
									</Col>
								</Row>
							</Card>
						);
				  })
				: ""}
		</>
	);
}

// Exporting Functional Component

export default Orders;
