import React from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import CardFeed from '../../components/CardFeed';
import { FormSearch, Input } from '../Feed/FeedMain/style';
import { Box, Grid, TextField, Avatar }from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Saved: React.FC = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
              <Grid item xs={8}>
                    <div style={{display:"flex", justifyContent:"flex-start", paddingLeft:10}}>
                        Welcome, Joana!
                    </div>
              </Grid>
              <Grid item xs={4}>
                    <div style={{display:"Flex", justifyContent:"space-evenly" }}>
                        <NotificationsNoneIcon/>
                        <AddCircleOutlineIcon/>
                      <Avatar alt="Remy Sharp" sx={{ width: 27, height: 27 }} />
                    </div>
              </Grid>
              <Grid item xs={12}>
                    <div style={{display:"Flex", justifyContent:"center"}}>
                      <FormSearch>
                          <SearchIcon sx={{ color: 'Black', 'margin-right': '5px' }} />
                          <Input placeholder="Seach in dell contents" type="text" />
                      </FormSearch>
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