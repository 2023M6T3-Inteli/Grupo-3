import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

// Cria um tema personalizado para definir a fonte Roboto Light
const theme = createTheme({
    typography: {
        fontFamily: '\'Roboto Light\', sans-serif',
    },
});

const Container = styled.div`
  display: grid;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 2;
  padding: 8px min(46px, max(10vw, 10px));
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #D9D9D9;
  justify-content: center;
  margin: 0;

  @media (min-width: 768px){
    display: none;
  }
`;

export default function BottomNavbar() {
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();
    const handleOnClickHome = useCallback(
        () => navigate("/feed", { replace: true }),
        [navigate]
    );
    const handleOnClickNotification = useCallback(
        () => navigate("/notification", { replace: true }),
        [navigate]
    );
    const handleOnClickAdd = useCallback(
        () => navigate("/PostContent", { replace: true }),
        [navigate]
    );
    const handleOnClickSaved = useCallback(
        () => navigate("/favorites", { replace: true }),
        [navigate]
    );
    const handleOnClickProfile = useCallback(
        () => navigate("/profile", { replace: true }),
        [navigate]
    );

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction onClick={handleOnClickHome} label="Home" icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction onClick={handleOnClickNotification} label="Notifications" icon={<NotificationsOutlinedIcon />} />
                    <BottomNavigationAction onClick={handleOnClickAdd} label="Add post" icon={<AddCircleOutlinedIcon />} />
                    <BottomNavigationAction onClick={handleOnClickSaved} label="Favorites" icon={<BookmarkBorderOutlinedIcon />} />
                    <BottomNavigationAction onClick={handleOnClickProfile} label="Profile" icon={<Person2OutlinedIcon />} />
                    
                </BottomNavigation>
            </ThemeProvider>
        </Container>
    );
}
