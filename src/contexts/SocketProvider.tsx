import React, { type Dispatch, type PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { initialSocketState, type SocketActionType, SocketReducer, type SocketState } from 'contexts/socketReducer';
import { type Action } from 'types/Action';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { type User } from '../types/user/User';

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
  initialSocketState,
  () => null
]);

const initializeState = (user: User | undefined): SocketState => {
  // const [{ user }] = useContext(UserContext);
  if (user !== undefined) {
    return {
      socket: io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: user.access_token } }),
      loading: false
    };
  }
  return initialSocketState;
};

interface props {
  user: User | undefined
}
const SocketProvider: React.FC<PropsWithChildren<props>> = ({ children, user }) => {
  const [state, dispatch] = useReducer(SocketReducer, initialSocketState, initializeState as any);
  const { socket } = state;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState<boolean>(socket?.connected ?? false);

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
      return;
    }

    socket?.on('connect', () => {
      socket?.emit('joinRoom', id, (error: any): void => {
        if (error !== null) {
          console.log('error from joinRoom : ', error);
        } else {
          setIsConnected(true);
        }
      });
    });

    socket?.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
    };
  }, []);

  if (!isConnected) {
    return (
      <div>
        <p>Connexion en cours...</p>
      </div>
    );
  }

  return (
    <SocketContext.Provider value={ [state, dispatch] }>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
