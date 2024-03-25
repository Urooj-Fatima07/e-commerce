import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {

  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const cartItems = useSelector((state: any) => state.cart.items);


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
    <div className='flex flex-col p-4 my-5 justify-between border border-gray-300 rounded-lg overflow-hidden'>
      <img className='w-full h-36 object-contain' src={product.image} alt={product.name} />
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <p className='text-xl font-bold text-gray-900'>Price: ${product.price}</p>
        <button className="bg-blue-500 py-2 px-4 rounded-md text-white mx-4 hover:bg-blue-600" onClick={handleAddToCart}>Add to Cart</button>
      
        <Link to={`/product/${product.id}`} className='mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>View Details</Link>
      </div>
    </div>
  );
};

export default ProductItem;
