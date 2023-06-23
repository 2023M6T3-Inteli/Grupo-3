import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Tutorial from "./pages/Tutorial/Tutorial";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Feed from './pages/Feed/index';
import Login from './pages/Login/Login'; //09 de Maio de 2023
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import Ranking from './pages/Ranking/index';
import Saved from './pages/Saved';
import PostContent from './pages/PostContent/PostContent';
import Account from './pages/Account/Tags';
import User from "./pages/Account/User";
import Terms from "./pages/Account/Terms";
import DetailsCard from "./modal/DetailsCard";
import Admin from "./pages/Admin";
import Users from "./pages/Users";

const Content = styled.div`
  height: 100%;
  width: 100vw;
  
`;	
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tutorial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/favorites" element={<Saved />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Account/User" element={<User />} />
        <Route path="/Account/User/terms" element={<Terms/>} />
        <Route path="/acc" element={<App />} />
        <Route path="/createpost" element={<PostContent />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <GlobalStyles />
      <DetailsCard></DetailsCard>
    </>
  );
}

export default App;
