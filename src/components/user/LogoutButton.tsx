import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';

const LogoutButton = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { logOut } = useUser();

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    logOut();
  };

  return (
    <>
      <button onClick={Logout}>
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
