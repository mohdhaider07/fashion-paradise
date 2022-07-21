import "./App.css";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";
import Product from "./pages/Product";
// import Register from "./components/Form";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Pay from "./pages/Pay";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Register from "./pages/Register";
import User from "./pages/User";
import ForgotPass from "./pages/ForgotPass";
function App() {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<div className="App">
			{/* <Home /> */}
			{/* <ProductsList /> */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
				<Routes>
					<Route path="/products/:category" element={<ProductsList />} />
				</Routes>
				<Routes>
					<Route path="/product/:id" element={<Product />} />
				</Routes>
				<Routes>
					<Route path="/cart" element={<Cart />} />
				</Routes>
				<Routes>
					<Route
						path="/pay"
						element={user ? <Pay /> : <Navigate to="/login" />}
					/>
				</Routes>

				<Routes>
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
				</Routes>
				<Routes>
					<Route
						path="/register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
					<Route
						path="/user"
						element={user ? <User /> : <Navigate to="/login" />}
					/>
					<Route
						path="/forgotpassword"
						element={!user ? <ForgotPass /> : <Navigate to="/" />}
					/>
				</Routes>
			</BrowserRouter>
			<ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
		</div>
	);
}

export default App;
