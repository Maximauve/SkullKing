import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Mon Jeu de Société</h1>
      </header>
      <main>
        <p>Bienvenue sur la page d'accueil de Mon Jeu de Société. Commencez à jouer dès maintenant !</p>
        {/* Ajoutez ici des liens ou des éléments pour commencer le jeu */}
      </main>
      <footer>
        <p>&copy; 2023 Mon Jeu de Société</p>
      </footer>
    </div>
  );
};

export default HomePage;