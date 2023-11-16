import React, { useContext, useEffect } from 'react';
import SocketProvider from 'contexts/SocketProvider';
import Room from 'pages/Room';
import { UserContext } from 'contexts/UserProvider';
import LoginRegisterModal from 'components/user/LoginRegisterModal';
import { useNavigate, useParams } from 'react-router-dom';

const SocketLayout = () => {
  const { id } = useParams<{ id: string }>();
  const [{ user }] = useContext(UserContext);
  const navigate = useNavigate();

  if (user === undefined) {
    return (
      <LoginRegisterModal />
    );
  }

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
  }, []);

  return (
    <SocketProvider user={user} slug={id as string}>
      <Room />
    </SocketProvider>
  );
};

export default SocketLayout;
