import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import SocketProvider from 'contexts/SocketProvider';
import { UserContext } from 'contexts/UserProvider';

const RoomLayout = () => {
  const [{ user }] = useContext(UserContext);
  return (
    <SocketProvider user={user}>
      <div className="room-layout">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default RoomLayout;
