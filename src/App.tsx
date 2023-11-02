import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from 'config/router';

const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
