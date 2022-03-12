import { createSlice } from "@reduxjs/toolkit";
import IProduct from "../interfaces/products";

const initialState: any = {
  basket: [],
  user: null,
  orderMade: false,
};

export type RootState = ReturnType<typeof userSlice.reducer>;

export const getBasketTotal = (basket: IProduct[]) => {
  var total = 0;
  basket.map((item) => (total += item.price));
  return total;
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.basket = [];
      state.orderMade = false;
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex(
        (item: IProduct) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.basket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id :${action.payload._id}) as it's not in the basket!`
        );
      }
    },
    addToBasket: (state, action) => {
      state.basket.push(action.payload);
    },
    emptyBasket: (state) => {
      state.basket = [];
    },
    orderMade: (state, action) => {
      state.orderMade = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  removeFromBasket,
  addToBasket,
  emptyBasket,
  orderMade
} = userSlice.actions;

export default userSlice;
