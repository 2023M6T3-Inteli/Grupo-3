import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, CardIntro, OwnerPost, ButtonTeste , CardProfile, CardContent, ImgContainer, PostTags, CardFootbar, PostInteraction, NotInterested } from './style';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CardModal from '../../context/CardModal';
import moment from 'moment';
moment.locale('pt-br');
const now = moment();

interface CardProps {
  card: Card;
  onLike: (post: Post) => void;
  currentUserId: string;
}

const CardFeed: React.FC<CardProps> = ({ card, onLike, currentUserId }) => {
  const postUser = card.userPost[0];
  const createdAtMoment = moment(card.createdAt);
  const diffMinutes = now.diff(createdAtMoment, 'minutes');
  const [isLiked, setIsLiked] = useState(card.likes.some((like) => (like.user)["id"] === currentUserId));
  const modalCtx = useContext(CardModal);

  const minutesAgo = () => {
    if (diffMinutes < 5) {
      return <p>Rigth now</p>;
    } else if (diffMinutes < 60) {
      return <p>{diffMinutes + " minutes ago"}</p>;
    } else if (diffMinutes < 1440) {
      return <p>{Math.floor(diffMinutes / 60) + " hours ago"}</p>;
    } else {
      return <p>{Math.floor(diffMinutes / 1440) + " days ago"}</p>;
    }
  }

  const moreDetails = () => {
    let datetime = ""
    if (diffMinutes < 5) {
      datetime = "Rigth now";
    } else if (diffMinutes < 60) {
      datetime = diffMinutes + " minutes ago";
    } else if (diffMinutes < 1440) {
      datetime = Math.floor(diffMinutes / 60) + " hours ago";
    } else {
      datetime = Math.floor(diffMinutes / 1440) + " days ago";
    }

    const params = {
      id: card.id,
      title: card.title,
      description: card.description,
      likes: card._count["likes"],
      OwnerPost: postUser.user["name"],
      Username: postUser.user["username"],
      timeStamp: datetime,
    };
    modalCtx.setShowModal(params);
  };

  
  // Função de dar like
  const toggleLiked = () => {
    setIsLiked(!isLiked);
    onLike(card);
  };

  //Função que é exibe a descrição do post e mostra até número limitado de caracteres
  const myText = card.description;
  function textLimit(text: string, limit: number) {
    if (text.length <= limit) {
      return text;
    }
  }

  const new_arr = card.tags;
  function returnTags() {
    return new_arr.map((element: any) => (
      <span>#{element.subject}</span>
    ));
  }

  // Função que verifica se existe uma imagem no post, se exister exibe ela, se não existir chama a função da descrição
  const imgOrText = () => {
    if (card.image != "image.jpeg" && card.image != "gabriela.jpeg" && card.image != "") {
      return <ImgContainer>
        <img
          src={card.image}
          alt="postImg"
        />
      </ImgContainer>;
    } else {
      return <p>{textLimit(myText, 245)}</p>;
    }
  }

  return(
    <Card onClick={moreDetails} key={card.id}>
      <CardIntro>
        <OwnerPost>
          <img style={{width: 40, height: 40 , borderRadius: 20, marginRight:'10px' }}
            src={"https://github.com/" + "brun0meira" + ".png"}
            alt="profileImg"
          />
          <CardProfile>
            <p><span>{postUser.user["username"]}</span></p>
            {minutesAgo()}
          </CardProfile>
        </OwnerPost>
        <MoreHorizIcon sx={{ color: '#8F8F8F'}} />
      </CardIntro>
      <CardContent>
        <h2>{card.title}</h2>
        {imgOrText()}
        <PostTags>
          {returnTags()}
        </PostTags>
        <CardFootbar>
          <PostInteraction>
            <button onClick={toggleLiked}>
              {isLiked ? <FavoriteOutlinedIcon sx={{ color: '#FB3542'}} /> : <FavoriteBorderOutlinedIcon />}
            </button>
            <p>{card._count["likes"]} Likes</p>
            <ChatBubbleOutlineIcon />
            <p>{card._count["comments"]} Comments</p>
          </PostInteraction>
          <NotInterested>
            <p>Not interested</p>
          </NotInterested>
        </CardFootbar>
      </CardContent>
    </Card>
  )
}

export default CardFeed;