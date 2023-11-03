import React, { useContext, useState } from 'react';
import { type UserLoginDTO } from 'types/user/UserLoginDTO';
import useUser from 'hooks/useUser';
import { type UserRegisterDTO } from 'types/user/UserRegisterDTO';
import { UserContext } from 'contexts/UserProvider';

const LoginRegisterModal: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [error, setError] = useState<string>('');

  const { logIn, signUp } = useUser();
  const [state] = useContext(UserContext);

  const handleFlipClick = (): void => {
    setError('');
    setIsFlipped(!isFlipped);
  };

  const handleRegisterClick = (): void => {
    const user: UserRegisterDTO = {
      username,
      email,
      password
    };
    signUp(user).then(() => {
      setIsModalOpen(false);
    }).catch((err) => {
      setError(err.message);
    });
  };

  const handleLoginClick = (): void => {
    const user: UserLoginDTO = {
      email,
      password
    };
    logIn(user).then(() => {
      setIsModalOpen(false);
    }).catch((err) => {
      setError(err.message);
    });
  };

  if (!isModalOpen || state.user !== undefined) {
    return null;
  }
  return (
    <div className={'login-register-modal'}>
      <div className='flip-modal'>
        <div className={`flipper ${isFlipped ? '' : 'flipped'}`}>
          <div className='modal login-modal'>
            <p>Avant de jouer, merci de vous connecter :</p>
            <input name="email" placeholder="email" className="form-control" onChange={(event) => { setEmail(event.target.value); }} value={email}/>
            <input name="password" placeholder="password" className="form-control" onChange={(event) => { setPassword(event.target.value); }} value={password} />
            <button type="button" onClick={handleLoginClick}>Se Connecter</button>
            { error !== '' &&
              <p className='error'>{error}</p>
            }
            <button id="flip" onClick={handleFlipClick}>Pas encore de compte ?</button>
          </div>
          <div className='modal register-modal'>
            <p>Créer son pirate :</p>
            <input name="username" placeholder="username" className="form-control" onChange={(event) => { setUsername(event.target.value); }} value={username}/>
            <input name="email" placeholder="email" className="form-control" onChange={(event) => { setEmail(event.target.value); }} value={email}/>
            <input name="password" placeholder="password" className="form-control" onChange={(event) => { setPassword(event.target.value); }} value={password}/>
            <input name="confirm-password" placeholder="confirm-password" className="form-control" onChange={(event) => { setConfirmPassword(event.target.value); }} value={confirmPassword}/>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <button type="button" onClick={handleRegisterClick}>S'enregistrer</button>
            { error !== '' &&
              <p className='error'>{error}</p>
            }
            <button id="flip" onClick={handleFlipClick}>Déjà un compte ?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
