import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const VerifyOtp = ({
	dispatch,
	emailReset,
	loading,
	setLoading,
	emailVerified,
}) => {
	const user = useSelector((state) => state.userPass);
	const [otp, setOtp] = useState();
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
	return (
		<>
			<div className="gradient_bg_varient h-screen w-screen flex justify-center  items-center">
				<div className=" relative p-4 flex flex-col shadow  space-y-2 rounded-sm min-h-[11rem] w-80   bg-white">
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
		</>
	);
};

export default VerifyOtp;
