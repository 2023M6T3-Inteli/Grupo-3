import React from 'react';

import { Container, Wrapper, SearchBar, Search, Trending, TrendingText, Notificationsfeed, Favoritedcard, Trendingcard } from './style';
import SearchIcon from '@mui/icons-material/Search';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import { createGlobalStyle } from 'styled-components';
import GlobalStyles from '../../styles/GlobalStyles';
import {motion} from 'framer-motion'
import {useEffect, useState, useRef} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HeaderApp from '../../components/HeaderApp';

import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'


const Notifications: React.FC = () => {
    
    const images = [img1, img2, img1, img2]

    return (
        <Container>
            <HeaderApp />
            <Wrapper>
                <SearchBar>
                    <SearchIcon fontSize='medium' sx={{ ml: 0 }}></SearchIcon>
                    <Search placeholder='Search in Dell contents'></Search>
                </SearchBar>
            </Wrapper>
            <Trending>
                <StarOutlineIcon /> 
                <TrendingText> Trending in Front-end</TrendingText>
                <InfoOutlinedIcon fontSize='small'/>
            </Trending>
            <motion.div className='carousel' whileTap={{ cursor : "grabbing" }} style={{width:"100%", cursor:"grab", overflow:"hidden"}}>
                <motion.div className='inner' drag="x" style={{display:"flex"}}>
                    {images.map(image => (
                        <motion.div className='item' key={image} style={{minHeight:"80px",minWidth:"320px", padding:"8px"}}>
                            <img src={image} alt='texto alt' style={{width:"100%", height:"90%", borderRadius:"12px", pointerEvents:'none'}}/>
                        </motion.div>
                    ) )}
                </motion.div>
            </motion.div>
            <Notificationsfeed>
                <h1>Notifications</h1>
                <Favoritedcard>
                    <FavoriteIcon fontSize='large' style={{marginTop:"5px"}}></FavoriteIcon>
                    <h2 style={{marginLeft:"5px", fontSize:"1em", fontWeight:"normal", justifyContent:"left"}}>You have a new match!<br/>
                        <p style={{marginLeft:"5px", fontSize:"0.8em", justifyContent:"left"}}> Based on your usage, we've identified a project you might be interested in: [headline of recommended project]</p>
                    </h2>
                </Favoritedcard>
                <Trendingcard>
                    <TrendingUpIcon fontSize='large' style={{marginTop:"5px"}}></TrendingUpIcon>
                    <h2 style={{marginLeft:"5px", fontSize:"1em", fontWeight:"normal", justifyContent:"left"}}>See metrics and highlights of your post!<br/>
                        <p style={{marginLeft:"5px", fontSize:"0.8em", justifyContent:"left"}}> Click here to see who liked your post and discover more content like this</p>
                    </h2>
                </Trendingcard>
            </Notificationsfeed>
            <BottomNavbar />
            <GlobalStyles />
        </Container>
    );
}

export default Notifications;

