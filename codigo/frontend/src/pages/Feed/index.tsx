import React from 'react';

import { Container, Wrapper } from './style';
import FeedMain from './FeedMain/index';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import GlobalStyles from '../../styles/GlobalStyles';
import MenuBar from './MenuBar/index';
import SideBar from './SideBar';

const Feed: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <MenuBar />
        <FeedMain />
        <SideBar />
      </Wrapper>
      <BottomNavbar />
      <GlobalStyles />
    </Container>
  );
}

export default Feed;