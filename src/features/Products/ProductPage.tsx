import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../cart/cartSlice';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const cartItems = useSelector((state: any) => state.cart.items);

  const product = products.find((product: any) => product.id === parseInt(productId || ''));

  if (!product) {
    return <div className="text-red-600">Product not found</div>;
  }

  const cartItem = cartItems.find((item: any) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(product.id));
  };

  const handleQuantityChange = (change: number) => {
    dispatch(addItem({ ...product, quantity: change }));
  };

  return (
    <div className="container grid grid-cols-2 mx-8 p-4">
      <div>
        <img className='w-full mt-12 h-48 object-contain' src={product.image} alt={product.name} />
      </div>
      
      <div>
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-xl font-bold mb-2">Price: ${product.price}</p>
      <h2 className="text-lg font-normal mb-4">{product.description}</h2>
      {cartItem ? (
        <div className="flex items-center">
          <p className="mr-4">Quantity: {cartItem.quantity}</p>
          <button className="bg-gray-300 py-1 px-2 rounded-md mr-2" onClick={() => handleQuantityChange(cartItem.quantity - 1)}>-</button>
          <button className="bg-gray-300 py-1 px-2 rounded-md mr-2" onClick={() => handleQuantityChange(cartItem.quantity + 1)}>+</button>
          <button className="bg-red-500 py-1 px-2 rounded-md text-white" onClick={handleRemoveFromCart}>Remove from Cart</button>
        </div>
      ) : (
        <button className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-600" onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
    </div>
  );
};

export default ProductPage;
