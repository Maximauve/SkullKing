import React, { useContext } from 'react';
import GoldButtonComponent from 'components/home/GoldButtonComponent';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import UserCenter from 'components/user/UserCenter';

const HomePage: React.FC = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      <div className='display-user-center'>
        {state.user !== undefined &&
          <UserCenter />
        }
      </div>
      <div className='homepage'>
        <div className="homepage-logo">
          <img src="/images/Skull-King-logo.png" alt="Skull King Logo" />
        </div>
        <Link to="/room/create" className='no-underline'>< GoldButtonComponent text="JOUER" /></Link>
      </div>
    </div>
  );
};

export default HomePage;
