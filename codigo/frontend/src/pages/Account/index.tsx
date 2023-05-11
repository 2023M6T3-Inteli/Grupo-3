import React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GlobalStyles from '../../styles/GlobalStyles';
import NavBar from '../../components/NavBar';
import BottonAccount from '../../components/BottonAccount';
import CardAccount from '../../components/CardAccount';

// import { Container } from './styles';

const Account: React.FC = () => {
    return (<Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <div style={{display:"flex", justifyContent:"center", width:291, height:76, marginLeft:20}}>
                    <h2 style={{fontSize:32, color:"black"}}>Tell us what you´re interested in</h2>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center", margin:20 }}>
                    <p style={{fontSize:"14"}}>
                        In order to recommend the most intrnguing content for you, we will ask some questions to get to know you better
                    </p>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <NavBar/>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection:"row", flexWrap:"wrap"}}>
                    {/*<CardAccount/>*/}
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{color:"white"}}>Front-end <br />developing</p>
                    </Paper>
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{ color: "white" }}>Ux</p>
                    </Paper>
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{ color: "white" }}>Back-end<br />developing</p>
                    </Paper>
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{ color: "white" }}>Machine learning/<br />AI</p>
                    </Paper>
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{ color: "white" }}>Cyber Security</p> 
                    </Paper>
                    <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0 }} >
                        <p style={{ color: "white" }}>Testing</p>
                    </Paper>
                </div>
               
            </Grid>

            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <BottonAccount />
                </div>
                
            </Grid>

        </Grid>

        <GlobalStyles />
    </Box>
    );
}

export default Account;