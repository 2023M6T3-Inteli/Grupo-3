import React from 'react';

import { Container, Wrapper } from './style';
import FeedMain from './FeedMain/index';

const Feed: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        {/* <NavBar /> */}
        <FeedMain />
        {/* <SideBar></SideBar> */}
      </Wrapper>
    </Container>
  );
}

export default Feed;