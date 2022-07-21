import { createSlice } from "@reduxjs/toolkit";

const userPassSlice = createSlice({
	name: "userPass",
	initialState: {
		currentEmail: null,
		_id: null,
		isVerified: false,
	},
	reducers: {
		emailToVerify: (state, action) => {
			console.log(action.payload.savedEmail.email, " ", action.payload._id);
			state.currentEmail = action.payload.savedEmail.email;
			state._id = action.payload._id;
			console.log(state.currentEmail);
		},
		emailVerified: (state, action) => {
			console.log(state.currentEmail, " ", action.payload.currentEmail);
			if (
				JSON.stringify(state.currentEmail) ===
				JSON.stringify(action.payload.currentEmail)
			) {
				state.isVerified = true;
			}
		},
		emailReset: (state) => {
			state.currentEmail = null;
			state._id = null;
			state.isVerified = false;
		},
	},
});

export const { emailToVerify, emailVerified, emailReset } =
	userPassSlice.actions;
export default userPassSlice.reducer;
