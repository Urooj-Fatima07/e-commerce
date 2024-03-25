import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListPage from '../features/Products/ProductListPage';
import ProductPage from '../features/Products/ProductPage';
import CartPage from '../features/cart/CartPage';
import Header from '../components/Header';
import ProductManagementPage from '../features/Products/ProductManagementPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
    <Header />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path='productManagementPage' element={<ProductManagementPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
