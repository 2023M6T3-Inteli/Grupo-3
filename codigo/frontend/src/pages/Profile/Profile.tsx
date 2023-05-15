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
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";
import HeaderApp from "../../components/HeaderApp";

//estilização do botão - também usamos material U.I. aqui

const StyledButton = styled(Button)`
  max-width: 400px;
  width: 80%;
  // border-radius: 50%;
`;

//estilização referente à imagem
const StyledImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url('https://github.com/brun0meira.png');
  background-size: cover;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  font-style: Roboto;
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

function Profile() {
  return (
    <Container>
      <HeaderApp />
      <StyledProfileInfo>
        <StyledImage></StyledImage>
        <h1>Bruno Meira</h1> {/* name */}
        <p>A Swifter fan that wanna be a front-end developer</p>{" "}
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
      <BottomNavbar />
      <GlobalStyles />
    </Container>
  );
}

export default Profile;

/////////////////
