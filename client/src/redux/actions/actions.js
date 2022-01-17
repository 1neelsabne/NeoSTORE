// Importing Required Packages and Libraries

import { ADD_TO_CART, REM_FROM_CART } from "../constants/Constants";

// Exporting action functions for Product Count

export const addToCart = () => {
	//console.warn('action', data)
	return {
		type: ADD_TO_CART,
	};
};

export const remFromCart = () => {
	return {
		type: REM_FROM_CART,
	};
};
