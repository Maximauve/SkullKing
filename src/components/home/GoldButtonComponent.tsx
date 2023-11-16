import React from 'react';

interface Props {
  text: string
}

const GoldButtonComponent: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="gold-button">
        <div className="gradient-border">
          <div className="gradient-border-inner">
            <div className="gold-button-text">
              { text }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldButtonComponent;
