import React from "react";
import { SendOutlined } from "@ant-design/icons";
const NewsLetter = () => {
	return (
		<div className=" flex flex-col justify-center items-center bg-rose-100 h-60">
			<h1 className="sm:text-6xl text-4xl">Newsletter</h1>
			<p className="font-thin text-lg">
				Get Timely updates from your favorite Products
			</p>
			<div className="flex justify-between items-center">
				<input
					className="p-1 md:w-80 focus:outline-none focus:border focus:border-slate-800"
					type="text"
				/>
				<span className=" cursor-pointer px-6 py-2 flex  items-center justify-center text-white hover:bg-teal-700 bg-teal-600">
					<SendOutlined />
				</span>
			</div>
		</div>
	);
};

export default NewsLetter;
