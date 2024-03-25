import { combineReducers } from 'redux';
import productReducer from '../features/Products/productsSlice'; // Import your product reducer
import cartReducer from '../features/cart/cartSlice'; // Import your cart reducer

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
