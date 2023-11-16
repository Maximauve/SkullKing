import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Message } from '../../types/inputs/Message';

export const MessageInput = ({ send }: { send: (value: Message) => void }): React.JSX.Element => {
  const [value, setValue] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const time = new Date();
  const message: Message = {
    text: value,
    slug: id as string,
    timeSent: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  };

  return (
    <>
      <input
        onChange={(e) => { setValue(e.target.value); }}
        placeholder="Your message..."
        value={value}
      />
      <button className='Chat-button' onClick={() => { send(message); }}>Envoyer</button>
    </>
  );
};
