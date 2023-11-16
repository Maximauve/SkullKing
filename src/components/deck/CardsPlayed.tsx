import React from 'react';
import { CardItem } from './CardItem';
import { type ActionPlayed } from 'types/cards/ActionPlayed';

interface Props {
  actionsPlayed: ActionPlayed[]
}

export const CardsPlayed: React.FC<Props> = ({ actionsPlayed }) => {
  return (
    <div className='cards-played'>
      { actionsPlayed.length > 0 && actionsPlayed.map((action, index) => (
        <CardItem key={index} card={action.card} isPlayable={false} />
      ))}
    </div>
  );
};
