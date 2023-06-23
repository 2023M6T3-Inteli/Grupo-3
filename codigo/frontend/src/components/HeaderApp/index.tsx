import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { Intro, RightSide, LeftSide, RankingButton } from './style';

const HeaderApp: React.FC = () => {

  const navigate = useNavigate();
    const handleOnClickRanking = useCallback(
        () => navigate("/ranking", { replace: true }),
        [navigate]
    );
  return (
    <Intro>
      <RightSide>
        <h2>Welcome, Bruno!</h2>        
      </RightSide>
      <LeftSide>
        {/* <RankingButton onClick={handleOnClickRanking}>
          <EmojiEventsIcon style={{width: '30px', height:'30px', color:'#FCB818'}}/>
          <span>Ranking</span>
        </RankingButton> */}
        <img style={{width: 40, height: 40 , borderRadius: 20}}
          src="https://github.com/brun0meira.png"
          alt="profileImg"
        />
      </LeftSide>
      
    </Intro>
  );
}

export default HeaderApp;