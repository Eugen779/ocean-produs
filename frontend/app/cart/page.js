'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useCartStore from '../lib/cartStore';
import { ordersAPI } from '../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState('');
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!localStorage.getItem('token')) {
      alert('Te rog să te loghezi mai întâi');
      router.push('/account/login');
      return;
    }

    if (items.length === 0) {
      alert('Coșul tău este gol');
      return;
    }

    try {
      setIsSubmitting(true);
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        notes,
      };

      await ordersAPI.create(orderData);
      alert('Comandă plasată cu succes! Te așteptăm să o plătești la livrare.');
      clearCart();
      router.push('/account/orders');
    } catch (error) {
      console.error('Eroare la plasarea comenzii:', error);
      alert('Eroare la plasarea comenzii. Te rog încearcă din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coșul Tău</h1>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500 mb-4">Coșul tău este gol</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Vezi Produsele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.price} RON x {item.quantity} = {item.price * item.quantity} RON
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="font-bold text-lg mb-4">Rezumat Comandă</h2>
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">{total} RON</span>
                </div>
                <div className="flex justify-between">
                  <span>Livrare:</span>
                  <span className="font-bold">GRATUIT</span>
                </div>
              </div>
              <div className="flex justify-between mb-6 text-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-blue-600">{total} RON</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Note (opțional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adrese speciale, cerințe de livrare..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="3"
                />
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isSubmitting ? 'Se procesează...' : 'Plasează Comandă'}
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                ✓ Plată cash la livrare
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
