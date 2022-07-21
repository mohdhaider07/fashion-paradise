import Slider from "../components/Slider";
import React from "react";
import Announcements from "../components/Announcements";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
	return (
		<div>
			<Announcements />
			<Navbar />
			<Slider />
			<Categories />
			<Products />
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Home;
