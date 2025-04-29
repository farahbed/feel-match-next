export default function Footer() {
  return (
    <footer className="bg-dark text-white px-4 py-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        {/* Présentation / à propos */}
        <div>
          <h2 className="text-lg font-semibold mb-2">À propos</h2>
          <p className="text-gray-400">
            Feel & Match est une plateforme de rencontres élégante, humaine et personnalisée. Notre mission : créer des connexions sincères.
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="font-semibold mb-2">Liens utiles</h3>
          <ul className="space-y-1">
            <li><a href="/mentions-legales" className="hover:text-accent">Mentions légales</a></li>
            <li><a href="/confidentialite" className="hover:text-accent">Politique de confidentialité</a></li>
            <li><a href="/faq" className="hover:text-accent">FAQ</a></li>
            <li><a href="/contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux / Contact */}
        <div>
          <h3 className="font-semibold mb-2">Nous suivre</h3>
          <p>Email : <a href="mailto:contact@feelandmatch.com" className="hover:text-accent">contact@feelandmatch.com</a></p>
          <p className="mt-1">Instagram : <a href="https://instagram.com/feel.match" target="_blank" className="hover:text-accent">@feel.match</a></p>
          <p className="mt-1">LinkedIn : <a href="https://linkedin.com/company/feel-match" target="_blank" className="hover:text-accent">Feel & Match</a></p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Feel & Match. Tous droits réservés.
      </div>
    </footer>
  );
}
