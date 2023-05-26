import React from 'react';

import { Container, TopSide, BotSide  } from './style';

const SideBar: React.FC = () => {
  return (
    <Container>
      <TopSide>
        <h1>Ranking</h1>
      </TopSide>
      <BotSide>
        <a><p>Learn more about our scoring scheme</p></a>
      </BotSide>
    </Container>
  );
}

export default SideBar;