import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/Products/productsSlice';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  // Add other reducers here if you have them
});

const store = configureStore({
  reducer: rootReducer, // Pass your root reducer to the store
  // Optionally, you can configure other middleware, enhancers, or options here
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default store;
