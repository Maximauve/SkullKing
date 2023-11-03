import React, { type PropsWithChildren, useContext/*, useEffect */ } from 'react';
import { CardContext } from 'contexts/CardProvider';
// import { type Card } from 'types/Card';
// import useCards from '../../hooks/useCard';

interface DeckProps {
  coucou: string
}

export const Deck: React.FC<PropsWithChildren<DeckProps>> = ({ children }) => {
  const [state] = useContext(CardContext);

  console.log(state);
  return (
    <div>
      <p>coucou</p>
      {children}
    </div>
  );
};
