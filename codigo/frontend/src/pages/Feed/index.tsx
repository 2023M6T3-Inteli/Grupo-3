import React from 'react';

import { Container, Wrapper } from './style';
import FeedMain from './FeedMain/index';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import GlobalStyles from '../../styles/GlobalStyles';

const Feed: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        {/* <NavBar /> */}
        <FeedMain />
        {/* <SideBar></SideBar> */}
      </Wrapper>
      <BottomNavbar />
      <GlobalStyles />
    </Container>
  );
}

export default Feed;