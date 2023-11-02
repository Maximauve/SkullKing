import React, { useEffect, useState } from 'react';
import io, { type Socket } from 'socket.io-client';
import { MessageInput } from 'components/messages/MessageInput';
import { Messages } from 'components/messages/Messages';

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string): void => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const socket = io('http://localhost:8001');
    setSocket(socket);
  }, [setSocket]);

  const messageListener = (message: string): void => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => {
      socket?.off('message', messageListener);
    };
  }, [messageListener]);

  return (
    <>
      <MessageInput send={send} />
      <Messages messages={messages}/>
    </>
  );
};

export default Chat;
