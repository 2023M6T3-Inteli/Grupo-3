import React from 'react';
import { Container, Header, Intro, Trends, Trending, Cards, Feed, Card, CardIntro, CardProfile, CardContent, PostTags, CardFootbar, PostInteraction, NotInterested } from './style';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoIcon from '@mui/icons-material/Info';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const FeedMain: React.FC = () => {
  return(
    <Container>
      <Header>
        <Intro>
          <h1>Welcome, Joana!</h1>
          <img></img>
        </Intro>
        <input></input>
      </Header>
      <Trends>
        <Trending>
          <StarOutlineIcon />
          <h2>Trending in frontend</h2>
          <InfoIcon />
        </Trending>
        <Cards>
          <img></img>
          <img></img>
          <img></img>
        </Cards>
      </Trends>
      <Feed>
        <Card>
          <CardIntro>
            <img></img>
            <CardProfile>
              <h3>Joana Dadell</h3>
              <h4>30 Minutes ago</h4>
            </CardProfile>
            <MoreHorizIcon />
          </CardIntro>
          <CardContent>
            <h2>Server-side Rendering in React</h2>
            <img></img>
            <PostTags>
              <span>#python</span>
              <span>#javascript</span>
              <span>#c++</span>
            </PostTags>
            <CardFootbar>
              <PostInteraction>
                <FavoriteIcon />
                <p>17 Likes</p>
                <ChatBubbleOutlineIcon />
                <p>32 Comments</p>
              </PostInteraction>
              <NotInterested>
                <p>Not interested</p>
                <SentimentVeryDissatisfiedIcon />
              </NotInterested>
            </CardFootbar>
          </CardContent>
        </Card>
      </Feed>
    </Container>
  );
}

export default FeedMain;