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
      <div>
        <div className="play-button">
          <div className="gradient-border">
            <div className="gradient-border-inner">
              <div className="play-button-text" onClick={Logout}>
                Deconexion
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutButton;
