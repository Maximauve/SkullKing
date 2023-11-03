import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { MessageInput } from 'components/messages/MessageInput';
import { Messages } from 'components/messages/Messages';
import { type Message, type MessageReceived } from 'types/inputs/Message';
import { UserContext } from 'contexts/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { type UserRoom } from 'types/user/UserRoom';

const Room: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const navigate = useNavigate();
  if (user === undefined) {
    navigate('/login');
    return null;
  }

  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  const socket = io('http://localhost:8001', { query: { token: user.access_token } });
  const [isConnected, setIsConnected] = useState<boolean>(socket?.connected || false);

  const sendMessage = (value: Message): void => {
    console.log('alo ?');
    socket?.emit('chat', value as any);
  };

  const messageListener = (message: Message, user: UserRoom): void => {
    console.log('message reçu ! ', message, user);
    const msg: MessageReceived = { message, user };
    setMessages([...messages, msg]);
  };

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connecté !');
      socket?.emit('joinRoom', id);
      setIsConnected(true);
    });

    socket?.on('disconnect', () => {
      setIsConnected(false);
    });

    socket?.on('chat', messageListener);

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('chat', messageListener);
    };
  }, [setIsConnected, messageListener]);

  const leaveRoom = () => {
    socket?.disconnect();
    navigate('/', { replace: true });
  };

  return (
    <div>
      {isConnected ? <button onClick={leaveRoom}>Quitter la salle</button> : <p>Connecting...</p>}
      <MessageInput send={sendMessage} />
      <Messages messages={messages} />
    </div>
  );
};

export default Room;
