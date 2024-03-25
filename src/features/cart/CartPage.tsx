import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../cart/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleIncrementQuantity = (id: number) => {
    const itemToUpdate = cartItems.find((item: any) => item.id === id);
    if (itemToUpdate) {
      dispatch(updateQuantity({ id, quantity: itemToUpdate.quantity + 1 }));
    }
  };

  const handleDecrementQuantity = (id: number) => {
    const itemToUpdate = cartItems.find((item: any) => item.id === id);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: itemToUpdate.quantity - 1 }));
    }
  };

  // Calculate total price
  const totalAmount = cartItems.reduce((total: number, item: any) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4">

      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          height="20"
          width="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>

      </Link>

      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty</p></>
      ) : (
        <div className='m-7'>
          {cartItems.map((item: any) => (
            <>

              <div key={item.id} className="bg-white w-2/4 p-4 rounded-md shadow-md mb-4">
                <h3 className="text-lg font-semibold">Your Selected Item's:</h3>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrementQuantity(item.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrementQuantity(item.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
                >
                  Remove
                </button>
              </div>
            </>
          ))}
          <div className="bg-white w-1/4 p-4 mb-4">
            <h1 className="text-xl font-bold">Total Payment</h1>
            <p className="text-xl font-semibold">Total: ${totalAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
