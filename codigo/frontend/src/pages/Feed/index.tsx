import React from 'react';

import { Container, Wrapper } from './style';
import FeedMain from './FeedMain/index';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';

const Feed: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        {/* <NavBar /> */}
        <FeedMain />
        {/* <SideBar></SideBar> */}
      </Wrapper>
      <BottomNavbar />
    </Container>
  );
}

export default Feed;