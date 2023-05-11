import {
  Container,
  ProfileInfo,
  BottonsProfile,
  Badges,
  Imagem,
} from "./style";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Selena from "../../assets/Selena_Gomez_at_White_House.jpg";
import GlobalStyles from "../../styles/GlobalStyles";
import HardWorker from "../../assets/HardWorker1.png";
import GroupBoy from "../../assets/GroupBoy.png";
import TeamWork from "../../assets/TeamWork.png";
import Complete10 from "../../assets/Complete10.png";

//estilização do botão - também usamos material U.I. aqui
var StyledButton = styled(Button)`
  max-width: 400px;
  width: 80%;
  // border-radius: 50%;
`;

//estilização referente à imagem
var StyledImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url(${Selena});
  background-size: cover;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  font-style: Roboto;
  margin-top: 100px;
`;

//informações do perfil
var StyledProfileInfo = styled(ProfileInfo)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

//botões do perfil
var StyledBottonsProfile = styled(BottonsProfile)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 1rem;
`;

var StyleBadges = styled(Badges)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 0.2rem;
  font-style: Roboto;
`;

//estilização referente à imagem
var StyledHardworker = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${HardWorker});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

var StyledGroupBoy = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${GroupBoy});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

var StyledTeamWork = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${TeamWork});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

var StyledComplete10 = styled.img`
  width: 70px;
  height: 70px;
  background-image: url(${Complete10});
  justify-content: center;
  font-style: Roboto;
  border-radius: 50%;
  align-items: center;
`;

var StyledAchievements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 1rem;
  font-style: Roboto;
`;

var StyledTitleAchievement = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
margin-bottom: 0.2rem;
font-style: Roboto;
`;

function Profile() {
  return (
    <Container>
      <GlobalStyles />
      <StyledProfileInfo>
        <StyledImage></StyledImage>
        <h1>Selena Gomez</h1> {/* name */}
        <p>A singer that wanna be a front-end developer</p>{" "}
        {/* role of the user */}
        <p>São Paulo - SP</p> {/* local */}
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
      </StyledBottonsProfile>
      <StyleBadges>
        <h2>You`re level 10</h2>
        <br></br>
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
    </Container>
  );
}

export default Profile;

/////////////////
