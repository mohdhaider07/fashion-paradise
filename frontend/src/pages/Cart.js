import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { toast } from "react-toastify";

import {
	incrementQuantity,
	decrementQuantity,
	remove,
} from "../redux/cartRedux";
const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const quantity = useSelector((state) => state.cart.quantity);

	return (
		<div>
			<Navbar />
			<Announcements />
			<div className="p-2 ">
				<div className="text-center">
					<h1 className="text-4xl font-thin">YOUR BAG</h1>
				</div>
				<div className="flex p-2 items-center justify-between">
					<HashLink smooth to="/#orderNow">
						<button className="font-semibold text-slate-800 md:text-base text-xs transit duration-500 hover:bg-gray-100 border-4 border-slate-800 md:px-2 py-2 px-1  ">
							{" "}
							CONTINUE SHIPPING
						</button>
					</HashLink>
					<div className="space-x-2">
						<span className="underline  md:text-base text-xs decoration-2">
							Shopping Bag({quantity})
						</span>
					</div>
					<HashLink smooth to="/cart/#orderNow">
						<button className="font-semibold md:text-base text-xs text-white bg-slate-900 py-3 px-3 ">
							CHECKOUT NOW
						</button>
					</HashLink>
				</div>
				<div className="md:flex">
					<div className="p-2 w-full">
						{cart.products.map((product) => (
							<div className=" border-b-2 md:text-base text-xs flex gap-4">
								<div className="w-28 flex justify-center items-center h-40">
									<img
										className="w-full object-cover"
										src={product.img}
										alt="product image"
									/>
								</div>
								<div className="flex w-full justify-between">
									<div className="flex space-y-1 flex-col justify-center">
										<div>
											<span className="font-semibold">Product:</span>
											<span> {product.title}</span>
										</div>
										<div>
											<span className=" font-medium">
												Price for 1 Qut:
											</span>
											<span> $ {product.price}</span>
										</div>
										<div>
											<span className="font-semibold">ID:</span>
											<span>{product._id}</span>
										</div>
										<span
											style={{ backgroundColor: product.color }}
											className="p-2 border-2 border-gray-200 rounded-full w-fit"
										></span>
										<div>
											<span className="font-semibold">SIZE:</span>
											<span> {product.size}</span>
										</div>
									</div>
									<div className="flex flex-col space-y-3 items-center justify-center">
										<div className="flex items-center space-x-1">
											<button
												disabled={product.quantity < 2}
												onClick={() =>
													dispatch(decrementQuantity(product))
												}
												className="text-2xl py-1 px-3 rounded-lg  font-bold"
											>
												-
											</button>
											<span className="text-2xl flex items-center py-1 px-3   font-thin">
												{product.quantity}
											</span>
											<button
												onClick={() =>
													dispatch(incrementQuantity(product))
												}
												className="text-2xl py-1 px-3 rounded-lg  font-bold"
											>
												+
											</button>
										</div>
										<h2 className="text-4xl  font-thin">
											{" "}
											$ {product.price * product.quantity}
										</h2>
										<span
											onClick={() => dispatch(remove(product))}
											className="p-1 cursor-pointer text-xs  text-white rounded-md bg-rose-700"
										>
											Remove
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
					<div id="orderNow" className="p-2  h-fit border-2 m-2 md:w-1/3">
						<h1 className="mb-8 mt-2 text-2xl font-thin">
							ORDER SUMMARY
						</h1>
						<div className="space-y-4 mb-6">
							<div className="flex  justify-between">
								<span>Subtotal</span>
								<span>$ {cart.total}</span>
							</div>
							<div className="flex  justify-between">
								<span>Estimated Shipping</span>
								<span>$ 5.80</span>
							</div>
							<div className="flex  justify-between">
								<span>Shipping Discount</span>
								<span>$ -5.80</span>
							</div>
							<div className="flex text-lg font-bold justify-between">
								<span>Total</span>
								<span>$ {cart.total}</span>
							</div>
						</div>

						{quantity ? (
							<Link to="/pay">
								<button className="py-2 w-full text-white bg-amber-500">
									ORDER NOW
								</button>
							</Link>
						) : (
							<button
								onClick={() => {
									toast.error("cart is Empty");
								}}
								className="py-2 w-full text-white bg-amber-500"
							>
								ORDER NOW
							</button>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Cart;
