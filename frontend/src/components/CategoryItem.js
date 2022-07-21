import React from "react";
import { Link } from "react-router-dom";
const CategoryItem = ({ item }) => {
	return (
		<>
			<div className="h-fit  relative pb-1 text-white" key={item.id}>
				<img
					className="w-full object-contain"
					src={item.img}
					alt={item.img}
				></img>
				<div className="absolute flex flex-col text-center top-0 bottom-0 mx-auto h-fit w-fit left-0 right-0 my-auto">
					<h1 className="lg:text-3xl text-2xl p-1 flex  rounded-lg  font-semibold text-white ">
						{item.title}
					</h1>
					<Link to={`/products/${item.cat}`}>
						<button className="p-2 bg-white font-semibold rounded-sm text-bold text-slate-900 cursor-pointer">
							SHOP NOW
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CategoryItem;
