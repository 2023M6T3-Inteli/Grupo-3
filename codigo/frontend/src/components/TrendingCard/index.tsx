import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function Trendingcards() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'block', backgroundColor: '#6495ED', ml: '15px', width: '250px', alignItems: 'center'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textAlign={'center'} sx={{display: 'flex', flexDirection: 'column'}}>
            FrontEnd
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
