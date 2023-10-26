import React, {useEffect, useState} from "react";
import io, { Socket } from "socket.io-client";
import {MessageInput} from "./MessageInput";
import {Messages} from "./Messages";

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit('message', value);
  }

  useEffect(() => {
    const socket = io('http://localhost:8001');
    setSocket(socket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages!, message]);
  }

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => {
      socket?.off('message', messageListener);
    }
  }, [messageListener]);
  return (
    <>
      <MessageInput send={send} />
      <Messages messages={messages}/>
    </>
  )
}

export default Chat;