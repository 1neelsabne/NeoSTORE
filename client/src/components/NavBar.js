// Importing Required Packages and Libraries

import React, { useState, useEffect } from "react";
import {
	Navbar,
	Container,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { postCartData } from "../config/myServices";

//import { NavLink } from "react-bootstrap";

// Defining Functional Component

function NavBar() {
	const state = useSelector((state) => state.cartReducer.cartCount);
	const navigate = useNavigate();

	// Defining useEffect Hook

	useEffect(() => {
		const token = localStorage.getItem("_token");
		if (token) {
			setIsLogin(true);
		}
	}, []);

	const [isLogin, setIsLogin] = useState(false);

	// Function for LogOut and Clearing Cart, Token data

	const logOut = () => {
		// localStorage.removeItem("_token");
		// toast.success(`Log Out Successfully`, {
		// 	position: "top-left",
		// 	autoClose: 5000,
		// 	theme: "dark",
		// });
		// setTimeout(() => {
		// 	navigate("/");
		// }, 3000);

		if (localStorage.getItem("_token") && localStorage.getItem("mycart")) {
			let token = localStorage.getItem("_token");
			let decode = jwtDecode(token);
			let items = JSON.parse(localStorage.getItem("mycart"));
			postCartData(decode.uid, { item: items })
				.then((res) => {
					if (res.data.flg === 1) {
						localStorage.clear();
						toast.success(`Log Out Successfully`, {
							position: "top-left",
							autoClose: 5000,
							theme: "dark",
						});
						setTimeout(() => {
							navigate("/");
						}, 3000);
					} else {
						alert("something went wrong data not stored");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			localStorage.removeItem("_token");
			toast.success(`Log Out Successfully`, {
				position: "top-left",
				autoClose: 5000,
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	};

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<Navbar bg="dark" expand="lg" variant="dark" sticky="top">
				<Container fluid>
					<Navbar.Brand href="#home" className="ml-3">
						<h2>
							<b>
								Neo<font color="red">STORE</font>
							</b>
						</h2>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="m-auto">
							<Nav.Link href="/">
								<i className="fa fa-home"></i>
								<b> Home</b>
							</Nav.Link>
							<Nav.Link href="/products">
								<i className="fa fa-shopping-bag"></i>
								<b> Products</b>
							</Nav.Link>
							<Nav.Link href="/order">
								<i className="fa fa-list"></i>
								<b> Orders</b>
							</Nav.Link>
							<Nav.Link href="/cart">
								<i className="fa fa-shopping-cart"></i>
								<b> Cart ({state})</b>
							</Nav.Link>
						</Nav>
						<Form className="d-flex mr-4">
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-3 m-auto"
							/>
							<Button
								variant="success"
								className="mr-sm-2 m-auto"
							>
								Search
							</Button>
							<NavDropdown
								title={
									<i
										className="fa fa-user mr-3"
										style={{
											fontSize: "24px",
											color: "white",
										}}
									></i>
								}
								id="basic-nav-dropdown"
							>
								{isLogin ? (
									<>
										<NavDropdown.Item href="/my-account">
											Profile
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item
											onClick={() => logOut()}
										>
											Log Out
										</NavDropdown.Item>
									</>
								) : (
									<>
										<NavDropdown.Item href="/log-in">
											Log IN
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/sign-up">
											Sign UP
										</NavDropdown.Item>
									</>
								)}
							</NavDropdown>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<ToastContainer newestOnTop />
		</>
	);
}

// Exporting Functional Component

export default NavBar;
