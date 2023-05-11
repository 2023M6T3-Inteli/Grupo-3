import React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GlobalStyles from '../../styles/GlobalStyles';
import NavBar from '../../components/NavBar';

// import { Container } from './styles';

const Account: React.FC = () => {
    return (<Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h2>Tell us what you´re interested in</h2>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <NavBar/>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Paper style={{height:20, width:20, backgroundColor:"gray"}} ><img src='codigo\frontend\public\vite.svg'></img></Paper>
                    <Paper />
                    <Paper />
                    <Paper />
                    <Paper />
                    <Paper />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" disableElevation>Contained</Button>
                </div>
            </Grid>
        </Grid>
        <GlobalStyles />
    </Box>
    );
}

export default Account;