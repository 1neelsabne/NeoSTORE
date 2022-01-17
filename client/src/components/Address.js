// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { getAddress, remAddress } from "../config/myServices";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { ToastContainer, toast } from "react-toastify";

// Defining Functional Component

function Address({ profile }) {
	const [modalShow, setModalShow] = useState(false);
	const [editmodal, setEditmodal] = useState(false);

	// Defining useEffect Hook for getting user Address

	useEffect(() => {
		getAddress(profile.email)
			.then((res) => {
				setAddress(res.data);
			})
			.catch((err) => {
				throw err;
			});
	}, [profile]);

	const [address, setAddress] = useState([]);
	const [add, setAdd] = useState();

	// Function for Deleting Address

	const onDelete = (id, index) => {
		console.log(id, index);
		remAddress(profile.email, { id: id })
			.then((res) => {
				if (res.data.flg === 1) {
					address.splice(index, 1);
					setAddress([...address]);
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

	// function for Opening edit Modal

	const editData = (item) => {
		setAdd(item);
		setEditmodal(true);
		console.log(item);
	};

	// Rendering HTML Elements and Designing part

	return (
		<>
			<h1>Addresses</h1>
			<br />
			<Card style={{ padding: "30px", width: "100%", margin: "auto" }}>
				{address
					? address.map((item, index) => {
							return (
								<Card
									style={{ padding: "20px" }}
									className="mb-2"
									key={index}
								>
									<Row className="px-3 w-100">
										<Col md={10} className="text-left">
											<h5>
												{item.fname} {item.lname}
											</h5>
											<label>
												{item.add} <br />
												{item.city}, {item.state} <br />
												{item.country} - {item.pin}
											</label>
										</Col>
										<Col md={1} className="text-center">
											<Button
												variant="warning"
												onClick={() => editData(item)}
											>
												<i className="fa fa-pencil"></i>
											</Button>
										</Col>
										<Col md={1} className="text-center">
											<Button
												variant="danger"
												onClick={() =>
													onDelete(item._id, index)
												}
											>
												<i className="fa fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</Card>
							);
					  })
					: "Loading.."}

				<Row className="px-3 mt-2">
					<Button
						className="w-100"
						variant="info"
						onClick={() => setModalShow(true)}
					>
						Add Address
					</Button>
				</Row>
			</Card>
			<AddModal
				show={modalShow}
				onHide={false}
				setModalShow={setModalShow}
				email={profile.email}
				address={address}
				setAddress={setAddress}
			/>
			{add ? (
				<EditModal
					show={editmodal}
					onHide={false}
					email={profile.email}
					setEditmodal={setEditmodal}
					address={address}
					setAddress={setAddress}
					add={add}
				/>
			) : (
				""
			)}
			<ToastContainer newestOnTop />
		</>
	);
}

//Exporting functional Component

export default Address;
