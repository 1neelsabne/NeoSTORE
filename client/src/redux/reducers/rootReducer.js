// Importing Required Packages and Libraries

import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

// Exporting combine reducer i.e. root reducer

export default combineReducers({
	cartReducer,
});
