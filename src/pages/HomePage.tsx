import React, { useContext } from 'react';
import PlayButtonComponent from 'components/home/PlayButtonComponent';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/user/LogoutButton';
import { UserContext } from '../contexts/UserProvider';

const HomePage: React.FC = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      {state.user !== undefined &&
        <LogoutButton />
      }
      <div className='homepage'>
        <div className="homepage-logo">
          <img src="https://cdn.discordapp.com/attachments/888154458528301097/1163232163274174555/Skull-King-logo.png?ex=653ed35f&is=652c5e5f&hm=cdfdaff777b271952802f8bdb79c3217a7e57d1333ae2cbc67d3c21a329c1697&" alt="Skull King Logo" />
        </div>
      </div>
      <Link to="/room/create" className='no-underline'>< PlayButtonComponent /></Link>
    </div>
  );
};

export default HomePage;
