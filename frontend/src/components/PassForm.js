import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emailReset } from "../redux/userPassRedux";
import emailRedux from "../redux/emailRedux";
const PassForm = ({ _id }) => {
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();
	let button = false;
	if (password === confirmPassword) {
		confirmPassword && (button = true);
	}
	console.log(_id);
	const handleSubmit = async () => {
		setLoading(true);
		try {
			const { data } = await axios.put(
				`https://fashion-paradise-react.herokuapp.com/api/user/${_id}`,
				{
					password,
				}
			);
			toast.success("Password Changed Login");
			setLoading(false);
			dispatch(emailReset());
		} catch (err) {
			toast.error(
				err.response && err.response.data && err.response.data.message
					? err.response.data.message
					: err.message
			);
			console.log(err);
		}
	};
	return (
		<div
			id="registerPage"
			className="h-screen w-screen flex justify-center items-center"
		>
			<div className="bg-white  w-2/3 lg:w-1/3 md:w-1/2 p-4 m-4">
				<h1 className="text-xl mb-4 font-thin">CHANGE PASSWORD</h1>
				<div className="space-y-4 mb-4 flex flex-col">
					<div className="flex flex-col items-center ">
						<input
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							className="p-2 w-full border focus:outline-none"
							type="password"
							placeholder="New Password"
						/>
						<input
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="p-2 w-full -mt-[1px] border focus:outline-none"
							type="password"
							placeholder="Confirm Password"
						/>
					</div>
				</div>

				<button
					onClick={handleSubmit}
					disabled={!button}
					className={
						button
							? "py-2 px-20 text-white hover:bg-teal-600 bg-teal-500"
							: "py-2 px-20 cursor-not-allowed text-white bg-teal-500"
					}
				>
					{loading ? "Loading..." : "Update"}
				</button>
			</div>
		</div>
	);
};

export default PassForm;
