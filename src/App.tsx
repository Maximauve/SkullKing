import React from 'react';
import HomePage from './Composant/templates/HomePage';
import Chat from './Composant/templates/Chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;