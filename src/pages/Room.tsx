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
import UserCenter from 'components/user/UserCenter';

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
  const [winner, setWinner] = useState<UserRoom | undefined>(undefined);

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

    socket?.on('newPli', (win: UserRoom) => {
      console.log('[Room] newPli - winner : ', win);
      setWinner(win);
      setTimeout(() => {
        setActionsPlayed([]);
        setWinner(undefined);
      }, 5000);
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
        <UsersInRoom members={members} number={members.length} gameIsStarted={gameIsStarted}/>

        <div className='display-user-center'>
          <UserCenter />
        </div>

        {myUser?.isHost && (
          <div className='start-modal'>
            {members.length < 3 && (
              <div>
                <p>En attente de joueurs ...</p>
                <p>Il faut être au moins 3 joueurs pour lancer la partie !</p>
              </div>
            )}
            <button className={members.length < 3 ? 'disabled' : ''} onClick={startGame}>Lancer la partie</button>
          </div>
        )}

        <MessagesList/>
      </>
    );
  } else {
    // GAME
    return (
      <>

        <UsersInRoom members={members} number={currentRound} winner={winner} gameIsStarted={gameIsStarted}/>

        <div className='display-user-center'>
          <UserCenter />
        </div>

        {isBetTime && (
          <div className='player-bet'>
            <Bet currentRound={currentRound} />
          </div>
        )}

        {winner !== undefined && (
          <div className='player-to-play'>
            <p>{winner.username} a gagné le pli !</p>
          </div>
        )}

        <CardsPlayed actionsPlayed={actionsPlayed} />

        {myUser?.hasToPlay && !isBetTime && (
          <div className='player-to-play'>
            <p>C'est à toi de jouer !</p>
          </div>
        )}

        <div className='player-deck'>
          <Deck cards={cards} />
        </div>

        <MessagesList/>
      </>
    );
  }
};

export default Room;
