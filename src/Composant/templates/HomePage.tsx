// src/components/templates/HomePage.tsx
import React from 'react';
import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="video-background">
      <div className="content">
        <div className="gif-background">
        <img src="votre-gif.gif" alt="GIF en arrière-plan" />
      </div>
        <header>
          <h1>Mon Jeu de Société</h1>
        </header>
        <main>
          <p>Bienvenue sur la page d'accueil de Mon Jeu de Société. Commencez à jouer dès maintenant !</p>
          <button className="play-button">Jouer</button>
        </main>
        <footer>
          <button className="profile-button">Profil</button>
          <p>&copy; 2023 Mon Jeu de Société</p>
        </footer>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
