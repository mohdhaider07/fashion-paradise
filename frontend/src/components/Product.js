import React from "react";
import {
	SearchOutlined,
	HeartOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import uniqid from "uniqid";
const Product = ({ item }) => {
	const dispatch = useDispatch();
	const addToCart = () => {
		const id = uniqid.time();
		dispatch(
			addProduct({
				...item,
				quantity: 1,
				color: item.color[0],
				size: item.size[0],
				id,
			})
		);
		toast.success("Added to cart");
	};

	return (
		<>
			{" "}
			<div className="w-[20.1rem] m-2 h-[22rem ">
				<div className="relative flex justify-center border items-center ">
					<Link to={`/product/${item._id}`}>
						<img className=" h-[22rem] object-cover " src={item.img} />{" "}
					</Link>
					<div className="flex absolute  z-50 top-0 bottom-0 h-1/3 w-1/3  my-auto shadow bg-opacity-30 rounded-lg bg-gray-400 opacity-0 hover:opacity-100 transition-all  duration-1000  justify-center items-center">
						<span
							onClick={addToCart}
							className="p-4 cursor-pointer text-5xl flex transition-all duration-500 items-center   delay-500 bg-rose-500 text-white  rounded-full"
						>
							{" "}
							<ShoppingOutlined />
						</span>
					</div>
					<div className=" absolute bottom-2 rounded-lg left-3  px-2 tracking-widest bg-teal-400  text-white font-thin ">
						{" "}
						sale{" "}
					</div>
				</div>
				<Link to={`/product/${item._id}`}>
					<div className="text-center ">
						<h1 className="font-thin text-gray-700 hover:text-teal-500">
							{item.title} Handwork (Handmade) Cashmere Wool Poncho for
							Women | Charcoal Grey | Riem Arts
						</h1>
						<div className=" text-base text-slate-900  hover:text-teal-500 font-semibold space-x-4">
							<span className="line-through">₹ 1252 INR</span>
							<span>₹ {item.price} INR</span>
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default Product;
