import React, { useState } from 'react';

const LoginRegisterModal: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleFlipClick = (): void => {
    setIsFlipped(!isFlipped);
  };

  const handleLoginClick = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className={`login-register-modal ${isModalOpen ? 'open' : 'hidden'}`}>
      <div className='flip-modal'>
        <div className={`flipper ${isFlipped ? '' : 'flipped'}`}>
          <div className='modal login-modal'>
            <p>Avant de jouer, merci de vous connecter :</p>
            <input name="email" placeholder="email" className="form-control"/>
            <input name="password" placeholder="password" className="form-control"/>
            <button type="button" onClick={handleLoginClick}>Se Connecter</button>
            <p><button id="flip" onClick={handleFlipClick}>Pas encore de compte ?</button></p>
          </div>
          <div className='modal register-modal'>
            <p>Créer son pirate :</p>
            <input name="username" placeholder="username" className="form-control"/>
            <input name="email" placeholder="email" className="form-control"/>
            <input name="password" placeholder="password" className="form-control"/>
            <input name="confirm-password" placeholder="confirm-password" className="form-control"/>
            <button type="button" onClick={handleLoginClick}>Se Connecter</button>
            <p><button id="flip" onClick={handleFlipClick}>Déjà un compte ?</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
