import React, { type Dispatch, type PropsWithChildren, useReducer } from 'react';
import { io } from 'socket.io-client';
import { type User } from 'types/user/User';
import { initialSocketState, type SocketActionType, SocketReducer, type SocketState } from 'contexts/socketReducer';
import { type Action } from 'types/Action';

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
  initialSocketState,
  () => null
]);

const initializeState = (prop: props): SocketState => {
  if (prop.user !== undefined && prop.slug !== undefined) {
    console.log('[SocketProvider] User is defined : ', prop.user);
    const state: SocketState = {
      socket: io(process.env.REACT_APP_WS_URL as string, { query: { token: prop.user.access_token, slug: prop.slug } }),
      loading: false
    };
    console.log('[SocketProvider] initializeState : ', state);
    return state;
  }
  return initialSocketState;
};

interface props {
  user: User
  slug: string
}
const SocketProvider: React.FC<PropsWithChildren<props>> = ({ children, slug, user }) => {
  const [state, dispatch] = useReducer(SocketReducer, { user, slug }, initializeState as any);
  // const { socket } = state;
  // const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  // const [isLogged] = useState<boolean>(user !== undefined);
  //
  // useEffect(() => {
  //   if (id === undefined) {
  //     navigate('/');
  //   }
  //   console.log('[SocketProvider] socket : ', socket);
  //
  //   if (socket === undefined && isLogged) {
  //     const newSocket = io(process.env.REACT_APP_WS_URL as string, { query: { token: (user as User).access_token } });
  //     console.log('[SocketProvider] newSocket : ', newSocket);
  //     dispatch({ type: SocketActionType.SET_SOCKET, payload: newSocket });
  //     console.log('[SocketProvider] socket should now be defined : ', socket);
  //   }
  //
  //   if (socket !== undefined) {
  //     socket?.on('connect', () => {
  //       socket?.emit('joinRoom', id, (error: any): void => {
  //         if (error !== null) {
  //           console.log('error from joinRoom : ', error);
  //         }
  //       });
  //     });
  //   }
  //
  //   socket?.on('disconnect', () => {
  //   });
  //
  //   return () => {
  //     socket?.off('connect');
  //     socket?.off('disconnect');
  //   };
  // }, []);
  //
  // if (!isLogged) {
  //   return (
  //     <LoginRegisterModal />
  //   );
  // }
  //
  // if (socket?.connected ?? false) {
  //   return (
  //     <div>
  //       <p>Connexion en cours...</p>
  //     </div>
  //   );
  // }

  return (
    <SocketContext.Provider value={[state, dispatch]}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
