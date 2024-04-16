function Header() {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-10 mr-2" />
          <span className="text-xl font-semibold">MonSite</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex space-x-4">
          <a href="/" className="hover:text-gray-400">Accueil</a>
          <a href="/produits" className="hover:text-gray-400">Produits</a>
          <a href="/panier" className="hover:text-gray-400">Panier</a>
          <a href="/connexion" className="hover:text-gray-400">Connexion</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;