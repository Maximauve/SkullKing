import React from 'react';

interface ErrorProps {
  error?: string
}

const RoomNotFound: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div>
      <h1>404</h1>
      <p>{error}</p>
    </div>
  );
};

export default RoomNotFound;
