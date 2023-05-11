import React from 'react';
import { ContainerCard } from './styles';
import Paper from '@mui/material/Paper'

const CardAccount: React.FC = () => {
    return(
        <ContainerCard>
            <Paper style={{ height: 109, width: 100, backgroundColor: "blue", margin: 5, borderRadius:0}} />
            <Paper style={{ height: 109, width: 100, backgroundColor: "blue", margin: 5, borderRadius: 0 }} />
        </ContainerCard>
    );
}

export default CardAccount;