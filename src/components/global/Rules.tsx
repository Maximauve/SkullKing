import React from 'react';

interface RulesProps {
  onClick: () => void
}

export const Rules: React.FC<RulesProps> = ({ onClick }) => {
  return (
    <>
      <div className='rules-modal'>
        <div className='modal-background'>
          <div className='close-modal' onClick={onClick}>X</div>
          <div className='modal'>
            <h1>Régles du jeu</h1>
            <p>On partage les cartes : Chacun reçoit quelques cartes. Au début, une carte, puis deux la prochaine fois, et ainsi de suite.</p>
            <p>On fait des prédictions : Avant de commencer à jouer, chacun dit combien de plis (tours) il pense pouvoir gagner, c'est-à-dire combien de fois il pense pouvoir poser la meilleure carte.</p>
            <p>On joue les cartes : A chaque tour, chacun pose une carte. Celui qui pose la meilleure carte remporte le tour.</p>
            <p>Attention aux pirates, aux sirènes et au Skull King : Il y a des cartes spéciales. Elles battent toutes les autres cartes et si elles se battent entre elles, tu gagnes des points bonus !</p>
            <ul>
              <li>Le pirate mange la sirène : 20 points</li>
              <li>Le Skull King mange le pirate : 30 points</li>
              <li>La sirène mange le Skull King : 40 points</li>
            </ul>
            <p>Les numéros 14 rapportent eux aussi des points bonus</p>
            <p>On compte les points : A la fin, on voit combien de tours on a vraiment gagnés. Si tu as deviné correctement, tu gagnes des points. Sinon, tu en perds.</p>
            <p>On recommence : On joue plusieurs fois, et à la fin, celui qui a le plus de points est le grand gagnant.</p>
          </div>
        </div>
      </div>
    </>
  );
};
