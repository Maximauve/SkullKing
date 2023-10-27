import React from "react";

const PlayButtonComponent: React.FC = () => {

  return (
    <div>
      <div className="play-button">
        <div className="gradient-border">
          <div className="gradient-border-inner">
            <div className="play-button-text">
              JOUER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayButtonComponent;