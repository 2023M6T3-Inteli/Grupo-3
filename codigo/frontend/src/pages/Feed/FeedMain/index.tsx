import React from 'react';
import { Container, Header, Intro, FormSearch , Input , Trends, Trending, Cards, Feed,} from './style';
import CardFeed from '../../../components/CardFeed/index';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';

const FeedMain: React.FC = () => {
  return(
    <Container>
      <Header>
        <Intro>
          <h1>Welcome, Bruno!</h1>
          <img style={{width: 40, height: 40 , 'border-radius': 20}}
            src="https://github.com/brun0meira.png"
            alt="profileImg"
          />
        </Intro>
        <FormSearch>
          <SearchIcon sx={{ color: '#0561FC', 'margin-right': '5px' }} />
          <Input placeholder="Seach in dell contents" type="text" />
        </FormSearch>
      </Header>
      <Trends>
        <Trending>
          <StarBorderIcon sx={{ color: '#0561FC', 'margin-right': '5px', width: '18px', height: '18px' }} />
          <h2>Trending in frontend</h2>
          <InfoOutlinedIcon sx={{ color: '#000000', 'margin-left': '5px', width: '18px', height: '18px' }} />
        </Trending>
        <Cards>
          <img></img>
          <img></img>
          <img></img>
        </Cards>
      </Trends>
      <Feed>
        <CardFeed/>
      </Feed>
    </Container>
  );
}

export default FeedMain;