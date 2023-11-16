import React/* , { useState } */ from 'react';
import { type MessageReceived } from 'types/inputs/Message';

export const Messages = ({ messages }: { messages: MessageReceived[] }): React.JSX.Element => {
  return (
    <div>
      {messages.map((message, index) => (
        <div className='messageText' key={index}>{message.user.username} - {message.message.timeSent} : {message.message.text}</div>
      ))}
    </div>
  );
};
