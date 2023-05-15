import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import CardFeed from '../../components/CardFeed';
import { Box, Grid, TextField, Avatar }from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBox from '../../components/SearchBox';
import HeaderApp from '../../components/HeaderApp';


const Saved: React.FC = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                    <HeaderApp />
                </Grid>
              <Grid item xs={12}>
                    <div style={{display:"Flex", justifyContent:"center"}}>
                      <SearchBox></SearchBox>
                        {/*<TextField id="outlined-basic" label="search" variant="outlined"/>*/}
                    </div>
              </Grid>
              <Grid item xs={12}>
                  <CardFeed/>
                  <CardFeed/>
              </Grid>
          </Grid>
          <BottomNavbar/>
          <GlobalStyles/>
      </Box>
    );
}

export default Saved;