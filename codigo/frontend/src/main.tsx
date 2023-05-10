import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from './Pages/TelaDeLogin/LoginScreen'
import Feed from './pages/Feed/index';
import Ranking from './pages/Ranking/index';
import Login from './pages/Login/Login'; //09 de Maio de 2023

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
    path: "/ranking",
    element: <Ranking/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
