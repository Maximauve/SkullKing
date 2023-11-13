// import { io } from 'socket.io-client';
import { useContext } from 'react';
import { SocketContext } from 'contexts/SocketProvider';
// import { SocketActionType } from 'contexts/socketReducer';
// import { UserContext } from 'contexts/UserProvider';

const useSocket = () => {
  const [{ socket }] = useContext(SocketContext);

  return socket;
};

export default useSocket;
