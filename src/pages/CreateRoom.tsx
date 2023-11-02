import LoginRegisterModal from 'components/user/LoginRegisterModal';
import React from 'react';

const CreateRoom: React.FC = () => {
  return (
    <div>
      <LoginRegisterModal />
      <div className='start-game'>
        <p>Pour créer une partie, par ici :</p>
        <button type="button">Créer une partie</button>
        <p>Rejoindre des amis :</p>
        <input name="room-name" placeholder="room-name" className="form-control"/>
        <button type="button">Rejoindre la partie</button>
      </div>
    </div>
  );
};

export default CreateRoom;
