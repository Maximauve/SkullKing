import React, { useContext } from 'react';
import SocketProvider from 'contexts/SocketProvider';
import Room from 'pages/Room';
import { UserContext } from 'contexts/UserProvider';
import LoginRegisterModal from '../user/LoginRegisterModal';

const SocketLayout = () => {
  const [{ user }] = useContext(UserContext);

  if (user === undefined) {
    return (
      <LoginRegisterModal />
    );
  }
  return (
    <SocketProvider user={user}>
      <Room />
    </SocketProvider>
  );
};

export default SocketLayout;
