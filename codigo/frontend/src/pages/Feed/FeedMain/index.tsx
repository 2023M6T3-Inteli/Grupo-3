import React from 'react';
import { Container, Header, Trends, Trending, ForYou, Feed,} from './style';
import SearchBox from '../../../components/SearchBox';
import HeaderApp from '../../../components/HeaderApp';
import CardFeed from '../../../components/CardFeed/index';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RecommendIcon from '@mui/icons-material/Recommend';
import CircleIcon from '@mui/icons-material/Circle';

const FeedMain: React.FC = () => {
  return(
    <Container>
      <Header>
        <HeaderApp />
        <SearchBox />
      </Header>
      <Trends>
        <Trending>
          <div>
            <RecommendIcon sx={{ color: '#0561FC', 'margin-right': '5px', width: '18px', height: '18px' }} />
            <h2>You might like</h2>
            <InfoOutlinedIcon sx={{ color: '#000000', 'margin-left': '5px', width: '18px', height: '18px' }} />
          </div>
          <p>See More</p>
        </Trending>
        <ForYou>
          <div>
            <p>Front-end <CircleIcon sx={{ color: '#555555', width: '4px', height: '4px', 'margin': '0 0 2px 0'}} /> <span>For you</span></p>
            <h4>#Angular</h4>
            <span>200 Posts</span>
          </div>
          <div>
          <p>Back-end <CircleIcon sx={{ color: '#555555', width: '4px', height: '4px', 'margin': '0 0 2px 0'}} /> <span>For you</span></p>
            <h4>#NestJS</h4>
            <span>100 Posts</span>
          </div>
        </ForYou>
      </Trends>
      <Feed>
        <CardFeed/>
      </Feed>
    </Container>
  );
}

export default FeedMain;