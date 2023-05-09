import * as React from 'react';
import styled from 'styled-components';
import { Grid, Box, Paper, Avatar } from '@mui/material/';

export default function Saved() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper>Welcome fulano!</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>Perfil<Avatar alt="Remy Sharp" src="//" /></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>barra de pesquisa
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>Post1</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>Post2</Paper>
                </Grid>
            </Grid>
        </Box>
    );
}