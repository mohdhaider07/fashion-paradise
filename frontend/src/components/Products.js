import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
const Products = ({ cat, filters, sort }) => {
	const [products, setProducts] = useState();
	const [filteredproducts, setFilteredProducts] = useState();
	useEffect(() => {
		getProducts();
	}, [cat]);

	const getProducts = async () => {
		try {
			const { data } = await axios.get(
				cat
					? `https://fashion-paradise-react.herokuapp.com/api/products?category=${cat}`
					: `https://fashion-paradise-react.herokuapp.com/api/products`
			);
			setProducts(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		cat && products && FilteringProducts();
	}, [cat, products, filters]);

	const FilteringProducts = () => {
		setFilteredProducts(
			products.filter((item) =>
				Object.entries(filters).every(([key, value]) =>
					item[key].includes(value)
				)
			)
		);
	};

	useEffect(() => {
		sort && sortProducts();
	}, [sort]);
	const sortProducts = () => {
		if (!filteredproducts) return;
		if (sort === "newest") {
			{
				console.log("in size card");
			}
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	};
	// console.log(filteredproducts);
	return (
		<div className="p-2 flex justify-center flex-wrap">
			{cat
				? filteredproducts &&
				  filteredproducts.map((item) => (
						<Product key={item._id} item={item} />
				  ))
				: products &&
				  products.map((item) => <Product key={item._id} item={item} />)}
		</div>
	);
};

export default Products;
