// import React from "react";
import { ADD_TO_CART, REM_FROM_CART } from "../constants/Constants";
// Defining reducer for cart count increment and decrement

const initialState = { cartCount: 0 };

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return { cartCount: state.cartCount + 1 };
		case REM_FROM_CART:
			if (state.cartCount > 0) {
				return { cartCount: state.cartCount - 1 };
			} else {
				return state;
			}

		default:
			return state;
	}
};

// Exporting cart Reducer

export default cartReducer;
