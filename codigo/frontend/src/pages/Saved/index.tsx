import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import CardFeed from '../../components/CardFeed';
import { Box, Grid, TextField} from '@mui/material';
import SearchBox from '../../components/SearchBox';
import HeaderApp from '../../components/HeaderApp';


const Saved: React.FC = () => {
  const [prefers, setPrefers] = useState([]);

  useEffect(()=>{
    const fetchPrefers = async ()=> {
      

    }
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                    <HeaderApp />
                </Grid>
              <Grid item xs={12}>
                    <div style={{display:"Flex", justifyContent:"center"}}>
                      <SearchBox></SearchBox>
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