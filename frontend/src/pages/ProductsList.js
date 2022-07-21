import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";

const ProductsList = () => {
	const location = useLocation();
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");
	const cat = location.pathname.split("/")[2];
	const handleChange = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	return (
		<div>
			<Navbar />
			<Announcements />
			<div className="m-4 mt-12">
				<h1 className="text-5xl  font-semibold">{cat}</h1>
				<div className="flex justify-between">
					<div className="md:flex md:space-x-4">
						<span className="text-xl font-medium">Filter Products:</span>
						<select
							onChange={handleChange}
							name="color"
							defaultValue="Color"
							className="p-2 px-4 md:mr-0 mr-1 focus:outline-none border"
						>
							<option value="Color" disabled>
								Color
							</option>
							<option>Black</option>
							<option>Red</option>
							<option>Blue</option>
							<option>Yellow</option>
						</select>
						<select
							onChange={handleChange}
							name="size"
							defaultValue="Size"
							className="p-2 px-4 focus:outline-none border"
						>
							<option value="Size" disabled>
								Size
							</option>
							<option>XS</option>
							<option>S</option>
							<option>M</option>
							<option>L</option>
							<option>XL</option>
						</select>
					</div>
					<div className="md:flex items-center md:space-x-4">
						<span className="text-xl font-medium">Filter Products:</span>
						<select
							onChange={(e) => setSort(e.target.value)}
							defaultValue="Newest"
							className="p-2 px-4 focus:outline-none border"
						>
							<option value="newest">Newest</option>
							<option value="asc">Price (asc)</option>
							<option value="desc">Price (desc)</option>
						</select>
					</div>
				</div>
			</div>
			<Products cat={cat} filters={filters} sort={sort} />
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default ProductsList;
