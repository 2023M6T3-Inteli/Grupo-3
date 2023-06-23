import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, TopSide, MenuButton, HomeIcon, BellIcon, AddIcon, FavoriteIcon, ProfileIcon, BotSide} from './style';
import LogoEs from '../../../assets/LogoEs.png';

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const handleOnClickHome = useCallback(
    () => navigate("/feed", { replace: true }),
    [navigate]
  );
  const handleOnClickNotification = useCallback(
    () => navigate("/notification", { replace: true }),
    [navigate]
  );
  const handleOnClickAdd = useCallback(
    () => navigate("/createpost", { replace: true }),
    [navigate]
  );
  const handleOnClickSaved = useCallback(
    () => navigate("/favorites", { replace: true }),
    [navigate]
  );
  const handleOnClickProfile = useCallback(
    () => navigate("/profile", { replace: true }),
    [navigate]
  );

  return (
    <Container>
      <TopSide>
        <img src={LogoEs} style={{width: '100%', margin: '0 0 20px 0', borderRadius:'5px'}} alt="" />
        <MenuButton onClick={handleOnClickHome}>
          <HomeIcon />
          <span>Home</span>
        </MenuButton>
        <MenuButton onClick={handleOnClickNotification}>
          <BellIcon />
          <span>Notifications</span>
        </MenuButton>
        <MenuButton onClick={handleOnClickAdd}>
          <AddIcon />
          <span>Add Post</span> 
        </MenuButton>
        <MenuButton onClick={handleOnClickSaved}>
          <FavoriteIcon />
          <span>Favorites</span>
        </MenuButton>
        <MenuButton onClick={handleOnClickProfile}>
          <ProfileIcon />
          <span>Profile</span>
        </MenuButton>
      </TopSide>
      <BotSide>
        <p>© 2023 LearnLink from Dell Technologies</p>
      </BotSide>
    </Container>
  );
}

export default MenuBar;