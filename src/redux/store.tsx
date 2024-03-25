import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer, // Pass your root reducer to the store
  // Optionally, you can configure other middleware, enhancers, or options here
});

export default store;
