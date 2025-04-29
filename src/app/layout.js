import '../app/styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer'; // ajuste le chemin si nécessaire

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Feel & Match</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&family=Pinyon+Script&family=Alumni+Sans+Pinstripe:ital,wght@1,400&family=Red+Hat+Text:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}