import React, { useState } from 'react';
import useSocket from 'hooks/useSocket';

interface Props {
  currentRound: number
}
const Bet: React.FC<Props> = ({ currentRound }) => {
  const [bet, setBet] = useState<number>(0);
  const [isBetDone, setIsBetDone] = useState(false);
  const socket = useSocket();

  const handleChange = (e: any) => {
    setBet(e.target.value);
  };

  const handleClick = () => {
    socket?.emitWithAck('bet', bet).then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from bet : ', response.error);
      }
    }).catch((err) => {
      console.error(err);
    });
    setIsBetDone(true);
  };

  return (
    <div className='bet-background'>
      <div className='bet-modal'>
        <p>Il est temps de parier !</p>
        <select className={isBetDone ? 'done' : ''} name="bet" id="bet" onChange={handleChange} value={bet}>
          <option key={0} value="0">0</option>
          {Array(currentRound).fill(0).map((_, i: number) => (
            <option key={i + 1 } value={i + 1 }>{i + 1}</option>
          ))}
        </select>
        <button className={isBetDone ? 'done' : ''} type="button" onClick={handleClick}>Parier !</button>
      </div>
    </div>
  );
};

export default Bet;
