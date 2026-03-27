import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { baseApi } from "./api/baseApi";
import { CartItem } from "../types";

// Cart slice
interface CartState {
  items: CartItem[];
}

const loadCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.product.id && i.size_id === action.payload.size_id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ productId: number; sizeId: number }>) => {
      state.items = state.items.filter(
        (i) => !(i.product.id === action.payload.productId && i.size_id === action.payload.sizeId)
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; sizeId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.product.id === action.payload.productId && i.size_id === action.payload.sizeId
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Auth slice
interface AuthState {
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: !!localStorage.getItem("accessToken") } as AuthState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;

// Store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
