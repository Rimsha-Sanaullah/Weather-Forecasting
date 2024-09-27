import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartData = () => {
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(0, 0, 255, 0.2)",
      borderColor: "rgba(0, 0, 255, 1)",
      data: [],
    }],
  });

  const [heading, setHeading] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
          
          // Check if the response is OK (status 200)
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }

          const result = await response.json();

          // Check if `main` exists in the result before accessing `temp`
          if (result.main && result.main.temp !== undefined) {
            const temp = result.main.temp;  // Current temperature in °C
            const labels = ['Current'];     // Add more data points as necessary
            const data = [temp];

            setTemperatureData({
              labels: labels,
              datasets: [{
                ...temperatureData.datasets[0],
                data: data,
              }],
            });
            
            setHeading(`Temperature in ${result.name}`); // Display city name in heading
          } else {
            throw new Error('Temperature data is unavailable');
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setHeading('Failed to load data');
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable vertical grid lines
        },
        ticks: {
          display: false, // Hide x-axis tick labels
        },
      },
      y: {
        min: 0,
        max: 40, // Adjust this range according to expected temperature
        grid: {
          display: false, // Disable horizontal grid lines
        },
        ticks: {
          display: true, // Show y-axis tick labels (optional)
        },
      },
    },
  };

  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h2 style={{ textAlign: 'center' }}>{heading}</h2>
      <div style={{ width: '100%', height: '50vh' }}>
        <Line data={temperatureData} options={options} />
      </div>
    </div>
  );
};

export default ChartData;
