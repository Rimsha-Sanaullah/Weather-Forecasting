import React, { useEffect, useState } from 'react';
import { TextField, Box, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const WeatherSection = () => {
    const [temperature, setTemperature] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState('');
    const [humidity, setHumidity] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState('');
    const [error, setError] = useState('');
    const [location, setLocation] = useState('New York'); // Default location

    const apiKey = 'ba3d44246b75a06b4d47dcee5d0a1f7f'; // Replace with your OpenWeatherMap API key

    // Fetch weather data based on latitude and longitude
    const fetchWeatherData = async (lat, lon) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`; // Change units to metric
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch weather data');
            const data = await response.json();
            setTemperature(data.main.temp);
            setWeatherDescription(data.weather[0].description);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
            const iconCode = data.weather[0].icon;
            setWeatherIcon(`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
            setError(''); // Clear any previous errors
        } catch {
            setError('Could not retrieve weather data. Please try again.');
        }
    };

    // Fetch weather data based on city name
    const fetchWeatherByLocation = async (location) => {
        const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`; // Change units to metric
        try {
            const response = await fetch(geoUrl);
            if (!response.ok) throw new Error('Location not found');
            const data = await response.json();
            fetchWeatherData(data.coord.lat, data.coord.lon);
        } catch {
            setError('Could not find that location. Please try again.');
        }
    };

    // Handle search icon click
    const handleSearch = () => {
        if (location) {
            fetchWeatherByLocation(location);
            // Remove this line to prevent clearing the input
            // setLocation(''); // Clear input after search
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Get user's location on initial render
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    () => setError('Unable to retrieve your location.')
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    // Fetch weather for the default location on initial render
    useEffect(() => {
        fetchWeatherByLocation(location);
    }, [location]); // Run again whenever the location changes

    return (
        <Box>
            {/* Location Display */}
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                <Typography variant="h6" color="white">
                    {location}
                </Typography>
            </Box>

            {/* Search Input */}
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                <TextField
                    variant="standard"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    onClick={handleSearch} // Call handleSearch when icon is clicked
                                />
                            </InputAdornment>
                        ),
                        style: { color: 'white', borderBottom: '1px solid white' },
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    placeholder="Enter a city name..."
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputBase-root:before': { borderBottom: '1px solid white' },
                        '& .MuiInputBase-root:after': { borderBottom: '2px solid white' },
                    }}
                />
            </Box>

            {/* Weather Information */}
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" sx={{ padding: 2, marginY: '60px' }}>
                {/* Left Side: Image and Temperature */}
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" gap={2} sx={{ flex: 1 }}>
                    <img 
                        src={weatherIcon || "http://openweathermap.org/img/wn/01d@2x.png"} 
                        alt="Weather Icon" 
                        style={{ width: '100%', height: 'auto', maxWidth: { xs: 100, md: 200 }, maxHeight: { xs: 100, md: 200 } }} 
                    />
                    <Box>
                        <Typography variant="h1" color="#fff">
                            {temperature !== null ? `${Math.round(temperature)}°C` : 'Loading...'} {/* Change to °C */}
                        </Typography>
                        <Typography variant="h2" color="#fff">
                            {weatherDescription || 'Loading...'}
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side: Humidity and Wind Speed */}
                <Box display="flex" alignItems="flex-start" gap={6} sx={{ flex: 1, marginTop: '15px' }}>
                    <Box textAlign="left">
                        <Typography variant="h6" color="#fff" sx={{ fontWeight: 'bold' }}>Humidity</Typography>
                        <Typography variant="body1" color="#fff" sx={{ fontWeight: 'normal' }}>
                            {humidity !== null ? `${humidity}%` : 'Loading...'}
                        </Typography>
                    </Box>
                    <Box textAlign="left">
                        <Typography variant="h6" color="#fff" sx={{ fontWeight: 'bold' }}>Wind Speed</Typography>
                        <Typography variant="body1" color="#fff" sx={{ fontWeight: 'normal' }}>
                            {windSpeed !== null ? `${windSpeed} km/h` : 'Loading...'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Error Handling */}
            {error && <Typography color="red">{error}</Typography>}
        </Box>
    );
};

export default WeatherSection;
