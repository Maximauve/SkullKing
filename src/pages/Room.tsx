import React, { useState, useEffect, useContext, useCallback } from 'react';
// import io from 'socket.io-client';
import { MessageInput } from 'components/messages/MessageInput';
import { MessagesList } from 'components/messages/MessagesList';
import { type Message, type MessageReceived } from 'types/inputs/Message';
import { UserContext } from 'contexts/UserProvider';
import { Outlet, useNavigate/* , useParams */ } from 'react-router-dom';
import { type UserRoom } from 'types/user/UserRoom';
import useSocket from 'hooks/useSocket';
import SocketProvider from '../contexts/SocketProvider';
// import { type Socket } from 'socket.io-client';
// import { SocketContext } from '../contexts/SocketProvider';
// import useSocket from '../hooks/useSocket';

const Room: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const navigate = useNavigate();
  if (user === undefined) {
    navigate('/login');
    return null;
  }

  const socket = useSocket();
  // const [{ socket }] = useContext(SocketContext);
  // if (socket === undefined) {
  //   connect();
  // }
  //
  // const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  // const socket = io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: user.access_token } });
  // const [isConnected, setIsConnected] = useState<boolean>(socket?.connected || false);
  const [members, setMembers] = useState<UserRoom[]>([]);

  const sendMessage = (value: Message): void => {
    console.log('alo ?');
    socket?.emit('chat', value as any);
  };

  const messageListener = useCallback((message: Message, user: UserRoom): void => {
    console.log('message reçu ! ', message, user);
    const msg: MessageReceived = { message, user };
    setMessages([...messages, msg]);
  }, []);

  const memberListener = useCallback((members: UserRoom[]): void => {
    setMembers(members);
  }, []);

  useEffect(() => {
    socket?.on('chat', messageListener);

    socket?.on('members', memberListener);

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('chat', messageListener);
      socket?.off('members', memberListener);
    };
  }, [messageListener]);

  const leaveRoom = () => {
    socket?.disconnect();
    navigate('/', { replace: true });
  };

  const [{ user }] = useContext(UserContext);
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
