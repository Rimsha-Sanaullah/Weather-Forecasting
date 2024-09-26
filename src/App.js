import './App.css';
import CurrentWeather from './components/CurrentWeather.jsx';
import ChartData from './components/ChartData.jsx';
import PreviousWeather from './components/PreviousWeather.jsx';

function App() {
  return (
    <div>
    <CurrentWeather />
    <div>
      <ChartData />
      <PreviousWeather />
    </div>
    </div>
  );
}

export default App;
