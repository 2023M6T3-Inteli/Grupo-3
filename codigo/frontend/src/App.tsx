import React from "react";
import BottomNavbar from "./elements/BottomNavbar/BottomNavbar";
import GlobalStyles from "./styles/GlobalStyles";
import Tutorial from "./pages/Tutorial/Tutorial";
import styled from "styled-components";

const Content = styled.div`
  height: 100%;
  width: 100vw;
  
`;	

function App() {
  return (
    <>

      <GlobalStyles />

      <Tutorial/>


    </>
  );
}

export default App;
