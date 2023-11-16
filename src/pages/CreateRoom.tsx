import LoginRegisterModal from 'components/user/LoginRegisterModal';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type RoomOptions } from 'types/RoomOptions';
import redis from 'config/redis';
import { UserContext } from 'contexts/UserProvider';
import UserCenter from 'components/user/UserCenter';
import GoldButtonComponent from 'components/home/GoldButtonComponent';

const CreateRoom: React.FC = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [{ user }] = useContext(UserContext);
  const [room, setRoom] = useState<string>('');

  const [error, setError] = useState<string>('');
  const joinRoomClick = async (): Promise<void> => {
    if (user === undefined) {
      setError('Vous devez être connecté pour rejoindre une partie');
      return;
    }
    navigate(`/room/${room}`);
  };
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
        socketId: null,
        points: 0
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
      <LoginRegisterModal />
      <div className='display-user-center'>
        {state.user !== undefined &&
          <UserCenter />
        }
      </div>
      <div className='start-game'>
        <p>Pour créer une partie, par ici :</p>
        {error !== '' && <p>{error}</p>}
        <div onClick={() => {
          void (async () => {
            await handleButtonClick();
          })();
        }}>
          < GoldButtonComponent text="Creer une partie" />
        </div>
        <p>Rejoindre des amis :</p>
        <input name="input-room" placeholder="Nom de la room" className="form-control" onChange={(event) => { setRoom(event.target.value); }} value={room}/>
        <div onClick={() => {
          void (async () => {
            await joinRoomClick();
          })();
        }}>
          < GoldButtonComponent text="Rejoindre la partie" />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
