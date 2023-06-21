import React from "react";
import { TextField, Grid } from '@mui/material';
import GlobalStyles from "../../../styles/GlobalStyles";
import styled from "styled-components";


const User: React.FC = () => {

    const Bals = styled.div`
   background: #D9D9D9;
   height: 12px;
   width:12px;
   border-radius:6px;
   margin:2px;
  `;

    const Balls = styled.div`
   background: #4D4D4D;
   height: 12px;
   width:12px;
   border-radius:6px;
   margin:2px;
  `;

    const Container = styled.div`
    display: flex;
    justify-content: center;
  `;

    const Titulo = styled.p`
   font-size: 32px;
   font-weight:bold;
  `;

    const SubTitulo = styled.p`
   font-size: 14px;
  `;

    const Avatar = styled.div`
    background: #D9D9D9;
   height: 100px;
   width:100px;
   border-radius:50px;
   `;

   const ContainerButton =styled.div`
   display: flex; 
   height: 40 px;
   width: 347 px;
   backgroundColor: #0672CB;
   justifyContent: center; 
   `;

    return (
        <Container>
            <Grid container spacing={1}>

                <Grid item xs={12}>
                    <Container>
                        <Bals />
                        <Balls/>
                        <Bals />
                    </Container>

                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <Titulo>Build your profile</Titulo>
                    </Container>

                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <SubTitulo style={{width:347}}>Tell us a little bit about yourself — this is how others will see you on Learn Link. You’ll always be able to edit this later in your Settings.</SubTitulo>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <Avatar />
                    </Container>

                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <SubTitulo>youruser</SubTitulo>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <TextField id="outlined-basic" label="User" variant="outlined" sx={{ width: 347 }} />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <TextField id="outlined-basic" label="Bio" variant="outlined" multiline rows={2} sx={{ width: 347 }} />
                    </Container>
                    
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <SubTitulo>Work</SubTitulo>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <TextField id="outlined-basic" label="What do you do?" variant="outlined" sx={{ width: 347 }} />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <SubTitulo>Skills</SubTitulo>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <TextField id="outlined-basic" label="What are your skills?" variant="outlined" sx={{ width: 347 }} />
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                            <div style={{ display: 'flex', height: 40, width: 347, backgroundColor: "#0672CB", justifyContent: 'center' }}>
                                <button type='submit' style={{ color: 'white' }}>NEXT</button>
                            </div>
                    </Container>
                </Grid>
            </Grid>
            <GlobalStyles />
        </Container>
    )
}

export default User;