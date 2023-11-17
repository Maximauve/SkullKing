import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import RoomLayout from 'components/layout/RoomLayout';
import CreateRoom from 'pages/CreateRoom';
import SocketLayout from 'components/layout/SocketLayout';
import RoomNotFound from 'pages/RoomNotFound';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404</div>
  },
  {
    path: '/room',
    element: <RoomLayout />,
    errorElement: <RoomNotFound />,
    children: [
      {
        path: '',
        element: <div>Room</div>
      },
      {
        path: ':id',
        element: <SocketLayout />
      },
      {
        path: 'create',
        element: <CreateRoom />
      }
    ]
  },
  {
    path: '/error',
    element: <RoomNotFound />
  }
]);

export default Router;
