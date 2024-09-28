import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import WeatherSection from './components/WeatherSection';
import { Box, Divider } from '@mui/material';

const images = [
  '/weather2.jpg', 
  '/weather3.jpg', 
  '/weather5.jpg',
  '/weather6.jpg'
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative', 
        overflow: 'hidden',   
      }}
    >
      {/* Blurred Background Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)', 
          zIndex: -1, 
        }}
      />

      {/* Content Layer (No Blur) */}
      <Box
        sx={{
          position: 'relative',  
          zIndex: 1,
        }}
      >
        <Navbar />
        <Divider
          style={{ backgroundColor: '#fff', width: '95%' }} 
          sx={{
            filter: 'blur(1px)', 
            marginX: 'auto',      
            height: '1px',         
            marginTop: '4px',
          }}
        />

        <WeatherSection />
        <Divider
          style={{ backgroundColor: '#fff', width: '95%' }} 
          sx={{
            filter: 'blur(1px)', 
            marginX: 'auto',      
            height: '1px',         
            marginTop: '4px',
          }}
        />

      </Box>
    </Box>
  );
}

export default App;
