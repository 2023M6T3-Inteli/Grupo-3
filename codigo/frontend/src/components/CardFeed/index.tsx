import React, { useState } from 'react';
import { Container, Card, CardIntro, OwnerPost , CardProfile, CardContent, ImgContainer, PostTags, CardFootbar, PostInteraction, NotInterested } from './style';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import next from '../../assets/next.webp';
import nodejs from '../../assets/nodejs.png';

const Posts = [
  { id: 0, ownerPhoto: 'brun0meira',  owner: 'Bruno Meira', timestamp: '2023-05-10 14:54', tittlePost: 'Server-Side Rendering in React', PostImage: 'Null', postDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque, mi et interdum pellentesque, velit purus sollicitudin enim, a tristique enim nibh luctus tortor. Integer eleifend pretium massa, quis sollicitudin tortor dictum nec.", postsTags: ['NextJS', 'Front-end', 'SSR'], likes: 23, comments: 30},
  { id: 1, ownerPhoto: 'Ra2861',  owner: 'Raissa Sabino', timestamp: '2023-05-10 14:54', tittlePost: 'Basic concepts of react + next', PostImage: next, postDescription: 'tt', postsTags: ['React', 'NextJS', 'Front-end'], likes: 56, comments: 70},
  { id: 2, ownerPhoto: 'gabreurt',  owner: 'Gabriel Rios', timestamp: '2023-05-10 14:54', tittlePost: 'Building an AWS Well-Architected', PostImage: 'Null', postDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque, mi et interdum pellentesque, velit purus sollicitudin enim, a tristique enim nibh luctus tortor. Integer eleifend pretium massa.", postsTags: ['AWS', 'DevOps', 'Architecture'], likes: 74, comments: 10},
  { id: 3, ownerPhoto: 'Livia-Coutinho',  owner: 'Livia Coutinho', timestamp: '2023-05-10 14:54', tittlePost: 'Node.js: Starting from theory to practice', PostImage: nodejs, postDescription: 'tt', postsTags: ['NodeJS', 'Express', 'Back-end'], likes: 16, comments: 24},
]

const CardFeed: React.FC = () => {
  const textCard = Posts.map((post) => {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLiked = () => {
      setIsLiked(!isLiked);
    };

    const myText = post.postDescription;
    function textLimit(text: string, limit: number) {
      if (text.length <= limit) {
        return text;
      }

      return <p>{text.slice(0, limit)}<span style={{color: '#0561FC'}}>...See more</span></p>;
    }

    const new_arr = post.postsTags;
    function returnTags() {
      return new_arr.map((element, i) => (
        <span key={i}>#{element}</span>
      ));
    }

    const imgOrText = () => {
      if (post.PostImage != 'Null') {
        return <ImgContainer>
        <img
          src={post.PostImage}
          alt="postImg"
        />
      </ImgContainer>;
      } else {
        return <p>{textLimit(myText, 245)}</p>;
      }
    }

    return (
      <Card>
        <CardIntro>
          <OwnerPost>
            <img style={{width: 40, height: 40 , borderRadius: 20, marginRight:'10px' }}
              src={"https://github.com/" + post.ownerPhoto + ".png"}
              alt="profileImg"
            />
            <CardProfile>
              <p><span>{post.owner}</span></p>
              <p>{post.timestamp}</p>
            </CardProfile>
          </OwnerPost>
          <MoreHorizIcon sx={{ color: '#8F8F8F'}} />
        </CardIntro>
        <CardContent>
          <h3>{post.tittlePost}</h3>
          {imgOrText()}
          <PostTags>
            {returnTags()}
          </PostTags>
          <CardFootbar>
            <PostInteraction>
              <button onClick={toggleLiked}>
                {isLiked ? <FavoriteOutlinedIcon sx={{ color: '#FB3542'}} /> : <FavoriteBorderOutlinedIcon />}
              </button>
              <p>{post.likes} Likes</p>
              <ChatBubbleOutlineIcon />
              <p>{post.comments} Comments</p>
            </PostInteraction>
            <NotInterested>
              <p>Not interested</p>
            </NotInterested>
          </CardFootbar>
        </CardContent>
      </Card>
    );
  });
  
  return (
    <Container>
      {textCard}
    </Container>
  );
}

export default CardFeed;