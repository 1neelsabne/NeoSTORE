// Importing Required Packages and Libraries

import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

// Creating Redux Store for Cart Count

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Exporting Store

export default store;
