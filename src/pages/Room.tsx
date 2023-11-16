import React, { useContext, useEffect, useState } from 'react';
import MessagesList from 'components/messages/MessagesList';
import UsersInRoom from 'components/room/UsersInRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';
import LoginRegisterModal from 'components/user/LoginRegisterModal';
import useSocket from 'hooks/useSocket';
import { type UserRoom } from 'types/user/UserRoom';
import { Deck } from '../components/deck/Deck';
import { type Card } from '../types/cards/Card';
import { CardsPlayed } from '../components/deck/CardsPlayed';
import { type ActionPlayed } from '../types/cards/ActionPlayed';

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [{ user }] = useContext(UserContext);
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);
  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<UserRoom | undefined>(undefined);
  const [cards, setCards] = useState<Card[]>([]);
  const [actionsPlayed, setActionsPlayed] = useState<ActionPlayed[]>([]);

  const [isLogged] = useState<boolean>(user !== undefined);

  const startGame = () => {
    socket?.emit('startGame', id, (response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from startGame : ', response.error);
      }
    });
  };

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }

    socket?.on('connect', () => {
      socket?.emit('joinRoom', id, (response: any): void => {
        if (response.hasOwnProperty('error')) {
          console.log('error from joinRoom : ', response.error);
        } else {
          setGameIsStarted(response.gameIsStarted);
        }
      });
    });

    socket?.on('members', (members: UserRoom[]) => {
      setMembers(members);
      setMyUser(members.find((member) => member.socketId === socket?.id));
      console.log('[Room] members : ', members);
      console.log('[Room] my Socket id : ', socket?.id);
      console.log('[Room] myUser : ', myUser);
    });

    socket?.on('gameStarted', (value: boolean) => {
      setGameIsStarted(value);
    });

    socket?.on('cards', (cards: Card[]) => {
      console.log('[Deck] cards : ', cards);
      setCards(cards);
    });

    socket?.on('cardPlayed', (actionPlayed: ActionPlayed) => {
      console.log('[Deck] cardPlayed : ', actionPlayed);
      setActionsPlayed([...actionsPlayed, actionPlayed]);
    });

    socket?.on('disconnect', () => {
      socket?.emit('leaveRoom', id);
      socket?.disconnect();
    });

    return () => {
      socket?.off('connect');
      socket?.off('members');
      socket?.off('gameStarted');
      socket?.off('cards');
      socket?.off('cardPlayed');
      socket?.off('disconnect');
    };
  }, []);

  if (!isLogged) {
    return (
      <LoginRegisterModal />
    );
  }

  if (socket === undefined || !socket.connected) {
    return (
      <div>
        <p>Connexion en cours...</p>
      </div>
    );
  }

  // const customCards: Card[] = [
  //   {
  //     type: {
  //       name: 'Pirate',
  //       superior_to: []
  //     },
  //     imgPath: '/image/cards/pirate/1.png'
  //   },
  //   {
  //     type: {
  //       name: 'Pirate',
  //       superior_to: []
  //     },
  //     imgPath: '/image/cards/pirate/2.png'
  //   },
  //   {
  //     type: {
  //       name: 'Pirate',
  //       superior_to: []
  //     },
  //     imgPath: '/image/cards/pirate/3.png'
  //   }
  // ];

  // LOBBY
  // TODO : MAKE LOBBY COMPONENT
  if (!gameIsStarted) {
    return (
      <>
        <UsersInRoom members={members}/>

        {myUser !== undefined && myUser.isHost && (
          <button onClick={startGame}>Lancer la partie</button>
        )}

        {/* <Deck cards={customCards} /> */}
        <MessagesList/>
      </>
    );
  } else {
    // GAME
    return (
      <>
        <UsersInRoom members={members}/>

        <CardsPlayed actionsPlayed={actionsPlayed} />

        <Deck cards={cards} />
      </>
    );
  }
};

export default Room;
