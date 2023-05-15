import React from 'react';

import { Container, TopSide, BotSide  } from './style';
import Ranking from '../../Ranking';

const SideBar: React.FC = () => {
  return (
    <Container>
      <TopSide>
        <h1>Ranking</h1>
        <Ranking></Ranking>
      </TopSide>
      <BotSide>
        <a><p>Learn more about our scoring scheme</p></a>
      </BotSide>
    </Container>
  );
}

export default SideBar;