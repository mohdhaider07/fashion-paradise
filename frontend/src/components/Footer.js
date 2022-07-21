import React from "react";
import {
	FacebookFilled,
	InstagramOutlined,
	TwitterOutlined,
	SkypeOutlined,
	MailOutlined,
	CompassOutlined,
	PhoneFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<div className="p-2  text-gray-400  md:flex ">
			<div className="p-2  flex-1">
				<Link className="text-black" to="/">
					<span className="logo  md:text-4xl text-2xl font-bold ">
						Fashion Paradise
					</span>
				</Link>{" "}
				<p className=" text-slate-800">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
					Varius duis at consectetur lorem. Fermentum leo vel orci porta
				</p>
				<div className="flex items-center space-x-4">
					<span className=" cursor-pointer  transition-all   hover:bg-rose-500 duration-500 p-3 text-xl flex bg-blue-700 text-white rounded-full">
						<FacebookFilled />
					</span>
					<span className=" cursor-pointer  transition-all hover:bg-rose-500 duration-500 p-3 text-xl flex bg-pink-700 text-white rounded-full">
						<InstagramOutlined />
					</span>
					<span className=" cursor-pointer  transition-all hover:bg-rose-500 duration-500 p-3 text-xl flex bg-blue-400 text-white rounded-full">
						{" "}
						<TwitterOutlined />
					</span>
					<span className=" cursor-pointer  transition-all hover:bg-rose-500 duration-500 p-3 text-xl  flex bg-blue-400 text-white rounded-full">
						{" "}
						<SkypeOutlined />
					</span>
				</div>
			</div>
			<div className="text-gray-400  p-2 flex-1">
				<h3 className="text-xl font-semibold">Useful Links</h3>
				<ui className="  flex flex-wrap">
					<li className="ui_onHover">Home</li>
					<li className="ui_onHover">About Us </li>
					<li className="ui_onHover">Return Policy </li>
					<li className="ui_onHover">Privacy Policy </li>
					<li className="ui_onHover">Terms of Service </li>
					<li className="ui_onHover">All Products </li>
					<li className="ui_onHover">Winters </li>
					<li className="ui_onHover">Summers </li>
					<li className="ui_onHover">Categories </li>
				</ui>
			</div>
			<div className="p-2 bg-gray-200 flex-1">
				<h3 className="text-xl font-semibold">Contact</h3>
				<div className="flex space-x-2 hover:text-slate-700">
					<span>
						<CompassOutlined />
					</span>
					<p className="mb-0">
						Vestibulum lorem sed risus ultricies tristique. Sed adipiscing
						diam donec adipiscing.
					</p>
				</div>
				<div className="flex space-x-2 hover:text-slate-700">
					<span>
						<PhoneFilled />
					</span>
					<p className="mb-0">+91 925021####</p>
				</div>
				<div className="flex space-x-2 hover:text-slate-700">
					<span>
						<MailOutlined />
					</span>
					<p className="mb-0 ">haiderahmed12786@gmail.com</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
