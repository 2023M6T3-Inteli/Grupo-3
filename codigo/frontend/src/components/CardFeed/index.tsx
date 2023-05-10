import React, { useState } from 'react';
import { Container, Card, CardIntro, OwnerPost , CardProfile, CardContent, ImgContainer, PostTags, CardFootbar, PostInteraction, NotInterested } from './style';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import next from '../../assets/next.webp';

type Props = {
  icon1: IconType;
  icon2: IconType;
  onClick: () => void;
};

const CardFeed: React.FC = () => {

  const [isIcon1, setIsIcon1] = useState(true);

  const handleOnClick = () => {
    setIsIcon1(!isIcon1);
    onClick();
  };
  
  return (
    <Container>
      <Card>
        <CardIntro>
          <OwnerPost>
            <img style={{width: 40, height: 40 , 'border-radius': 20, 'margin-right': '10px' }}
              src="https://github.com/brun0meira.png"
              alt="profileImg"
            />
            <CardProfile>
              <p>Bruno Meira</p>
              <p>30 Minutes ago</p>
            </CardProfile>
          </OwnerPost>
          <MoreHorizIcon sx={{ color: '#8F8F8F'}} />
        </CardIntro>
        <CardContent>
          <h2>Server-side Rendering in React</h2>
          <ImgContainer>
            <img
              src={next}
              alt="profileImg"
            />
          </ImgContainer>
          <PostTags>
            <span>#python</span>
            <span>#javascript</span>
            <span>#c++</span>
          </PostTags>
          <CardFootbar>
            <PostInteraction>
              <FavoriteBorderOutlinedIcon sx={{ color: '#8F8F8F'}} />
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
    </Container>
  );
}

export default CardFeed;