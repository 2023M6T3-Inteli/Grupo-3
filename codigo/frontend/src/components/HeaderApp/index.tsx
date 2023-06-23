import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import userService from '../../services/userService';
import UserContext from '../../context/UserContext';
import CloseIcon from '@mui/icons-material/Close';

import { Intro, RightSide, LeftSide, RankingButton, Options } from './style';

const HeaderApp: React.FC = () => {
  const [user,setUser]= useState<string[]>([])
  const { loggedInUserId } = useContext(UserContext);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGet = await userService.getUserById(loggedInUserId);
        setUser(responseGet.data);
      } catch (err) {
        console.error('Error in GET request:', err);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
    const handleOnClickRanking = useCallback(
        () => navigate("/ranking", { replace: true }),
        [navigate]
    );

  const handleButtonClick = () => {
    setShowActions(!showActions);
  };

  const logout = async () => {
    try {
      const responseGet = await userService.logout(loggedInUserId);
      console.log(responseGet.data);
      navigate("/login", { replace: true })
    } catch (err) {
      console.error('Error in POST request:', err);
    }
  };

  const profileOptions = 
  <Options>
    <div style={{justifyContent:'flex-end', width:'100%', height:'fit-content'}} onClick={handleButtonClick}>
      <CloseIcon sx={{ color: 'black', width: '20px', height: '20px' }}></CloseIcon>
    </div>
    <div>
      <button onClick={logout}><p>Sair</p></button>
    </div>
  </Options>

  return (
    <Intro>
      <RightSide>
        <h2>Welcome, {user.name}</h2>        
      </RightSide>
      <LeftSide>
        <RankingButton onClick={handleOnClickRanking}>
          <EmojiEventsIcon style={{width: '30px', height:'30px', color:'#FCB818'}}/>
          <span>Ranking</span>
        </RankingButton>
        <img onClick={handleButtonClick} style={{width: 40, height: 40 , borderRadius: 20}}
          src={"https://github.com/" + user.username + ".png"}
          alt="profileImg"
        />
        {showActions ? profileOptions : <></>}
      </LeftSide>
      
    </Intro>
  );
}

export default HeaderApp;