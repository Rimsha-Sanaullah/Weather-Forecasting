import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CurrentWeather = () => {
  const [date, setDate] = useState('Loading...');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}, ${days[today.getDay()]}, ${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate);
  }, []);

  return (
    <Box 
      display="flex" 
      alignItems="flex-start" 
      flexDirection='column'  
      gap={3} 
      sx={{
        width: '20%',
        height: '100vh',
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        padding: 3, 
        margin: '5px'
      }}
    >
      <Box display='flex' gap={1}>
        <TextField label='Location' variant='standard' fullWidth />
        <Button variant="outlined" color="primary">
          <SearchIcon />
        </Button>
      </Box>

      <Typography variant='h6' color='gray'>{date}</Typography>

      <Box>
        <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
          <img src="#" alt='#' style={{ width: 50, height: 50 }} />
          <Typography variant='h4'>56<sup>&deg;F</sup></Typography>
        </Box>
        <Typography variant='h4'>Cloudy</Typography>
      </Box>

      <Box display='flex' justifyContent='space-between' width="100%">
        <Box>
          <Typography variant='body1' color='gray' sx={{ fontWeight: 'bold' }}>Humidity</Typography>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>85%</Typography>
        </Box>
        <Box>
          <Typography variant='body1' color='gray' sx={{ fontWeight: 'bold' }}>Wind Speed</Typography>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>19.2 km/h</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentWeather;
