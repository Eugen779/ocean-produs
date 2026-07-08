import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-12 mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Bun venit la Ocean Produs! 🌊</h1>
          <p className="text-xl mb-6">Calitate și comoditate în fiecare cumpărătură</p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Explorează Produsele
          </Link>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-lg mb-2">Livrare în toată România</h3>
            <p className="text-gray-600">Livrare rapidă și sigură la ușa ta</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">Plăți la Livrare</h3>
            <p className="text-gray-600">Plătești doar când primești comanda</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-bold text-lg mb-2">Produse de Calitate</h3>
            <p className="text-gray-600">Selectate cu grijă pentru tine</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
