import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { toast } from "react-toastify";
import { Table, Empty } from "antd";
import { format } from "timeago.js";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const User = () => {
	const user = useSelector((state) => state.user.currentUser);
	const [order, setOrder] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	// console.log(user);

	useEffect(() => {
		fetchOrder();
	}, []);

	const fetchOrder = async () => {
		try {
			setLoading(true);
			const { data } = await userRequest.get(`/orders/${user?._id}`);
			// console.log(data);
			setOrder(data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			toast.error(
				err.response && err.response.data && err.response.data.message
					? err.response.data.message
					: err.message
			);
			console.log(err);
		}
	};

	// console.log(order.length);

	return (
		<div>
			<Navbar />
			<Announcements />
			<div className=" md:flex flex-row-reverse ">
				<div className=" p-4 md:w-2/3 ">
					<h1 className=" font-thin md:text-6xl text-4xl ">
						{" "}
						YOUR
						<br />
						ORDERS
					</h1>
					{order.length ? (
						<div>
							{order.map((item) => (
								<div className="mb-16" key={item._id}>
									<div className="  flex justify-between items-center ml-2 space-x-4">
										<div className="flex items-center space-x-2">
											<span className=" flex items-start p-1 px-2 rounded-2xl bg-amber-600 text-white font-thin ">
												{item.status}
											</span>
											<span className=" flex items-start bg-teal-600  p-1 px-2 rounded-2xl text-white  ">
												<span className=" font-bold">Total : </span>{" "}
												${item.amount}
											</span>
										</div>
										<span className=" text-slate-900 font-thin text-xs">
											{format(item.createdAt)}
										</span>
									</div>
									<div>
										<table className="mt-2 w-full">
											<tr className=" h-12 bg-gray-50 border-b">
												<th className=" text-left  pl-4 text-base">
													Name
												</th>
												<th className=" text-base">Color</th>
												<th className=" text-base">Size</th>
												<th className=" text-base">
													Price{" "}
													<span className="font-thin ">x</span>{" "}
													Quantity
												</th>
												<th className=" text-base">Total</th>
											</tr>
											{item.products.map((p) => (
												<tr
													className="h-12  w-full  border-b-[0.5px]"
													key={p._id}
												>
													<td className=" pl-4 ">
														<Link
															className="flex items-center "
															to={`/product/${p.productId}`}
														>
															{p.title}
														</Link>
													</td>

													<td className="text-center ">
														{p.color}
													</td>
													<td className="text-center ">
														{p.size}
													</td>
													<td className="text-center ">
														{p.price}{" "}
														<span className="font-thin">x</span>
														{"  "}
														{p.quantity}
													</td>
													<td className="text-center ">
														{p.quantity * p.price}
													</td>
												</tr>
											))}
										</table>
									</div>
								</div>
							))}
						</div>
					) : loading ? (
						"Loading..."
					) : (
						<Empty />
					)}
				</div>
				<div className=" md:flex justify-center  md:w-1/3 p-4 bg-rose-50">
					<div className=" md:flex flex-col p-2 items-center">
						<span className="logo hidden md:flex mb-8 md:text-4xl text-sm font-bold ">
							Fashion Paradise
						</span>{" "}
						{user && (
							<>
								<div className="">
									<h3 className="font-thin hover:text-slate-900">
										{user.name}
									</h3>
									<h3 className="font-thin hover:text-slate-900">
										{user.email}
									</h3>
									<h3 className="font-thin hover:text-slate-900">
										{user.username}
									</h3>
								</div>
								<span
									onClick={() => {
										// localStorage.removeItem("TOKEN");
										dispatch(logout());
									}}
									className="font-thin cursor-pointer mt-8 p-1 text-white rounded-md bg-rose-600"
								>
									Logout
								</span>
							</>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default User;
