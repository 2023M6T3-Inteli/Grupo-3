import React, { useState, useEffect , useContext } from 'react';
import { Container, Header, Trends, Trending, ForYou, Feed } from './style';
import SearchBox from '../../../components/SearchBox';
import HeaderApp from '../../../components/HeaderApp';
import CardFeed from '../../../components/CardFeed/index';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RecommendIcon from '@mui/icons-material/Recommend';
import CircleIcon from '@mui/icons-material/Circle';
import AuthContext from '../../../context/AuthContext';
import UserContext from '../../../context/UserContext';
import contentService from '../../../services/contentService';


const FeedMain: React.FC = () => {
  const { loggedInUserId } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [posts,setPosts]= useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseGet = await contentService.getContent();
        setPosts(responseGet.data);
      } catch (err) {
        console.error('Error in GET request:', err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleLike = async (post: Post) => {
    try {
      const responsePost = await contentService.incrementLike(post.id, loggedInUserId);
      console.log(responsePost.data);
    } catch (err) {
      console.error('Error in POST request:', err);
    }
  };

  if (!isAuthenticated) {
    return <div>não autorizado...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  return(
    <Container>
      <Header>
        <HeaderApp />
        <SearchBox />
      </Header>
      <Trends>
        <Trending>
          <div>
            <RecommendIcon sx={{ color: '#0672CB', marginRight: '5px', width: '18px', height: '18px' }} />
            <h2>You might like</h2>
            <InfoOutlinedIcon sx={{ color: '#000000', marginLeft: '5px', width: '18px', height: '18px' }} />
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
        {
          posts.map((post: any) => {
            return <CardFeed card={post} onLike={handleLike} currentUserId={loggedInUserId}/>;
          })
        }
      </Feed>
    </Container>
  );
}

export default FeedMain;