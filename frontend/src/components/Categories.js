import React from "react";
import CategoryItem from "./CategoryItem";
import { categories } from "../data";

const Categories = () => {
	return (
		<div className="flex md:mt-4 mt-0  justify-center">
			<div className=" lg:columns-4 md:columns-3 columns-2 gap-1">
				{categories.map((item) => (
					<CategoryItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default Categories;
