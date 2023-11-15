import React from 'react';
import { type Card } from 'types/Card';

export interface CardProps {
  card: Card
}

export const CardItem: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card-item">
      <img className="card" src={card.imgPath} alt={card.type.name} />
    </div>
  );
};
