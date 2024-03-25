import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../cart/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  
  const { productId } = useParams<{ productId: string }>();
  const products = useSelector((state: any) => state.products.products);
  const product = products.find((product: any) => product.id === parseInt(productId || ''));

  // Calculate total price
  const totalAmount = cartItems.reduce((total: number, item: any) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 grid grid-cols-2">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div key={item.id} className="bg-white p-4 rounded-md shadow-md mb-4">
               <img className='w-full mt-12 h-48 object-contain' src={product.image} alt={product.name} />
      <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <p className="text-xl font-semibold">Total: ${totalAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
