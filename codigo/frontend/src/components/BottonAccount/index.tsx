import React from 'react';
import Button from '@mui/material/Button';
import { Container } from './style';



const BottonAccount: React.FC = () => {
    return ( 
        <Container>
            <Button variant="contained" disableElevation sx={{ width: 347, height: 40, borderRadius: 0, bgcolor: "#0672CB" }}>
                Next
            </Button>
        </Container>
    );
}

export default BottonAccount;