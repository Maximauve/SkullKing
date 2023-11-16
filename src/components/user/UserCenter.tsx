import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';
import { Rules } from 'components/global/Rules';

const UserCenter = (): React.JSX.Element => {
  const [isUserCenterOpen, setIsUserCenterOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useUser();

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    logOut();
  };

  const handleClick = (): void => {
    setIsUserCenterOpen(!isUserCenterOpen);
  };

  const OpenRules = () => {
    setIsUserCenterOpen(!isUserCenterOpen);
    setIsRulesOpen(!isRulesOpen);
  };

  return (
    <>
      <div className="user-center">
        <img className="user-profile-picture" onClick={handleClick} src='/images/profile-picture.jpg' alt="Profil Pic" />
      </div>
      { isUserCenterOpen &&
        <div className='user-center-deploy'>
          <button onClick={OpenRules}> Régles </button>
          <button onClick={Logout}>
            Logout
          </button>
        </div>
      }
      { isRulesOpen &&
        <div className='rules'>
          <Rules />
        </div>
      }
    </>
  );
};

export default UserCenter;
