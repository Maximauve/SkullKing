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
      <button onClick={Logout} className='logoutCount'>
        <img src="" alt="Skull King Logo" />
      </button>
    </>
  );
};

export default LogoutButton;
