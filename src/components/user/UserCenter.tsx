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
        <img className="user-profil-picture" src='https://cdn.discordapp.com/attachments/1159044537763766343/1172480833932775454/fotor-ai-2023111011201.jpg?ex=656078de&is=654e03de&hm=e226166a7bbe476d7991fd01d94b6998e4c0f2bff450a46d6389fa13694e0668&' alt="Profil Pic" />
      </div>
      <button onClick={Logout}>
        Logout
      </button>
    </>
  );
};

export default UserCenter;
