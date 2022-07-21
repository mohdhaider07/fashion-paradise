import React, { useState } from "react";
import {
	SearchOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
const Navbar = () => {
	const dispatch = useDispatch();
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const [item, setItem] = useState([]);
	// console.log(user);

	const handleChange = async (e) => {
		console.log(e.target.value);
		try {
			const { data } = await publicRequest(
				`/products/search/${e.target.value}`
			);
			setItem(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="md:h-12  ">
			<div className="py-1 px-4 flex justify-between items-center">
				<div className="w-1/3 flex  items-center sm:space-x-6">
					<span className=" hidden sm:block text-md">EN</span>
					<div className="border ">
						<div className=" relative flex items-center">
							<input
								className="focus:outline-none pl-1"
								placeholder="search"
								type="text"
								onChange={handleChange}
							/>
							<span className="  text-gray-400 -mt-1">
								<SearchOutlined />
							</span>
						</div>

						<div className="absolute mt-2 z-50 w-[178.73px]  flex flex-col list-none rounded-b-sm bg-white">
							{item.length > 0 &&
								item.map((i) => (
									<Link
										key={i._id}
										className=" hover:bg-gray-400"
										to={`/product/${i._id}`}
									>
										<span className="md:text-base hover:text-teal-600  text-black  font-thin  leading-3 text-md  pl-2">
											{i.title}
										</span>
									</Link>
								))}
						</div>
					</div>
				</div>
				<div className="w-1/3 hidden sm:block">
					<div className="flex   md:justify-center   justify-end items-center">
						<Link className="text-black" to="/">
							<span className="logo  lg:text-4xl md:text-3xl sm:text-xl text-xs font-bold ">
								Fashion Paradise
							</span>
						</Link>
					</div>
				</div>
				<div className="w-1/3 flex justify-end items-center sm:space-x-3 space-x-[3px]">
					{!user ? (
						<>
							<Link
								className="cursor-pointer text-slate-900"
								to="/register"
							>
								<span className="sm:text-sm text-xs">REGISTER</span>
							</Link>
							<Link
								className="cursor-pointer text-slate-900"
								to="/login"
							>
								<span className="text-xs">SIGN IN</span>
							</Link>
						</>
					) : (
						<Link
							className="hover:text-slate-800 text-slate-800"
							to="/user"
						>
							<span
								// onClick={() => dispatch(logout())}
								className=" flex text-xl items-center  cursor-pointer"
							>
								<UserOutlined />
							</span>
						</Link>
					)}
					<Link to="/cart">
						<div className="-mt-2 cursor-pointer">
							<Badge
								size="small"
								style={{
									backgroundColor: "#1363DF",
									position: "absolute",
									top: 10,
									right: 4,
								}}
								className=""
								count={quantity}
							>
								<span className="text-xl">
									{" "}
									<ShoppingOutlined />
								</span>
							</Badge>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
