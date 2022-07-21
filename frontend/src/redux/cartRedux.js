import { createSlice } from "@reduxjs/toolkit";
import { products } from "../data";
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.total += action.payload.price * action.payload.quantity;
			state.id = action.payload.id;
		},
		incrementQuantity: (state, action) => {
			state.total += action.payload.price;
			state.products = state.products.map((index) => {
				if (index.id === action.payload.id) {
					return { ...index, quantity: index.quantity + 1 };
				} else {
					return index;
				}
			});
		},
		decrementQuantity: (state, action) => {
			state.total -= action.payload.price;
			state.products = state.products.map((index) => {
				if (index.id === action.payload.id) {
					return { ...index, quantity: index.quantity - 1 };
				} else {
					return index;
				}
			});
		},

		remove: (state, action) => {
			state.quantity -= 1;
			state.total -= action.payload.price * action.payload.quantity;
			state.products.splice(
				state.products.findIndex((index) => index.id === action.payload.id),
				1
			);
		},
		removeAll: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

export const {
	addProduct,
	incrementQuantity,
	decrementQuantity,
	remove,
	removeAll,
} = cartSlice.actions;
export default cartSlice.reducer;
