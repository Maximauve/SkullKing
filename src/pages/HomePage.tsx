import React, { useContext } from 'react';
import PlayButtonComponent from 'components/home/PlayButtonComponent';
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
        <Link to="/room/create" className='no-underline'>< PlayButtonComponent /></Link>
      </div>
    </div>
  );
};

export default HomePage;
