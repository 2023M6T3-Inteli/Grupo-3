import React from 'react';
import { ContainerCard } from './styles';
import Paper from '@mui/material/Paper'

const ListaDeNumeros = () => {
    const areas = [{ name: 'Front-end developing' }, { name: 'Ux' }, { name: 'Back-end developing' }, { name: 'Cyber' }, { name: 'Testing' }];

    return (
        <div>
            <ContainerCard>
                    {areas.map((area) =>

                        <Paper style={{ height: 109, width: 166, backgroundColor: "#0672CB", margin: 5, borderRadius: 0, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>

                            {area.name}

                        </Paper>)
                    }

            </ContainerCard>
        </div>
    );
}

export default ListaDeNumeros;