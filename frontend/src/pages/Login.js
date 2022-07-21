import React, { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {
	const [username, setUsername] = useState("haider_alee07");
	const [password, setPassword] = useState("Haider12");
	const { isFetching, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleClick = (e) => {
		if (!username || !password) {
			toast.error("Enter username and password");
		} else {
			login(dispatch, { username, password });
		}
		return false;
	};

	console.log(error);
	return (
		<div
			id=""
			className="gradient_bg h-screen w-screen flex justify-center items-center"
		>
			<div className="bg-white p-4 w-80">
				<h1 className="text-xl mb-4 font-thin">SIGN IN</h1>
				<div className="space-y-4 mb-4 flex flex-col">
					<div className="flex flex-1 items-center space-x-2">
						<input
							onChange={(e) => setUsername(e.target.value)}
							className="p-2 flex-1 border focus:outline-none"
							type="text"
							placeholder="username"
						/>
					</div>
					<div className="flex flex-1 items-center space-x-2">
						<input
							onChange={(e) => setPassword(e.target.value)}
							className="p-2 flex-1 border focus:outline-none"
							type="password"
							placeholder="password"
						/>
					</div>
				</div>

				<button
					disabled={isFetching}
					onClick={(e) => handleClick(e)}
					className={
						isFetching
							? "py-2 px-6 text-white bg-teal-500"
							: "py-2 px-6 hover:opacity-90 text-white bg-teal-500"
					}
				>
					{isFetching ? <LoadingOutlined /> : "Login"}
				</button>
				{error && (
					<div className=" my-2 flex justify-center ">
						<span className="text-xs text-red-600">
							{" "}
							Something went wrong
						</span>
					</div>
				)}
				<br />
				<Link to="/forgotpassword">
					<span className="underline mt-2 mb-1 text-xs font-thin">
						DO NOT YOU REMEMBER THE PASSWORD
					</span>
				</Link>
				<br />
				<Link to="/register">
					<span className="underline text-xs font-thin">
						CREATE A NEW ACCOUNT
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Login;
