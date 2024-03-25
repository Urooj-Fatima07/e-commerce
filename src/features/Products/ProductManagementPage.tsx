import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addProduct, removeProduct, updateProduct } from './productsSlice';

const ProductManagementPage: React.FC = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state: RootState) => state.products);
  const products = productsState.products; // Accessing the products array from ProductsState

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  // State to track which product is being updated
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { ...formData, id: Date.now(), price: parseFloat(formData.price) }; // Parse price to number
    dispatch(addProduct(newProduct));
    setFormData({ name: '', price: '', description: '' }); // Clear form fields after submission
  };

  // Event handler for updating a product
  const handleUpdate = (product: any) => {
    setFormData({ ...product });
    setEditingProductId(product.id);
  };

  // Event handler for canceling update
  const handleCancelUpdate = () => {
    setFormData({ name: '', price: '', description: '' });
    setEditingProductId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        {editingProductId ? (
          <div className="flex">
            <button onClick={() => handleUpdate(products)} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Product</button>
            <button onClick={handleCancelUpdate} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        ) : (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        )}
      </form>
      <div>
        {products.map((product: any) => ( // Accessing the products array using .map
          <div key={product.id} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Description: {product.description}</p>
            <div className="mt-4">
              <button onClick={() => dispatch(removeProduct(product.id))} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Remove</button>
              <button onClick={() => handleUpdate(product)} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;
