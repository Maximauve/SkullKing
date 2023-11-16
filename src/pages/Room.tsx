import React, { useContext, useEffect, useState } from 'react';
import MessagesList from 'components/messages/MessagesList';
import UsersInRoom from 'components/room/UsersInRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';
import LoginRegisterModal from 'components/user/LoginRegisterModal';
import useSocket from 'hooks/useSocket';
import { type UserRoom } from 'types/user/UserRoom';
import { Deck } from 'components/deck/Deck';
import { type Card } from 'types/cards/Card';
import { CardsPlayed } from 'components/deck/CardsPlayed';
import { type ActionPlayed } from 'types/cards/ActionPlayed';
import Bet from 'components/room/Bet';

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [{ user }] = useContext(UserContext);
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);
  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [isBetTime, setIsBetTime] = useState<boolean>(true);
  const [myUser, setMyUser] = useState<UserRoom | undefined>(undefined);
  const [cards, setCards] = useState<Card[]>([]);
  const [actionsPlayed, setActionsPlayed] = useState<ActionPlayed[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);

  const [isLogged] = useState<boolean>(user !== undefined);

  const startGame = () => {
    socket?.emitWithAck('startGame', id).then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from startGame : ', response.error);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }

    socket?.on('connect', () => {
      socket?.emitWithAck('joinRoom', id).then((response: any) => {
        if (response.hasOwnProperty('error')) {
          console.log('error from joinRoom : ', response.error);
        } else {
          setGameIsStarted(response.gameIsStarted);
        }
      }).catch((err) => {
        console.error(err);
      });
    });

    socket?.on('members', (newMembers: UserRoom[]) => {
      setMembers(newMembers);
      console.log('myUser : ', newMembers.find((member) => member.socketId === socket?.id));
      setMyUser(newMembers.find((member) => member.socketId === socket?.id));
    });

    socket?.on('gameStarted', (value: boolean) => {
      setGameIsStarted(value);
    });

    socket?.on('cards', (newCards: Card[], isNewRound: boolean | undefined) => {
      console.log('[Room] cards updated ! : ', newCards);
      console.log('[Room] currentRound : ', currentRound);
      if (isNewRound) {
        setTimeout(() => {
          setCards(newCards);
        }, 5000);
      } else {
        setCards(newCards);
      }
    });

    socket?.on('cardPlayed', (action: ActionPlayed) => {
      console.log('[Room] cardPlayed : ', action);
      setActionsPlayed((previousActionPlayed) => [...previousActionPlayed, action]);
    });

    socket?.on('bet', ([user, bet]) => {
      console.log('[Room] bet : ', user, bet);
    });

    socket?.on('newRound', () => {
      setIsBetTime(false);
    });

    socket?.on('newPli', (winner: UserRoom, isNewRound: boolean | undefined) => {
      console.log('[Room] newPli - winner : ', winner);
      if (isNewRound) {
        setTimeout(() => {
          setActionsPlayed([]);
        }, 5000);
      } else {
        setActionsPlayed([]);
      }
    });

    socket?.on('endRound', (newRound: number) => {
      setTimeout(() => {
        setCurrentRound(newRound);
        setIsBetTime(true);
      }, 5000);
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

  // LOBBY
  // TODO : MAKE LOBBY COMPONENT
  if (!gameIsStarted) {
    return (
      <>
        <UsersInRoom members={members} number={members.length}/>

        {myUser?.isHost && (
          <button onClick={startGame}>Lancer la partie</button>
        )}

        <MessagesList/>
      </>
    );
  } else {
    // GAME
    return (
      <>
        <UsersInRoom members={members} number={currentRound} />

        {isBetTime && (
          <Bet currentRound={currentRound} />
        )}

        <CardsPlayed actionsPlayed={actionsPlayed} />

        <Deck cards={cards} />
        {myUser?.hasToPlay && (
          <p>c'est à toi de jouer !</p>
        )}
      </>
    );
  }
};

export default Room;
