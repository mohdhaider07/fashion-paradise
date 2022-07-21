import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VerifyOtp from "../components/VerifyOtp";
import PassForm from "../components/PassForm";
import { Link } from "react-router-dom";
import {
	emailToVerify,
	emailVerified,
	emailReset,
} from "../redux/userPassRedux";
import { useDispatch, useSelector } from "react-redux";
const ForgotPass = () => {
	const user = useSelector((state) => state.userPass);
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				"https://fashion-paradise-react.herokuapp.com/api/verify/user",
				{ email }
			);
			dispatch(emailToVerify(data));
			setLoading(false);
			console.log(data);
		} catch (err) {
			toast.error(
				err.response && err.response.data && err.response.data.message
					? err.response.data.message
					: err.message
			);
			setLoading(false);
			console.log(err);
		}
	};

	console.log(user._id);
	return (
		<>
			{!user.isVerified ? (
				<div className="h-screen gradient_bg_varient w-screen flex justify-center items-center ">
					{!user.currentEmail ? (
						<div className="h-6">
							<h1 className=" -mt-20 text-center text-teal-700">
								RESET PASSWORD
							</h1>
							<form
								onSubmit={handleClick}
								className=" relative p-4 flex flex-col shadow space-y-2 rounded-sm h-40 w-80   bg-white"
							>
								<label className="text-xs">Enter you Gmail</label>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="border-2 p-2 focus:outline-none "
									placeholder="email"
									type="email"
								/>
								<button
									// onClick={handleSubmit}
									disabled={!email}
									type="submit"
									className="absolute rounded-sm text-white py-2 px-4 bg-teal-400 right-4 bottom-4 "
								>
									{loading ? "Loading.." : "Next"}
								</button>
							</form>
							<div className="text-center">
								<Link to="/login">
									<span className="text-black">
										Alreedy have Account
										<span className="font-semibold text-blue-600">
											{" "}
											Login
										</span>
									</span>
								</Link>
							</div>
						</div>
					) : (
						<VerifyOtp
							dispatch={dispatch}
							emailReset={emailReset}
							loading={loading}
							setLoading={setLoading}
							emailVerified={emailVerified}
						/>
					)}
				</div>
			) : (
				<PassForm _id={user._id} />
			)}
		</>
	);
};

export default ForgotPass;
