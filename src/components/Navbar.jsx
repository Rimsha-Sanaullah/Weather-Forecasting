import React, { useState, useEffect } from 'react';
import Logo from '../Assets/Logo.png'; 
import { AppBar, Box, Typography, Toolbar } from '@mui/material';

const Navbar = () => {
    const [time, setTime] = useState('Loading...');
    const [fullDate, setFullDate] = useState('Loading...');

    useEffect(() => {
        const updateDateTime = () => {
            const today = new Date();
            
            // Format time (hour:minute AM/PM)
            const formattedTime = today.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });

            // Format full date (e.g., Sep 27, 2024)
            const formattedFullDate = today.toLocaleDateString('en-US', {
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'
            });

            // Set the formatted time and full date
            setTime(formattedTime);
            setFullDate(formattedFullDate);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000); // Update time every second

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left side - Logo and App Name */}
            <Box display="flex" alignItems="center">
              <img src={Logo} alt='Logo' height={60} width={60} /> 
              <Typography variant="h6" style={{ marginLeft: '10px', color: '#000' }}>
                Weatherify
              </Typography>
            </Box>

            {/* Right side - Time and Date */}
            <Box textAlign="right">
              <Typography variant="body1" style={{ color: '#000' }}>
                {time}
              </Typography>
              <Typography variant="body1" style={{ color: '#000' }}>
                {fullDate}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
    );
};

export default Navbar;
