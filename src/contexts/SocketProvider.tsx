import React, { type Dispatch, type PropsWithChildren, /* useContext, */ useEffect, useReducer, useState } from 'react';
import { initialSocketState, SocketActionType, SocketReducer, type SocketState } from 'contexts/socketReducer';
import { type Action } from 'types/Action';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
// import { type User } from '../types/user/User';
// import { UserContext } from './UserProvider';
import { type User } from '../types/user/User';
import LoginRegisterModal from '../components/user/LoginRegisterModal';

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
  initialSocketState,
  () => null
]);

const initializeState = (user: User | undefined): SocketState => {
  // const [{ user }] = useContext(UserContext);
  if (user !== undefined) {
    console.log('[SocketProvider] User is defined : ', user);
    const state: SocketState = {
      socket: io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: user.access_token } }),
      loading: false
    };
    console.log('[SocketProvider] initializeState : ', state);
    return state;
  }
  return initialSocketState;
};

interface props {
  user: User | undefined
}
const SocketProvider: React.FC<PropsWithChildren<props>> = ({ user, children }) => {
  const [state, dispatch] = useReducer(SocketReducer, user, initializeState as any);
  const { socket } = state;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [{ user }] = useContext(UserContext);
  const [isLogged] = useState<boolean>(user !== undefined);

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
    console.log('[SocketProvider] socket : ', socket);

    if (socket === undefined && isLogged) {
      const newSocket = io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: (user as User).access_token } });
      console.log('[SocketProvider] newSocket : ', newSocket);
      dispatch({ type: SocketActionType.SET_SOCKET, payload: newSocket });
      console.log('[SocketProvider] socket should now be defined : ', socket);
    }

    if (socket !== undefined) {
      socket?.on('connect', () => {
        socket?.emit('joinRoom', id, (error: any): void => {
          if (error !== null) {
            console.log('error from joinRoom : ', error);
          }
        });
      });
    }

    socket?.on('disconnect', () => {
    });

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
    };
  }, []);

  if (!isLogged) {
    return (
      <LoginRegisterModal />
    );
  }

  if (socket?.connected ?? false) {
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
