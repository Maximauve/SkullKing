import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Message } from 'types/inputs/Message';
import useSocket from 'hooks/useSocket';

export const MessageInput = (): React.JSX.Element => {
  const [value, setValue] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const time = new Date();
  const message: Message = {
    text: value,
    slug: id as string,
    timeSent: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  };

  const socket = useSocket();
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    socket?.emitWithAck('chat', message).then((response: any): any => {
      if (response.hasOwnProperty('error')) {
        console.log('error from chat : ', response.error);
      } else {
        setValue('');
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <form className='chat' onSubmit={handleSubmit}>
      <input
        className='chat-input'
        onChange={(e) => { setValue(e.target.value); }}
        placeholder="Ton message..."
        value={value}
      />
      {value !== ''
        ? <button className='chat-button'>→</button>
        : <button className='chat-button' disabled>→</button>
      }
    </form>
  );
};
