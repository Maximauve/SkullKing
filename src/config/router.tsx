import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import RoomLayout from 'components/layout/RoomLayout';
import Room from 'pages/Room';
import CreateRoom from 'pages/CreateRoom';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404</div>
  },
  {
    path: '/room',
    element: <RoomLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '',
        element: <div>Room</div>
      },
      {
        path: ':id',
        element: <Room />
      },
      {
        path: 'create',
        element: <CreateRoom />
      }
    ]
  }
]);

export default Router;
