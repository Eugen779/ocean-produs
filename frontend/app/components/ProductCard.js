import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center">
        <span className="text-gray-400">Imagine produs</span>
      </div>
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-bold text-xl">{product.price} RON</span>
        <span className="text-sm text-gray-500">Stoc: {product.stock}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-16 px-2 py-2 border rounded-md"
        />
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          <FiShoppingCart /> Adaugă
        </button>
      </div>
    </div>
  );
}
