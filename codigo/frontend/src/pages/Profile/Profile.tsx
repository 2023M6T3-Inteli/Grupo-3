import {
  Container,
  ProfileInfo,
  BottonsProfile,
  Badges,
  Imagem,
} from "./style";
import {useState, useEffect, useContext, useCallback} from 'react';
import Button from "@mui/material/Button";
import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import HardWorker from "../../assets/HardWorker1.png";
import GroupBoy from "../../assets/GroupBoy.png";
import TeamWork from "../../assets/TeamWork.png";
import Complete10 from "../../assets/Complete10.png";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";
import HeaderApp from "../../components/HeaderApp";
import UserContext from "../../context/UserContext";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

//estilização do botão - também usamos material U.I. aqui

const StyledButton = styled(Button)`
  max-width: 400px;
  width: 80%;
`;

//estilização referente à imagem
const StyledImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  font-style: Roboto;

  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

//informações do perfil
const StyledProfileInfo = styled(ProfileInfo)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

//botões do perfil
const StyledBottonsProfile = styled(BottonsProfile)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 1rem;
`;

const StyleBadges = styled(Badges)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 0.2rem;
  font-style: Roboto;
`;

//estilização referente à imagem
const StyledHardworker = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${HardWorker});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

const StyledGroupBoy = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${GroupBoy});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

const StyledTeamWork = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${TeamWork});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

const StyledComplete10 = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${Complete10});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

const StyledAchievements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 1rem;
  font-style: Roboto;
`;

const StyledTitleAchievement = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
margin-bottom: 0.2rem;
font-style: Roboto;
`;

const Streak = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h3{
    span{
      color: #F98816;
    }
  }
`;

const LevelBar = styled.div`
  border: 1px solid #444444;
  height: 15px;
  width: 80%;
  border-radius: 20px;

  div{
    height: 100%;
    border-radius: 20px;
    background-color: #444444;
  }
`;

interface User {
  admin: boolean;
  username: string;
  name: string;
  location: string;
}

function Profile() {
  const [user,setUser]= useState<User[]>([])
  const { loggedInUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnClickAdmin = useCallback(
    () => navigate("/admin", { replace: true }),
    [navigate]
  );

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

  const levelPoints = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 190, 200];

  function getLevel(points: number): number {
    let level = 0;
    while (points > levelPoints[level + 1]) {
      level++;
    }
    return level;
  }

  function levelProgress(points: number): number {
    const currentLevel = getLevel(points);
    const teste = levelPoints[currentLevel + 1];
    const levelProgress = (points / teste) * 100;
    return levelProgress
  }

  const isAdm = user.admin;

  const adminButton = 
    <StyledButton onClick={handleOnClickAdmin} variant="contained" color="primary">
      {" "}
      Admin control{" "}
    </StyledButton>

  return (
    <Container>
      <HeaderApp />
      <StyledProfileInfo>
        <StyledImage>
          <img
            src={"https://github.com/" + user.username + ".png"}
            alt="profileImg"
          />
        </StyledImage>
        <p>{user.name}</p> {/* name */}
        <p>{user.username}</p>{" "}
        {/* role of the user */}
        <p>{user.location}</p> {/* local */}
      </StyledProfileInfo>

      <StyledBottonsProfile>
        <StyledButton variant="contained" color="primary">
          {" "}
          View Dell Curriculum{" "}
        </StyledButton>
        <br></br>
        <StyledButton variant="contained" color="primary">
          {" "}
          Call in Teams{" "}
        </StyledButton>
        <br></br>
        {isAdm ? adminButton : <></>}
      </StyledBottonsProfile>
      <StyleBadges>
        <h2>You`re level {getLevel(user.score)}</h2>
        <LevelBar>
          <div style={{width:`${levelProgress(user.score)}%`}}></div>
        </LevelBar>
        <br></br>
        <Streak>
          <h3>Current streak: </h3>
          <WhatshotIcon sx={{ color: '#F98816', marginLeft: '5px' }}></WhatshotIcon>
          <h3><span>{user.streak} days</span></h3>
      </Streak>
        <StyledTitleAchievement>
          <h5>Achievements</h5>
        </StyledTitleAchievement>
      </StyleBadges>
      <StyledAchievements>
        <div>
          <StyledHardworker></StyledHardworker>
          <StyledGroupBoy></StyledGroupBoy>
          <StyledTeamWork></StyledTeamWork>
          <StyledComplete10></StyledComplete10>
        </div>
      </StyledAchievements>
      <BottomNavbar />
      <GlobalStyles />
    </Container>
  );
}

export default Profile;

/////////////////
