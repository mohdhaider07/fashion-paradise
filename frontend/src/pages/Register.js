import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { emailToVerify, emailVerified, emailReset } from "../redux/emailRedux";
import { Link } from "react-router-dom";
import Form from "../components/Form";
const RegisterEmail = () => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(null);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.email);
	const dispatch = useDispatch();

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { data } = await axios.post(
				"https://fashion-paradise-react.herokuapp.com/api/verify/email",
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
	const verifyOtp = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				"https://fashion-paradise-react.herokuapp.com/api/verify/otp",
				{ email: user.currentEmail, otp }
			);
			setLoading(false);
			dispatch(emailVerified(user));
			toast.success(data.message);
		} catch (err) {
			toast.error(
				err.response && err.response.data
					? err.response.data.message
					: err.message
			);
			setLoading(false);
			console.log(err);
		}
	};

	// console.log(user.currentEmail);
	return (
		<>
			<div>
				{!user.isVerified ? (
					<div>
						{!user.currentEmail ? (
							<div className="blue_wave_svg h-screen w-screen flex flex-col justify-center items-center">
								<h1 className=" -mt-16 text-center text-teal-700">
									CREATE NEW ACCOUNT
								</h1>
								<form
									onSubmit={handleClick}
									className=" relative p-4 flex flex-col  space-y-2 rounded-sm h-40 w-80   bg-white"
								>
									<label>Enter you Gmail</label>
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

								<div>
									<Link to="/login">
										<span className="text-black">
											Alreedy have Account
											<span className="text-blue-500 font-semibold">
												{" "}
												Login
											</span>
										</span>
									</Link>
								</div>
							</div>
						) : (
							<div className="h-screen blue_wave_svg w-screen flex justify-center  items-center">
								<div className=" relative p-4 flex flex-col  space-y-2 rounded-sm min-h-[11rem] w-80   bg-white">
									<label>
										Otp sent to {user.currentEmail}
										<span
											onClick={() => dispatch(emailReset())}
											className=" cursor-pointer font-semibold text-slate-800"
										>
											{" "}
											edit
										</span>
									</label>
									<input
										onChange={(e) => setOtp(e.target.value)}
										className="border-2 p-2 focus:outline-none "
										placeholder="otp"
										type="number"
									/>
									<button
										disabled={!otp}
										onClick={verifyOtp}
										className="absolute rounded-sm text-white py-2 px-4 bg-teal-500 right-4 bottom-4 "
									>
										{loading ? "Loading.." : "Verify"}
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<div>{<Form email={user.currentEmail} />}</div>
				)}
			</div>
		</>
	);
};

export default RegisterEmail;
