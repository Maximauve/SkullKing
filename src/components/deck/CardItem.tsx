import React from 'react';
import { type Card } from 'types/cards/Card';

export interface CardProps {
  isActive?: boolean
  onClick?: () => void
  isPlayable: boolean
  card: Card
}

export const CardItem: React.FC<CardProps> = ({ card, isPlayable, isActive, onClick }) => {
  const layout = (content: React.JSX.Element): React.JSX.Element => {
    if (isPlayable) {
      return (
        <div className={'card-item' + (isActive ? ' active' : '')} onClick={onClick}>
          {content}
        </div>
      );
    }
    return (
      <div className='card-item'>
        {content}
      </div>
    );
  };

  return (
    <>
      {layout(<img className="card" src={card.imgPath} alt={card.type.name} />)}
    </>
  );
};
