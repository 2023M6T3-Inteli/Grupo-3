import React from "react";
import {  useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid } from '@mui/material';
import GlobalStyles from "../../../styles/GlobalStyles";
import { Container,Balls,SubTitulo,Bals,Titulo } from "../Tags/styles";
import { Avatar } from "./styles";

const User: React.FC = () => {

    const navigate = useNavigate();

    const handleOnClickTerms = useCallback(
        () => navigate("/Account/User/Terms", { replace: true }),
        [navigate]
    );

    return (
        <Container>
            <Grid container spacing={1}>

                <Grid item xs={12}>
                    <Container>
                        <Bals />
                        <Balls />
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
                        <SubTitulo style={{ width: 347 }}>Tell us a little bit about yourself — this is how others will see you on Learn Link. You’ll always be able to edit this later in your Settings.</SubTitulo>
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

                    <form action="" method="POST">
                        <Grid container spacing={1}>
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
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ display: 'flex', height: 40, width: 347, backgroundColor: "#0672CB", justifyContent: 'center' }}>
                                        <button type='submit' onClick={handleOnClickTerms} style={{ color: 'white' }}>NEXT</button>
                                    </div>
                                </div>
                        </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <GlobalStyles />
        </Container>
    )
}

export default User;