import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import CardFeed from '../../components/CardFeed';
import { Box, Grid, TextField} from '@mui/material';
import SearchBox from '../../components/SearchBox';
import HeaderApp from '../../components/HeaderApp';
import axios from 'axios';
import contentService from '../../services/contentService';
import {Feed} from '../Feed/FeedMain/style';


const Saved: React.FC = () => {
  const [prefers, setPrefers] = useState([]);

  useEffect(()=>{
    const fetchPrefers = async (userID:string)=> {
      fetch
      try{
        const response = await contentService.getPostLiked(userID);
        setPrefers(response.data);
      } catch (error){
        console.error('Error in GET request:', error);
      }
    };

    fetchPrefers();
  },[]);

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
                  <Feed>
                    aaaaaaa
                  </Feed>
              </Grid>
          </Grid>
          <BottomNavbar/>
          <GlobalStyles/>
        </Box>
    );
}

export default Saved;