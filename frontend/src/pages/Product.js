import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import uniqid from "uniqid";
import { toast } from "react-toastify";
const Product = () => {
	const location = useLocation();
	const [qut, setQut] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [product, setProduct] = useState();
	const [images, setImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState("");
	// const [buttonDisable, setButtonDisable] = useState(true);
	const id = location.pathname.split("/")[2];
	const dispatch = useDispatch();
	useEffect(() => {
		id && getproduct();
	}, [id]);
	const getproduct = async () => {
		try {
			const { data } = await axios.get(
				`https://fashion-paradise-react.herokuapp.com/api/products/${id}`
			);
			// console.log(data);
			setProduct(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		product && setImages([product.img, ...product.images]);
	}, [product]);

	const handleClick = () => {
		const id = uniqid.time();
		dispatch(addProduct({ ...product, quantity: qut, color, size, id }));
		toast.success("Added to cart");
	};
	// console.log(product);
	// console.log(images);
	return (
		<div>
			<Navbar />
			<Announcements />
			{product && (
				<div className="p-2 md:flex">
					<div className="flex m-4  justify-center flex-1">
						<img
							className="w-full object-contain "
							src={selectedImage || product.img}
						/>
					</div>
					<div className=" m-4 flex-1">
						<div>
							<h1 className="text-3xl font-thin">{product.title}</h1>
							<p className="w-[80%] mb-4 tracking-wider">
								{product.dec}
							</p>
							<h2 className="text-4xl  font-thin"> ₹ {product.price}</h2>
						</div>
						{images && (
							<div className="flex  space-x-1">
								{images.map((i) => (
									<div
										onClick={() => setSelectedImage(i)}
										className={
											selectedImage == i
												? "h-24 p-1  cursor-pointer border-2 border-teal-400"
												: "h-24 p-1  cursor-pointer border-2 border-gray-200"
										}
										key={i}
									>
										<img className=" h-full " src={i} alt="img" />
									</div>
								))}
							</div>
						)}
						<div className="flex mt-8 items-center w-80  justify-between">
							<div className="flex items-center mr-4 space-x-1">
								<span className="text-2xl mr-2 font-thin">Color</span>
								{product.color.map((c) => (
									<span
										key={c}
										onClick={() => setColor(c)}
										style={{ backgroundColor: c }}
										className={
											color === c
												? "p-4 cursor-pointer border-[2.8px] border-teal-500 rounded-full"
												: "p-4 cursor-pointer border-2 border-gray-200 rounded-full"
										}
									></span>
								))}
							</div>
							<div className="flex justify-center items-center space-x-1">
								<span className="text-2xl mr-2 font-thin">Size</span>
								<select
									onChange={(e) => setSize(e.target.value)}
									defaultValue="Size"
									className="text-centre py-1 cursor-pointer focus:outline-none focus:border-teal-400 px-2 border"
								>
									<option disabled value="Size">
										Size
									</option>
									{product.size.map((s) => (
										<option key={s}>{s}</option>
									))}
								</select>
							</div>
						</div>
						<div className=" mt-12 flex items-center w-80  justify-between">
							<div className="flex items-center space-x-1">
								<button
									disabled={qut < 2}
									onClick={() => setQut(qut - 1)}
									className="text-xl py-1 px-3 font-bold"
								>
									-
								</button>
								<span className="text-xl flex items-center py-1 px-3  border border-teal-400 rounded-lg mx-2 font-thin">
									{qut}
								</span>
								<button
									onClick={() => setQut(qut + 1)}
									className="text-xl py-1 px-3   font-bold"
								>
									+
								</button>
							</div>
							<div className="flex justify-center items-center space-x-1">
								<button
									disabled={!color || !size}
									onClick={handleClick}
									className="p-3 border-2 text-black  border-teal-500"
								>
									ADD TO CARD
								</button>
							</div>
						</div>
						<br />
						<div className="flex justify-center ">
							<span className="uppercase font-thin text-rose-400">
								{" "}
								select size and color{" "}
							</span>
						</div>
					</div>
				</div>
			)}
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Product;
