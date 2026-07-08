'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { adminAPI } from '../../lib/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      router.push('/account/login');
      return;
    }

    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      router.push('/');
      return;
    }

    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab, router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Eroare:', error);
      alert('Eroare la încărcarea produselor');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Eroare:', error);
      alert('Eroare la încărcarea comenzilor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, formData);
        alert('Produs actualizat cu succes!');
      } else {
        await adminAPI.createProduct(formData);
        alert('Produs creat cu succes!');
      }
      setFormData({ name: '', description: '', price: '', stock: '', category: '' });
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Eroare:', error);
      alert('Eroare la salvarea produsului');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      category: product.category || '',
    });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Ești sigur?')) {
      try {
        await adminAPI.deleteProduct(id);
        alert('Produs șters cu succes!');
        fetchProducts();
      } catch (error) {
        console.error('Eroare:', error);
        alert('Eroare la ștergerea produsului');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, { status: newStatus });
      alert('Status actualizat cu succes!');
      fetchOrders();
    } catch (error) {
      console.error('Eroare:', error);
      alert('Eroare la actualizarea statusului');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">⚙️ Panou Admin</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'products'
                ? 'border-b-4 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Produse
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'orders'
                ? 'border-b-4 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Comenzi
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingProduct(null);
                setFormData({ name: '', description: '', price: '', stock: '', category: '' });
              }}
              className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <FiPlus /> Adaugă Produs
            </button>

            {/* Form */}
            {showForm && (
              <form
                onSubmit={handleSubmitProduct}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="font-bold text-lg mb-4">
                  {editingProduct ? 'Editare Produs' : 'Produs Nou'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nume produs"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="number"
                    placeholder="Preț (RON)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="number"
                    placeholder="Stoc"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Categorie"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <textarea
                  placeholder="Descriere"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="3"
                />
                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingProduct ? 'Actualizează' : 'Creare'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Anulează
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            {loading ? (
              <div className="text-center py-8">Se încarcă...</div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold">Nume</th>
                      <th className="px-6 py-3 text-left font-bold">Preț</th>
                      <th className="px-6 py-3 text-left font-bold">Stoc</th>
                      <th className="px-6 py-3 text-left font-bold">Categorie</th>
                      <th className="px-6 py-3 text-left font-bold">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">{product.price} RON</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">{product.category || '-'}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {loading ? (
              <div className="text-center py-8">Se încarcă...</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Comandă #{order.orderNumber}</h3>
                        <p className="text-gray-600 text-sm">
                          Client: {order.user.name} ({order.user.email})
                        </p>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                      <div>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="pending">În Așteptare</option>
                          <option value="confirmed">Confirmată</option>
                          <option value="shipped">Expediată</option>
                          <option value="delivered">Livrată</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm mb-2">
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} RON</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total: {order.totalPrice} RON</span>
                      {order.notes && (
                        <span className="text-sm text-gray-600">Note: {order.notes}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
