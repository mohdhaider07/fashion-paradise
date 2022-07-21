import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { emailReset } from "./emailRedux";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const { data } = await axios.post(
			"https://fashion-paradise-react.herokuapp.com/api/auth/login",
			user
		);
		// console.log("api calls", data.accessToken);
		// localStorage.setItem("TOKEN", data.accessToken);
		// console.log("after seting=>", localStorage.getItem("TOKEN"));
		dispatch(loginSuccess(data));
		window.location.reload();
	} catch (err) {
		toast.error(
			err.response && err.response.data && err.response.data.message
				? err.response.data.message
				: err.message
		);
		console.log(err);
		dispatch(loginFailure());
	}
};
export const createUser = async (dispatch, user, setLoading) => {
	try {
		const { data } = await axios.post(
			"https://fashion-paradise-react.herokuapp.com/api/auth/register",
			user
		);
		toast.success("account Created Login");
		setLoading(false);
		dispatch(emailReset());
	} catch (err) {
		setLoading(false);
		toast.error(
			err.response && err.response.data && err.response.data.message
				? err.response.data.message
				: err.message
		);
		console.log(err);
	}
};
