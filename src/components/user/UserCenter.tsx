import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';

const UserCenter = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useUser();

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    logOut();
  };

  const handleClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="user-center">
        <img className="user-profil-picture" onClick={handleClick} src='/image/profil-picture.jpg' alt="Profil Pic" />
      </div>
      <div className={`user-center-deploy ${isModalOpen ? '' : 'hidden'}`}>
        <button onClick={Logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default UserCenter;
