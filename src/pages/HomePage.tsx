import React from 'react';
import GoldButtonComponent from 'components/home/GoldButtonComponent';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
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
