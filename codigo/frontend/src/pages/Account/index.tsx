import React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GlobalStyles from '../../styles/GlobalStyles';
import { Card, Title, Subtitle, Container } from './styles'
import SearchBox from '../../components/SearchBox';
import imag1 from 'codigo/frontend/src/assets/developing.jpg'


const Account: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={1}>

                <Grid item xs={12}>
                    <Title>
                        <h2 style={{ fontSize: 32, color: "black" }}>Tell us what you´re interested in</h2>
                    </Title>
                </Grid>

                <Grid item xs={12}>

                    <Subtitle>
                        <p style={{ fontSize: "14" }}>
                            In order to recommend the most intrnguing content for you, we will ask some questions to get to know you better
                        </p>
                    </Subtitle>
                </Grid>

                <Grid item xs={12}>
                    <div style={{ display: "flex", justifyContent: "center", marginLeft: "21px", marginRight: "21px" }}>
                        <SearchBox />
                    </div>
                </Grid>
                <form action="/tags" method="post">
                    <Grid item xs={12}>
                        <Container style={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between"}}>
                                <div><p style={{ color: "white" }}>Front-end <br />developing</p></div>
                                <div><input type='checkbox' value={'Front-end'}></input></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <div><p style={{ color: "white" }}>Ux</p></div>
                                <div><input type='checkbox' value={'ux'}></input></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <div><p style={{ color: "white" }}>Back-end<br />developing</p></div>
                                <div><input type='checkbox'value={'Back-end'}></input></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <div><p style={{ color: "white" }}>Machine learning/<br />AI</p></div>
                                <div><input type='checkbox' value={'Machine learning'}></input></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <div><p style={{ color: "white" }}>Cyber Security</p></div>
                                <div><input type='checkbox' value={'Cyber Security'}></input></div>
                            </Paper>
                            <Paper sx={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <div><p style={{ color: "white" }}>Testing</p></div>
                                <div><input type='checkbox' value={'Testing'}></input></div>
                            </Paper>
                        </Container>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <div style={{display:'flex', height: 40, width: 347, backgroundColor: "#0672CB", justifyContent:'center' }}>
                            <button type='submit'style={{color:'white'}}>NEXT</button>
                            </div>
                        </div>
                    </Grid>
                </form>

            </Grid>

            <GlobalStyles />
        </Box>
    );
}

export default Account;