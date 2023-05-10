import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from './Pages/TelaDeLogin/LoginScreen'
import Feed from './pages/Feed/index';
import Ranking from './pages/Ranking/index';
import Saved from './pages/Saved';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <App />,
  },

  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/ranking",
    element: <Ranking/>
  },
  {
    path: "/saved",
    element:<Saved/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
