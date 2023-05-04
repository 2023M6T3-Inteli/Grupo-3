import * as React from 'react';
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
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #D9D9D9;
  justify-content: center;
  margin: 0;
`;

export default function BottomNavbar() {
    const [value, setValue] = React.useState(0);

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
                    <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction label="Notifications" icon={<NotificationsOutlinedIcon />} />
                    <BottomNavigationAction label="Add post" icon={<AddCircleOutlinedIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<BookmarkBorderOutlinedIcon />} />
                    <BottomNavigationAction label="Profile" icon={<Person2OutlinedIcon />} />
                </BottomNavigation>
            </ThemeProvider>
        </Container>
    );
}
