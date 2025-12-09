export default function Footer() {
  return (
    <footer className="relative bg-[#0b0b0b] text-white px-6 py-10 mt-20 border-t border-[#c2a661]/20">
      {/* Halo doré subtil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             background:
               "radial-gradient(circle at 50% 0%, rgba(194,166,97,0.3), transparent 70%)",
           }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
        {/* Présentation */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-[#c2a661]">À propos</h2>
          <p className="text-gray-400 leading-relaxed">
            <span className="text-[#c2a661] font-semibold">Feel &amp; Match</span> est une
            plateforme de rencontres élégante, humaine et personnalisée.<br />
            Notre mission : créer des connexions sincères, authentiques et durables.
          </p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#c2a661]">Liens utiles</h3>
          <ul className="space-y-2">
            <li><a href="/mentions-legales" className="text-gray-400 hover:text-[#c2a661] transition">Mentions légales</a></li>
            <li><a href="/confidentialite" className="text-gray-400 hover:text-[#c2a661] transition">Politique de confidentialité</a></li>
            <li><a href="/faq" className="text-gray-400 hover:text-[#c2a661] transition">FAQ</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-[#c2a661] transition">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#c2a661]">Nous suivre</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              📧 <a href="mailto:contact@feelandmatch.com"
                     className="hover:text-[#c2a661] transition">
                contact@feelandmatch.com
              </a>
            </li>
            <li>
              📸 <a href="https://instagram.com/feel.match" target="_blank" rel="noopener noreferrer"
                     className="hover:text-[#c2a661] transition">
                @feel.match
              </a>
            </li>
            <li>
              💼 <a href="https://linkedin.com/company/feel-match" target="_blank" rel="noopener noreferrer"
                     className="hover:text-[#c2a661] transition">
                Feel &amp; Match
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="relative mt-10 border-t border-[#c2a661]/20 pt-4 text-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-[#c2a661] font-medium">Feel &amp; Match</span>.  
          Tous droits réservés.
        </p>
        <p className="mt-1 text-[10px] text-gray-600">
          Créé avec 💛 par l’équipe Feel &amp; Match.
        </p>
      </div>
    </footer>
  );
}