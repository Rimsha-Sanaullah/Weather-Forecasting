import React, { useState, useEffect } from 'react';
import Logo from '../Assets/Logo.png';
import { AppBar, Box, Typography, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [time, setTime] = useState('Loading...');
  const [fullDate, setFullDate] = useState('Loading...');

  // Get the theme object to access breakpoints
  const theme = useTheme();

  // Check if screen width is smaller than "sm" (600px)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();

      const formattedTime = today.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const formattedFullDate = today.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setTime(formattedTime);
      setFullDate(formattedFullDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row', 
          marginTop: isMobile ? '20px' : '10px', 
        }}
      >
        {/* Left side - Logo and App Name */}
        <Box display="flex" alignItems="center" justifyContent={isMobile ? 'center' : 'flex-start'} gap={isMobile ? 0.5 : 0}>
          <img src={Logo} alt="Logo" height={isMobile ? 45 : 60} width={isMobile ? 40 : 60} /> 
          <Typography
            variant="h6"
            style={{
              marginLeft: isMobile ? '0' : '10px', 
              color: '#fff',
              fontWeight: 'bold',
              fontSize: isMobile ? '1.8rem' : '1.6rem', 
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            Weatherify
          </Typography>
        </Box>

        {/* Right side - Time and Date */}
        <Box
          textAlign={isMobile ? 'center' : 'right'}
          marginX={isMobile ? 0 : 7}
          marginTop={isMobile ? 0 : 2} 
        >
          <Typography
            sx={{ fontSize: isMobile ? '1rem' : '1.125rem' }} 
            style={{ color: '#fff' }}
          >
            {time}
          </Typography>
          <Typography
            sx={{ fontSize: isMobile ? '1rem' : '1.125rem' }} 
            style={{ color: '#fff' }}
          >
            {fullDate}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
