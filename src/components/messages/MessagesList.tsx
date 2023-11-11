import React/* , { useState } */, { useCallback, useEffect, useState } from 'react';
import { type Message, type MessageReceived } from 'types/inputs/Message';
import useSocket from 'hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import { MessageInput } from './MessageInput';
import { Messages } from './Messages';
import { type UserRoom } from '../../types/user/UserRoom';

export const MessagesList = (): React.JSX.Element => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [messages, setMessages] = useState<MessageReceived[]>([]);

  const sendMessage = (value: Message): void => {
    console.log('alo ?');
    socket?.emit('chat', value as any);
  };

  const messageListener = useCallback((message: Message, user: UserRoom): void => {
    console.log('message reçu ! ', message, user);
    const msg: MessageReceived = { message, user };
    setMessages([...messages, msg]);
  }, []);

  useEffect(() => {
    // TODO : si les messages sont vides, fetch les messages de la room (TO IMPLEMENT API)

    socket?.on('chat', messageListener);
    return () => {
      socket?.off('chat');
    };
  }, [messageListener]);

  const leaveRoom = () => {
    socket?.disconnect();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <button onClick={leaveRoom}>Quitter la salle</button>
      <MessageInput send={sendMessage} />
      <Messages messages={messages} />
    </div>
  );
};
