'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/account/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="text-center py-16">Se încarcă...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contul Meu</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Bun venit, {user.name}!</h2>
          <p className="text-gray-600 mb-6">Email: {user.email}</p>
          {user.isAdmin && (
            <p className="text-blue-600 font-bold mb-6">👤 Status: Administrator</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/account/orders"
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition text-center"
          >
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-bold text-lg">Comenzile Mele</h3>
            <p className="text-sm opacity-90">Vezi și urmărește comenzile tale</p>
          </Link>
          {user.isAdmin && (
            <Link
              href="/admin"
              className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition text-center"
            >
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-bold text-lg">Panou Admin</h3>
              <p className="text-sm opacity-90">Gestionează produsele și comenzile</p>
            </Link>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Deconectare
        </button>
      </main>
      <Footer />
    </>
  );
}
