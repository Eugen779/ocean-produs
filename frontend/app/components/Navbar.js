import Link from 'next/link';
import { FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🌊 Ocean Produs
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-600 transition">
            Acasă
          </Link>
          <Link href="/products" className="hover:text-blue-600 transition">
            Produse
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:text-blue-600 transition">
            <FiShoppingCart size={20} />
            Coș
          </Link>
          <Link href="/account" className="flex items-center gap-2 hover:text-blue-600 transition">
            <FiUser size={20} />
            Cont
          </Link>
        </div>
      </div>
    </nav>
  );
}
