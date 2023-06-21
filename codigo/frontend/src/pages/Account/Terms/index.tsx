import React from "react";
import GlobalStyles from "../../../styles/GlobalStyles";
import styled from "styled-components";
import {Grid, TextField} from "@mui/material"


const Terms: React.FC = ()=>{

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

    const ContainerButton = styled.div`
   display: flex; 
   height: 40 px;
   width: 347 px;
   backgroundColor: #0672CB;
   justifyContent: center; 
   `;

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
                            <button type='submit' style={{ color: 'white' }}>Done</button>
                        </div>
                    </Container>
                </Grid>
            </Grid>
            <GlobalStyles />
        </Container>
    );
}

export default Terms;