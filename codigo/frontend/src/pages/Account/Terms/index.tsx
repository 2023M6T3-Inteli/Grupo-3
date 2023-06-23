import React from "react";
import GlobalStyles from "../../../styles/GlobalStyles";
import { Container, Balls, Bals,SubTitulo,Titulo } from "../Tags/styles";
import {Grid} from "@mui/material"
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


const Terms: React.FC = ()=>{
    const navigate = useNavigate();

    const handleOnClickFeed = useCallback(
        () => navigate("/feed", { replace: true }),
        [navigate]
    );

 

    return (
        <Container>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Container>
                        <Bals />
                        <Bals />
                        <Balls />
                    </Container>

                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <Titulo>You’re almost there!</Titulo>
                    </Container>

                </Grid>

                <Grid item xs={12}>
                    <Container>
                        <SubTitulo style={{ width: 347 }}>You will need to accept the terms of use in order to proceed to the platform</SubTitulo>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container style={{marginTop:30}}>
                        <input type='checkbox' value={'Accept terms'}></input>
                        <p style={{ color: "black", padding: "2px" }}>I Agree to Terms and Conditions.</p>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                        <div style={{ display: 'flex', height: 40, width: 347,marginTop:427, backgroundColor: "#0672CB", justifyContent: 'center' }}>
                            <button onClick={handleOnClickFeed} type='submit' style={{ color: 'white' }}>Done</button>
                        </div>
                    </Container>
                </Grid>
            </Grid>
            <GlobalStyles />
        </Container>
    );
}

export default Terms;