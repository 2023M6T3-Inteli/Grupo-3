import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from './Pages/TelaDeLogin/LoginScreen'
import Feed from './pages/Feed/index';
import Profile from './pages/Profile/Profile';
import Ranking from './pages/Ranking/index';
import Login from './pages/Login/Login'; //09 de Maio de 2023
import Notifications from './pages/Notifications/Notifications';
import Saved from './pages/Saved';
import Account from './pages/Account';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/ranking",
    element: <Ranking/>,
  },
  {
    path: "/favorites",
    element: <Saved/>,
  },
  {
    path: "/notification",
    element: <Notifications/>,
  },
  {
    path: "/acc",
    element: <App />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
