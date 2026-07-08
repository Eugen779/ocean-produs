import './globals.css';

export const metadata = {
  title: 'Ocean Produs - Magazin Online',
  description: 'Magazin online cu cele mai bune produse',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
