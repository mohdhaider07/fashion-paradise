import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/apiCalls";
const Form = ({ email }) => {
	const dispatch = useDispatch();
	// const email = useSelector((state) => state.email.currentEmail);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({});
	const [confirmPassword, setConfirmPassword] = useState();
	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	let button = false;

	if (inputs.password === confirmPassword) {
		confirmPassword && (button = true);
	}

	const handleSubmit = async () => {
		setLoading(true);
		console.log(inputs);
		setInputs({
			...inputs,
			email: email,
		});
	};

	useEffect(() => {
		inputs.email && createUser(dispatch, inputs, setLoading);
	}, [inputs.email]);
	// console.log(email);
	return (
		<div
			id=""
			className="h-screen gradient_bg w-screen flex justify-center items-center"
		>
			<div className="bg-white p-4 m-4">
				<h1 className="text-xl mb-4 font-thin">CREATE AN ACCOUNT</h1>
				<div className="space-y-4 mb-4 flex flex-col">
					<div className="flex flex-1 items-center space-x-2">
						<input
							onChange={handleChange}
							name="name"
							className="p-2 flex-1 border focus:outline-none"
							type="text"
							placeholder="full name"
						/>
						<input
							onChange={handleChange}
							name="username"
							className="p-2 flex-1 border focus:outline-none"
							type="text"
							placeholder="username"
						/>
					</div>

					<div className="flex items-center space-x-2">
						<input
							onChange={handleChange}
							name="password"
							className="p-2 flex-1 border focus:outline-none"
							type="password"
							placeholder="password"
						/>
						<input
							onChange={handleChange}
							name="phone"
							className="p-2 flex-1 border focus:outline-none"
							type="text"
							placeholder="+91 9250210325"
						/>
					</div>
					<div className="flex items-center">
						<input
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="p-2 flex-1 border focus:outline-none"
							type="password"
							placeholder="confirm password"
						/>
					</div>
					<div className="flex items-center">
						<input
							onChange={handleChange}
							name="address"
							className="p-2 flex-1 border focus:outline-none"
							type="text"
							placeholder="New York | USA"
						/>
					</div>
				</div>
				<p className="w-full">
					{" "}
					By creating an account. I consent to the processing of my
					personal data in accordance with the
					<br />
					<span className="font-bold"> PRIVACY POLICY</span>
				</p>
				<button
					onClick={handleSubmit}
					disabled={!button}
					className={
						button
							? "py-2 px-20 text-white hover:bg-teal-600 bg-teal-500"
							: "py-2 px-20 cursor-not-allowed text-white bg-teal-500"
					}
				>
					{loading ? "Loading..." : "Creact Account"}
				</button>
			</div>
		</div>
	);
};

export default Form;
