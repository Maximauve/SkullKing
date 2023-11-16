import React from 'react';

interface RulesProps {
  onClick: () => void
}

export const Rules: React.FC<RulesProps> = ({ onClick }) => {
  return (
    <>
      <div className='rules-modal'>
        <div className='modal-background'>
          <div className='close-modal' onClick={onClick}>X</div>
          <div className='modal'>
            <h1>Régles du jeu</h1>
          </div>
        </div>
      </div>
    </>
  );
};
