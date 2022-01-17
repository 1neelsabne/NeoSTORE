// Importing Required Packages and Libraries

import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import { getCategoryImage } from "../config/productServices";

// Defining Functional Component

function CarouSel() {
	const [catImage, setCatImage] = useState([]);

	// Defining useEffect Hook for Images for Carousel

	useEffect(() => {
		getCategoryImage()
			.then((res) => {
				setCatImage(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Rendering HTML Elements and Designing Part

	return (
		<>
			<Carousel fade>
				{catImage.map((item, index) => {
					return (
						<Carousel.Item key={index}>
							<Image
								className="d-block w-100"
								src={item.category_image}
								alt="Category Slides"
								height="600px"
							/>
						</Carousel.Item>
					);
				})}
			</Carousel>
		</>
	);
}

// Exporting Functional Component

export default CarouSel;
