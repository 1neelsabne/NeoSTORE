// Importing Required Packages and Libraries

import React, { useState, useEffect } from "react";
import {
	Button,
	Col,
	Row,
	DropdownButton,
	Dropdown,
	Card,
} from "react-bootstrap";
import {
	getCommonProduct,
	getFilterProduct,
	getProdColor,
} from "../../config/productServices";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { getCategoryImage } from "../../config/productServices";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function ProDuct() {
	const [product, setProduct] = useState([]);
	const [catName, setCatName] = useState([]);
	const [prodcolor, setProdcolor] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Defining useEffect Hook for getting Details form the Server

	useEffect(() => {
		getCommonProduct()
			.then((res) => {
				setProduct(res.data.sort(() => Math.random() - 0.5));
			})
			.catch((err) => {
				console.log(err);
			});
		getCategoryImage()
			.then((res) => {
				setCatName(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		getProdColor()
			.then((res) => {
				setProdcolor(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		if (localStorage.getItem("mycart")) {
			const info = JSON.parse(localStorage.getItem("mycart"));
			info.forEach((item) => dispatch(addToCart()));
		} else {
			//alert("Mycart not found");
		}
	}, [dispatch]);

	// Function for Showing Product Details and Navigating

	const showDetail = (item) => {
		// console.log(item);
		if (item) {
			navigate(`/product-detail/${item._id}`);
		}
	};

	// Function for getting all products from server for filtering

	const getItems = (id) => {
		getFilterProduct(id)
			.then((res) => {
				setProduct(res.data.sort(() => Math.random() - 0.5));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Function for Add Items to Cart

	const addedCart = (item) => {
		if (localStorage.getItem("mycart") !== null) {
			let data = JSON.parse(localStorage.getItem("mycart"));
			console.log(data);
			let idArrays = [];
			// Get list of all ids
			data.forEach((data) => {
				idArrays.push(data._id);
			});
			if (idArrays.includes(item._id)) {
				toast.error("Already Added, Visit Cart", {
					position: "top-right",
					autoClose: 5000,
					theme: "dark",
				});
			} else {
				data.push(item);
				localStorage.setItem("mycart", JSON.stringify(data));
				dispatch(addToCart());
				toast.success("Added to the Cart", {
					position: "top-right",
					autoClose: 5000,
					theme: "dark",
				});
			}
		} else {
			let arr = [];
			arr.push(item);
			localStorage.setItem("mycart", JSON.stringify(arr));
			dispatch(addToCart());
			toast.success("Added to the Cart", {
				position: "top-right",
				autoClose: 5000,
				theme: "dark",
			});
		}
	};

	// Function for Sorting Product by Top Stars

	const sortByRating = () => {
		let p = [...product];
		p.sort((a, b) => {
			return b.product_rating - a.product_rating;
		});
		//console.log(p);
		setProduct(p);
	};

	// Function for Sorting Product by Hieghst to  Lowest Money

	const moneyUP = () => {
		let p = [...product];
		p.sort((a, b) => {
			return b.product_cost - a.product_cost;
		});
		//console.log(p);
		setProduct(p);
	};

	// Function for Sorting Product by Lowest to Heighst Money

	const moneyDown = () => {
		let p = [...product];
		p.sort((a, b) => {
			return a.product_cost - b.product_cost;
		});
		//console.log(p);
		setProduct(p);
	};

	// Function for getting all Products

	const allProducts = () => {
		getCommonProduct()
			.then((res) => {
				setProduct(res.data.sort(() => Math.random() - 0.5));
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
				<Row className=" ml-3 mr-3 mb-4">
					<Col className="text-white text-right">
						Sort By : &nbsp;&nbsp;
						<Button onClick={() => sortByRating()}>
							<i className="fa fa-star"></i>
						</Button>
						&nbsp;&nbsp;
						<Button onClick={() => moneyUP()}>
							&#8377; <i className="fa fa-arrow-up"></i>
						</Button>
						&nbsp;&nbsp;
						<Button onClick={() => moneyDown()}>
							&#8377; <i className="fa fa-arrow-down"></i>
						</Button>
					</Col>
				</Row>
				<Row className="ml-3 mr-3 mt-3">
					<Col md={3}>
						<Button
							style={{ width: "100%" }}
							variant="info"
							onClick={() => allProducts()}
						>
							All Products
						</Button>
						<br />
						<br></br>
						<Row className="m-auto w-100">
							<DropdownButton
								id="dropdown-basic-button"
								title="Product Categories"
								className="w-100"
								variant="info"
							>
								{catName.map((item, index) => {
									return (
										<Dropdown.Item
											key={index}
											className="w-100"
											href="#/action-1"
											onClick={() =>
												getItems({ catid: item._id })
											}
										>
											{item.category_name}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>
						</Row>
						<br />
						<Row className="m-auto w-100">
							<DropdownButton
								id="dropdown-basic-button"
								title="Product Colors"
								className="w-100"
								variant="info"
							>
								{prodcolor.map((item, index) => {
									return (
										<Dropdown.Item
											key={index}
											className="w-100"
											href="#/action-1"
											onClick={() =>
												getItems({ colorid: item._id })
											}
										>
											{item.color_name}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>
						</Row>
					</Col>
					<Col md={9}>
						<Row className="text-center ml-2">
							{product.map((item, index) => {
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
												<Button
													type="submit"
													onClick={() =>
														addedCart(item)
													}
												>
													<i className="fa fa-shopping-cart"></i>
													&nbsp; &nbsp;Add to Cart
												</Button>
											</Card.Body>
										</Card>
									</Col>
								);
							})}
						</Row>
					</Col>
				</Row>
			</section>
			<FooterSec />
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default ProDuct;
