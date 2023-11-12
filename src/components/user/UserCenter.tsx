import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';

const UserCenter = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { logOut } = useUser();

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    logOut();
  };

  return (
    <>
      <div className="user-center">
        <img className="user-profil-picture" src='/image/profil-picture.jpg' alt="Profil Pic" />
      </div>
      <button onClick={Logout}>
        Logout
      </button>
    </>
  );
};

export default UserCenter;
