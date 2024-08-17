import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "./slices/website/website-slice";
import productsReducer from "./slices/products/products-slice";
import categoriesReducer from "./slices/categories/categories-slice";
import loadingReducer from "./slices/loading/loading-slice";
import brandsReducer from "./slices/brands/brands-slice";
import stockQuantityReducer from "./slices/stock-quantity/stock-quantity-slice"


const store = configureStore({
    reducer: {
        website: websiteReducer,
        products: productsReducer,
        categories: categoriesReducer,
        brands: brandsReducer,
        stockQuantity: stockQuantityReducer,
        loading: loadingReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
