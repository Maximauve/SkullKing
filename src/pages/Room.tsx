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
  const socket = io(process.env.REACT_APP_API_BASE_URL as string, { query: { token: user.access_token } });
  const [isConnected, setIsConnected] = useState<boolean>(socket?.connected || false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

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

  // const leaveRoom = () => {
  //   socket?.disconnect();
  //   navigate('/', { replace: true });
  // };
  const chatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <button className="toggle-chat-btn" onClick={chatOpen}>Activer le chat</button>
      <div className="chat-box" style={{ display: isChatOpen ? 'block' : 'none' }}>
        {isConnected ? <p>Que le meilleur gagne !</p> : <p>Connecting...</p>}
        <MessageInput send={sendMessage} />
        <Messages messages={messages} />
      </div>
    </div>
  );
};

export default Room;
