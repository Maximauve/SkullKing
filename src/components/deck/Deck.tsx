import React from 'react';
import { type Card } from 'types/Card';
import { CardItem } from 'components/deck/CardItem';

interface Props {
  cards: Card[]
}
export const Deck: React.FC<Props> = ({ cards }) => {
  return (
    <div className='deck'>
      { cards.length > 0 && cards.map((card, index) => (
        <CardItem key={index} card={card} />
      ))}
    </div>
  );
};
