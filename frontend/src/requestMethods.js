import axios from "axios";

const BASE_URL = "https://fashion-paradise-react.herokuapp.com/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log(user);
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
// console.log("token", localStorage.getItem("TOKEN"));
// const TOKEN = localStorage.getItem("TOKEN");
// console.log("token insider request meathods=>", TOKEN);
export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
