import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderInterface {
  payload: string;
}

export interface OrderInterface {
  orders: []
}

export interface Order {
    name: string
  }

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setToEmpty(state, action) {
      state.orders = [];
    },

    setOrders(state, action) {
      state.orders = action.payload;
    },

    addOrder(state, action) {
      state.orders.push(action.payload.item);
    },

    editOrder(state, action) {
      const index = state.orders.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.orders[index] = action.payload.item;
    },

    deleteOrder(state, action) {
      const tmp = state.orders;
      const item = tmp.find((item) => item.id === action.payload.id);
      state.orders = tmp.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
