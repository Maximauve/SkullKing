import React, { useContext } from 'react';
// import io from 'socket.io-client';
// import { MessageInput } from 'components/messages/MessageInput';
import { MessagesList } from 'components/messages/MessagesList';
// import { type Message, type MessageReceived } from 'types/inputs/Message';
// import { UserContext } from 'contexts/UserProvider';
// import { Outlet, useNavigate/* , useParams */ } from 'react-router-dom';
// import { type UserRoom } from 'types/user/UserRoom';
// import useSocket from 'hooks/useSocket';
import SocketProvider from 'contexts/SocketProvider';
import { UserContext } from 'contexts/UserProvider';
// import { type Socket } from 'socket.io-client';
// import { SocketContext } from '../contexts/SocketProvider';
// import useSocket from '../hooks/useSocket';

const Room: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  // const navigate = useNavigate();
  // if (user === undefined) {
  //   navigate('/login');
  //   return null;
  // }

  // const socket = useSocket();
  // const [{ socket }] = useContext(SocketContext);
  // if (socket === undefined) {
  //   connect();
  // }
  //
  // const { id } = useParams<{ id: string }>();
  // const socket = io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: user.access_token } });
  // const [isConnected, setIsConnected] = useState<boolean>(socket?.connected || false);
  // const [members, setMembers] = useState<UserRoom[]>([]);

  // const memberListener = useCallback((members: UserRoom[]): void => {
  //   setMembers(members);
  // }, []);

  // useEffect(() => {
  // socket?.on('members', memberListener);

  // return () => {
  //   socket?.off('connect');
  //   socket?.off('disconnect');
  // socket?.off('members', memberListener);
  //   };
  // }, []);

  // console.log('[ROOM] user : ', user);
  return (
    <SocketProvider user={user}>
      <MessagesList />
    </SocketProvider>
  );

  // return (
  //
  //   <div>
  //     <button onClick={leaveRoom}>Quitter la salle</button>
  //     <ul>
  //       {members.map((member) => (
  //         <li key={member.userId}>{member.username}</li>
  //       ))}
  //     </ul>
  //     <MessageInput send={sendMessage} />
  //     <Messages messages={messages} />
  //   </div>
  // );
};

export default Room;
