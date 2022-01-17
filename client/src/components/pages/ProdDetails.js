// Importing Required Packages and Libraries

import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Image,
	Row,
	Tabs,
	Tab,
} from "react-bootstrap";
import FooterSec from "../FooterSec";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import {
	FacebookShareButton,
	EmailShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	TwitterShareButton,
	FacebookIcon,
	EmailIcon,
	WhatsappIcon,
	PinterestIcon,
	TwitterIcon,
	TelegramShareButton,
	TelegramIcon,
} from "react-share";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { getFilterProduct } from "../../config/productServices";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function ProdDetails() {
	const params = useParams();
	const dispatch = useDispatch();

	// Defining useEffect Hook for geting data

	useEffect(() => {
		getFilterProduct({ id: params.id })
			.then((res) => {
				setInfo(res.data);
				// console.log(res.data);
				setPicture(res.data.product_image);
			})
			.catch((err) => {
				console.log(err);
			});

		// if (localStorage.getItem("mycart")) {
		// 	const info = JSON.parse(localStorage.getItem("mycart"));
		// 	info.forEach((item) => dispatch(addToCart()));
		// }
	}, [params, dispatch]);

	const url = window.location.href;
	const [info, setInfo] = useState();
	const [picture, setPicture] = useState();

	// Function for Adding Items to Cart

	const addedCart = () => {
		if (localStorage.getItem("mycart") !== null) {
			let data = JSON.parse(localStorage.getItem("mycart"));
			console.log(data);
			let idArrays = [];
			// Get list of all ids
			data.forEach((data) => {
				idArrays.push(data._id);
			});
			if (idArrays.includes(info._id)) {
				toast.error("Already Added, Visit Cart", {
					position: "top-right",
					autoClose: 5000,
					theme: "dark",
				});
			} else {
				data.push(info);
				localStorage.setItem("mycart", JSON.stringify(data));
				dispatch(addToCart(info));
				toast.success("Added to the Cart", {
					position: "top-right",
					autoClose: 5000,
					theme: "dark",
				});
			}
		} else {
			let arr = [];
			arr.push(info);
			localStorage.setItem("mycart", JSON.stringify(arr));
			dispatch(addToCart(info));
			toast.success("Added to the Cart", {
				position: "top-right",
				autoClose: 5000,
				theme: "dark",
			});
		}
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<NavBar />
			{info ? (
				<>
					<section className="bgimage">
						<Container
							fluid
							className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"
						>
							<Card style={{ padding: "30px" }}>
								<Row className="mb-1">
									<Col md={5}>
										<Card
											style={{
												padding: "20px",
												width: "580px",
												height: "auto",
											}}
											className="m-auto"
										>
											<InnerImageZoom
												src={picture}
												width={580}
												height={100}
											/>
										</Card>
										<Row className="mt-4">
											<Col md={3}>
												<Image
													src={info.product_image}
													width="147px"
													height="100px"
													onClick={() =>
														setPicture(
															info.product_image
														)
													}
												/>
											</Col>
											<Col md={3}>
												<Image
													src={info.product_subimg[0]}
													width="147px"
													height="100px"
													onClick={() =>
														setPicture(
															info
																.product_subimg[0]
														)
													}
												/>
											</Col>
											<Col md={3}>
												<Image
													src={info.product_subimg[1]}
													width="147px"
													height="100px"
													onClick={() =>
														setPicture(
															info
																.product_subimg[1]
														)
													}
												/>
											</Col>
											<Col md={3}>
												<Image
													src={info.product_subimg[2]}
													width="147px"
													height="100px"
													onClick={() =>
														setPicture(
															info
																.product_subimg[2]
														)
													}
												/>
											</Col>
										</Row>
									</Col>
									<Col md={7}>
										<aside className="ml-5 mt-1">
											<h1 className="mb-3">
												{info.product_name}
											</h1>
											<Rating
												initialValue={
													info.product_rating
												}
												size="33px"
												allowHover={false}
											/>
											<hr className="mb-5" />
											<h4 className="mb-3">
												Price :{" "}
												<font color="red">
													&#8377; {info.product_cost}
												</font>
											</h4>
											<h4>
												Color :{" "}
												<Button
													variant="light"
													style={{
														borderRadius: "50%",
														backgroundColor: `${info.color_id.color_code}`,
														width: "25px",
														height: "25px",
													}}
												/>
											</h4>
											<br /> <br />
											<h4>
												Share{" "}
												<i className="fa fa-share mb-3"></i>
											</h4>
											<div className="mb-2">
												<FacebookShareButton url={url}>
													<FacebookIcon
														size={50}
														round
													/>
												</FacebookShareButton>
												&nbsp;&nbsp;&nbsp;{" "}
												<TelegramShareButton url={url}>
													<TelegramIcon
														size={50}
														round
													/>
												</TelegramShareButton>
												&nbsp;&nbsp;&nbsp;
												<WhatsappShareButton url={url}>
													<WhatsappIcon
														size={50}
														round
													/>
												</WhatsappShareButton>
												&nbsp;&nbsp;&nbsp;
												<PinterestShareButton
													url={url}
													media="/favicon.ico"
												>
													<PinterestIcon
														size={50}
														round
													/>
												</PinterestShareButton>
												&nbsp;&nbsp;&nbsp;
												<TwitterShareButton url={url}>
													<TwitterIcon
														size={50}
														round
													/>
												</TwitterShareButton>
												&nbsp;&nbsp;&nbsp;
												<EmailShareButton url={url}>
													<EmailIcon
														size={50}
														round
													/>
												</EmailShareButton>
											</div>
											<br />
											<Button
												className="mt-1"
												variant="warning"
												size="lg"
												onClick={() => addedCart()}
											>
												ADD TO CART
											</Button>{" "}
											&nbsp; &nbsp;
											<Button variant="info" size="lg">
												RATE PRODUCT
											</Button>
											<br />
											<br />
											<Tabs
												className="mt-4"
												defaultActiveKey="description"
												id="uncontrolled-tab-example"
											>
												<Tab
													eventKey="description"
													title="Description"
												>
													<p className="mt-2 ml-2">
														{info.product_desc}
													</p>
												</Tab>
												<Tab
													eventKey="features"
													title="Features"
												>
													<p className="mt-2 ml-2">
														World
													</p>
												</Tab>
											</Tabs>
										</aside>
									</Col>
								</Row>
							</Card>
						</Container>
					</section>
				</>
			) : (
				""
			)}
			<FooterSec />
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default ProdDetails;
