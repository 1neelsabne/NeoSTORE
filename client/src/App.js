// Importing Required Packages and Libraries

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Implementing Lazy Loading

const ProDuct = lazy(() => import("./components/pages/ProDuct"));
const Cart = lazy(() => import("./components/pages/Cart"));
const MyAccount = lazy(() => import("./components/pages/MyAccount"));
const CheckOut = lazy(() => import("./components/pages/CheckOut"));
const OrderSec = lazy(() => import("./components/pages/OrderSec"));
const ForgotPass = lazy(() => import("./components/pages/ForgotPass"));
const HomeModule = lazy(() => import("./components/pages/HomeModule"));
const LogIN = lazy(() => import("./components/pages/LogIN"));
const RecoverPass = lazy(() => import("./components/pages/RecoverPass"));
const SignUP = lazy(() => import("./components/pages/SignUP"));
const ProdDetails = lazy(() => import("./components/pages/ProdDetails"));

// Functional Componenet and Defining Routing

function App() {
	return (
		<>
			<Suspense
				fallback={
					<div className="text-center">
						<h2>LOADING</h2>
						<img
							src="../images/loader.gif"
							alt="loading"
							height="150px"
						/>
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<HomeModule />} />
					<Route path="/log-in" element={<LogIN />} />
					<Route path="/sign-up" element={<SignUP />} />
					<Route path="/forgot-password" element={<ForgotPass />} />
					<Route path="/recover-password" element={<RecoverPass />} />
					<Route
						path="/product-detail/:id"
						element={<ProdDetails />}
					/>
					<Route path="/products" element={<ProDuct />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/my-account" element={<MyAccount />} />
					<Route path="/check-out" element={<CheckOut />} />
					<Route path="/order" element={<OrderSec />} />
				</Routes>
			</Suspense>
		</>
	);
}

// Exporting Functional Component

export default App;
