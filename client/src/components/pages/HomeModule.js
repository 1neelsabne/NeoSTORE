// Importing Required Packages and Libraries

import React, { useState, useEffect } from "react";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { Row, Card, Col, Container } from "react-bootstrap";
import { getTopProd } from "../../config/productServices";
import CarouSel from "../CarouSel";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import jwtDecode from "jwt-decode";
import { getCartData } from "../../config/myServices";

// Defining Functional Component

function HomeModule() {
	const [top, setTop] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Defining useEffect Hook

	useEffect(() => {
		getTopProd()
			.then((res) => {
				setTop(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		// if (localStorage.getItem("mycart")) {
		// 	const info = JSON.parse(localStorage.getItem("mycart"));
		// 	info.forEach((item) => dispatch(addToCart(item)));
		// } else {
		// 	alert("Mycart not found");
		// }

		if (localStorage.getItem("_token")) {
			let token = localStorage.getItem("_token");
			let decode = jwtDecode(token);
			getCartData(decode.uid).then((res) => {
				//console.log(res.data);
				if (localStorage.getItem("mycart")) {
					const products = JSON.parse(localStorage.getItem("mycart"));
					const abc = res.data;
					const xyz = products.concat(abc);

					const unique = [];
					xyz.map((x) =>
						unique.filter(
							(a) => a._id === x._id && a.name === x.name
						).length > 0
							? null
							: unique.push(x)
					);

					localStorage.setItem("mycart", JSON.stringify(unique));
					unique.forEach((item) => dispatch(addToCart()));
				} else {
					localStorage.setItem("mycart", JSON.stringify(res.data));
					res.data.forEach((item) => dispatch(addToCart()));
				}
			});
		}
	}, [dispatch]);

	// Function for Showing Product Details and Navigating

	const showDetail = (item) => {
		if (item) {
			navigate(`/product-detail/${item._id}`);
		}
	};

	// Rendering HTML Element and Designing Part

	return (
		<>
			<NavBar />
			<CarouSel />
			<section className="bgimage text-center ">
				<div className="px-4 text-white">
					<h1>Popular Products</h1>
					<hr color="white" />
				</div>
				<br />
				<Container>
					<Row>
						{top.map((item, index) => {
							return (
								<Col key={index} className="mb-4">
									<Card
										style={{
											width: "15rem",
											height: "auto",
										}}
									>
										<Card.Img
											variant="top"
											src={item.product_image}
											height="180px"
											onClick={() => showDetail(item)}
										/>
										<Card.Body>
											<Card.Title>
												{item.product_name}
											</Card.Title>
											<Card.Text>
												<Rating
													initialValue={
														item.product_rating
													}
													size="20px"
													allowHover={false}
												/>
											</Card.Text>
											<Card.Text className="text-danger">
												{" "}
												&#8377; {item.product_cost}
											</Card.Text>
											{/* <Button
												type="submit"
												//onClick={}
											>
												Add to Cart
											</Button> */}
										</Card.Body>
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
				<br />
			</section>
			<FooterSec />
		</>
	);
}

// Exporting Functional Component

export default HomeModule;
