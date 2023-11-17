import React, { useEffect, useState } from 'react';
import { type Message, type MessageReceived } from 'types/inputs/Message';
import { MessageInput } from 'components/messages/MessageInput';
import { Messages } from 'components/messages/Messages';
import { type UserRoom } from 'types/user/UserRoom';
import useSocket from 'hooks/useSocket';

const MessagesList = (): React.JSX.Element => {
  const socket = useSocket();
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const messageListener = (message: Message, user: UserRoom): void => {
    const msg: MessageReceived = { message, user };
    setMessages((previousMessages) => [...previousMessages, msg]);
  };

  useEffect(() => {
    // TODO : si les messages sont vides, fetch les messages de la room (TO IMPLEMENT API)

    socket?.on('chat', messageListener);
    return () => {
      socket?.off('chat');
    };
  }, [messageListener]);

  const chatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <button className={`toggle-chat-btn ${isChatOpen ? 'open' : ''}`} onClick={chatOpen}>Tchat</button>
      {isChatOpen && (
        <div className='chat-box'>
          <MessageInput />
          <Messages messages={messages} />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
