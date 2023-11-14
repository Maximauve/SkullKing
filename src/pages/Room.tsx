import React, { useContext } from 'react';
import { MessagesList } from 'components/messages/MessagesList';
import SocketProvider from 'contexts/SocketProvider';
import { UserContext } from 'contexts/UserProvider';
import UsersInRoom from 'components/room/UsersInRoom';

const Room: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  return (
    <SocketProvider user={user}>
      <UsersInRoom />
      <MessagesList />
    </SocketProvider>
  );
};

export default Room;
