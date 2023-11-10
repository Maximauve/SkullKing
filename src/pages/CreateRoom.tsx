import LoginRegisterModal from 'components/user/LoginRegisterModal';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type RoomOptions } from 'types/RoomOptions';
import redis from 'config/redis';
import { UserContext } from 'contexts/UserProvider';
import ReturnComponent from 'components/home/ReturnComponent';
import { Link } from 'react-router-dom';

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const [{ user }] = useContext(UserContext);

  const [error, setError] = useState<string>('');

  const handleButtonClick = async (): Promise<void> => {
    if (user === undefined) {
      setError('Vous devez être connecté pour créer une partie');
      return;
    }
    const obj: RoomOptions = {
      maxPlayers: 8,
      host: {
        userId: user.id,
        username: user.username,
        socketId: null
      }
    };
    redis.createRoom(obj, user).then((res) => {
      navigate(`/room/${res.slug}`);
    }).catch((err) => {
      setError(err.message);
      console.error(err);
    });
  };
  return (
    <div>
      <Link to="/">< ReturnComponent /></Link>
      <LoginRegisterModal />
      <div className='start-game'>
        <p>Pour créer une partie, par ici :</p>
        {error !== '' && <p>{error}</p>}
        <button type="button" onClick={() => {
          void (async () => {
            await handleButtonClick();
          })();
        }}>
          Créer une partie
        </button>
        <p>Rejoindre des amis :</p>
        <input name="room-name" placeholder="room-name" className="form-control"/>
        <button type="button">Rejoindre la partie</button>
      </div>
    </div>
  );
};

export default CreateRoom;
