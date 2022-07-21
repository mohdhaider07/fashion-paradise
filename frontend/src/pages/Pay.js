import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publicRequest, userRequest } from "../requestMethods";
import { removeAll } from "../redux/cartRedux";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";

const Pay = () => {
	const total = useSelector((state) => state.cart.total);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [loading, setLoading] = useState(false);

	const productInCart = useSelector((statte) => statte.cart.products);
	const [productArrayCart, SetproductArrayCart] = useState([]);

	const _id = useSelector((state) => state.user.currentUser?._id);

	useEffect(() => {
		_id && fetchUser();
	}, [_id]);

	const fetchUser = async () => {
		try {
			const { data } = await userRequest.get(`/user/${_id}`);
			console.log(data);
			setName(data.name);
			setPhone(data.phone);
			setEmail(data.email);
			setAddress(data.address);
		} catch (err) {
			toast.error(
				err.response && err.response.data && err.response.data.message
					? err.response.data.message
					: err.message
			);
		}
	};

	useEffect(() => {
		const newProductArrayCart = productInCart.map((item) => {
			return {
				productId: item._id,
				price: item.price,
				title: item.title,
				quantity: item.quantity,
				size: item.size,
				color: item.color,
			};
		});
		SetproductArrayCart(newProductArrayCart);
	}, [productInCart]);

	function loadRazorpay() {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.onerror = () => {
			toast.error("Razorpay SDK failed to load. Are you online?");
		};
		script.onload = async () => {
			try {
				setLoading(true);
				const result = await userRequest.post("/checkout/create-order", {
					productArrayCart,
				});
				// console.log("DATA FROM CREATE ORDER ", result.data);
				const { id: order_id, currency } = result.data;
				const {
					data: { key: razorpayKey },
				} = await userRequest.get("/checkout/get-razorpay-key");
				setLoading(true);
				const options = {
					key: razorpayKey,
					amount: total * 100,
					currency: currency,
					name: "RiemArts",
					description: "We sell cloth that fit for you",
					order_id: order_id,
					handler: async function (response) {
						const result = await userRequest.post("/checkout/pay-order", {
							razorpayPaymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id,
							razorpaySignature: response.razorpay_signature,
							productArrayCart,
							address,
							phone,
						});
						toast.success(result.data.msg);
						setLoading(false);
						dispatch(removeAll());
						navigate("/");
					},
					prefill: {
						name: name,
						email: email,
						contact: phone,
					},
					notes: {
						address: address,
					},
					theme: {
						color: "#45B08C",
					},
				};

				setLoading(false);
				const paymentObject = new window.Razorpay(options);
				paymentObject.open();
			} catch (err) {
				toast.error(
					err.response && err.response.data && err.response.data.message
						? err.response.data.message
						: err.message
				);
				setLoading(false);
			}
		};
		document.body.appendChild(script);
	}
	console.log(phone);
	console.log("name", name);
	return (
		<div className="gradient_bg_pay flex flex-col items-center h-screen justify-center">
			<div className="m-4 lg:w-[35%] sm:w-[70%] w-[95%] ">
				<div className="bg-teal-500  flex flex-col  p-4 space-y-3">
					<div className="flex flex-1 space-x-1">
						<div className="flex flex-1 flex-col space-y-1">
							<label className="text-thin text-sm text-slate-100 ">
								Name
							</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="p-2 focus:outline-none"
								type="text"
								placeholder="name"
							/>
						</div>
						<div className="w-1/2 flex flex-1 flex-col space-y-1">
							<label className="text-thin text-sm text-gray-100 ">
								Phone
							</label>
							<PhoneInput
								onChange={(value) => setPhone(value)}
								value={phone}
								className="p-2 w-full bg-white focus:outline-none"
								placeholder="your phone number"
							/>
						</div>
					</div>
					<div className="flex flex-1 flex-col space-y-1">
						<label className="text-thin text-sm text-gray-100 ">
							Email
						</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="p-2 focus:outline-none"
							type="gmail"
							placeholder="example@gnail.com"
						/>
					</div>
					<div className="flex flex-1 flex-col space-y-1">
						<label className="text-thin text-sm text-gray-100">
							Address
						</label>
						<input
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="p-2 focus:outline-none"
							type="text"
							placeholder="address"
						/>
					</div>
				</div>

				<button
					disabled={!name || !phone || !email || !address}
					onClick={loadRazorpay}
					className=" mt-2 py-2 w-full bg-amber-500 text-white"
				>
					{loading ? "Loading..." : "Pay Now"}
				</button>
				{/* <br />
				<div className=" text-xs my-2 text-red-600 text-center">
					{" "}
					please fill the form correctly
				</div> */}
			</div>
		</div>
	);
};

export default Pay;
