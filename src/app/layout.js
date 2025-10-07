import './styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Feel & Match',
  description: 'Feel & Match app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&family=Pinyon+Script&family=Alumni+Sans+Pinstripe:ital,wght@1,400&family=Red+Hat+Text:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 👇 active le thème sombre doux partout */}
      <body className="antialiased theme-dark">
        <div className="min-h-dvh flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}