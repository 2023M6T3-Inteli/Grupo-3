// import {  Container,  ProfileInfo,  BottonsProfile,  Badges,  Imagem,} from "./style";
// import Button from "@mui/material/Button";
// import styled from "styled-components";
// import Selena from "../../assets/Selena_Gomez_at_White_House.jpg";
// import { Box } from "@mui/material";

// var StyledButton = styled(Button)`
//   max-width: 400px;
//   width: 100%;
//   // border-radius: 50%;
// `;

// var StyledImage = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-image: url(${Selena});
//   background-size: cover;
//   justify-content: center;
//   margin-left: auto;
//   margin-right: auto;
// `;

// // var ImagemFrufru = styled.img`
// //   width: 100%;
// //   heigth: 100%;
// // `;

// function Profile() {
//   return (
//     <Container>
//       <ProfileInfo>
//         <StyledImage></StyledImage>
//         <h1>Clara Alemão</h1> {/* name */}
//         <p>Front-end developer</p> {/* role of the user */}
//         <p>São Paulo - SP</p> {/* local */}
//       </ProfileInfo>
//       <BottonsProfile>
//         <StyledButton variant="contained" color="primary">
//           {" "}
//           View Dell Curriculum{" "}
//         </StyledButton>
//         <br></br>
//         <br></br>

//         <StyledButton variant="contained" color="primary">
//           {" "}
//           Call in Teams{" "}
//         </StyledButton>
//       </BottonsProfile>
//       <Badges>
//         <h4>You`re level 10</h4>
//         <div>
//           <div id="blue background"></div>
//           <div id="gray blackground"></div>
//           <h6>Achievements</h6>
//           <div>
//             <img></img>
//             <img></img>
//             <img></img>
//             <img></img>
//           </div>
//         </div>
//       </Badges>
//     </Container>
//   );
// }

// export default Profile;

////////////////////////////
//////////////////////////
// MANTIVE ACIMA O CÓDIGO ORIGINAL DO GABRIEL //
///////////////////////////////
/////////////////////////////////


import {Container,ProfileInfo,BottonsProfile,Badges,Imagem, } from "./style";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Selena from "../../assets/Selena_Gomez_at_White_House.jpg";
import { Box } from "@mui/material";

//estilização do botão - também usamos material U.I. aqui
var StyledButton = styled(Button)`
  max-width: 400px;
  width: 100%;
  // border-radius: 50%;
`;

//estilização referente à imagem
var StyledImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${Selena});
  background-size: cover;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
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

function Profile() {
  return (
    <Container>
      <StyledProfileInfo>
        <StyledImage></StyledImage>
        <h1>Selena Gomez</h1> {/* name */}
        <p>A singer that wanna be a front-end developer</p> {/* role of the user */}
        <p>São Paulo - SP</p> {/* local */}
      </StyledProfileInfo>

      <StyledBottonsProfile>
        <StyledButton variant="contained" color="primary">
          {" "}
          View Dell Curriculum{" "}
        </StyledButton>
        <br></br>
        <br></br>

        <StyledButton variant="contained" color="primary">
          {" "}
          Call in Teams{" "}
        </StyledButton>
      </StyledBottonsProfile>

      <Badges>
        <div>
          <h4>You`re level 10</h4>
          <div>
            {/* <div id="blue background"></div>
            <div id="gray blackground"></div> */}
            <h6>Achievements</h6>
            {/* <div>
              <img></img>
              <img></img>
              <img></img>
              <img></img>
            </div> */}
          </div>
        </div>
      </Badges>
    </Container>
  );
}

export default Profile;

/////////////////
