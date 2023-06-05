import styled, { css } from 'styled-components';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

export const Container = styled.div`
  width: 20%;
  display: none;


  @media (min-width: 768px){
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: sticky;
    top: 0;
    left: 0;

    padding: 9px 19px 20px;

    max-height: 100vh;
    max-width: 100vh;
    overflow-y: auto;
  }
`;

export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1280px){
    align-items: flex-start;
  }
  
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg{
    width: 40px;
    height: 40px;
  }

  span{
    display: none;
  }

  @media (min-width: 1280px){

    svg{
      width: 30px;
      height: 30px;

    }

    span{
      display: inline;
      margin-left: 19px;

      font-size: 19px;
      
    }
    padding-right: 15px;

  }

  padding: 10px;
  outline: 0;
  color: #636363;

  & + button{
    margin-top: 5px;
  }

  cursor: pointer;
  border-radius: 25px;

  &:hover{
    background: none;
  }

  &:hover, &.active{
    color: #1976D2;
    fill: #1976D2;
  }
  
`;

export const BotSide = styled.div`
  
`;

const iconCSS = css`
  flex-shrink: 0;

  width: 40px;
  height: 40px;
  color: #636363;
`;

export const HomeIcon = styled(HomeOutlinedIcon)`
  ${iconCSS}
`;
export const BellIcon = styled(NotificationsOutlinedIcon)`
  ${iconCSS}
`;
export const AddIcon = styled(AddCircleOutlinedIcon)`
  ${iconCSS}
`;
export const FavoriteIcon = styled(BookmarkBorderOutlinedIcon)`
  ${iconCSS}
`;
export const ProfileIcon = styled(Person2OutlinedIcon)`
  ${iconCSS}
`;
