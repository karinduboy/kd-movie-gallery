import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import './main.scss';

let router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App>
        <Home />
      </App>
    ),
  },
  {
    path: '/details/:id',
    element: (
      <App>
        <Details />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
