import React/* , { useState } */ from 'react';

export const Messages = ({ messages }: { messages: string[] }): React.JSX.Element => {
  // const [value, setValue] = useState<string>('');
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};
