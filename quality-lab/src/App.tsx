import { useState, useEffect } from 'react';

/*
I am fetching the city of London's temperature, humidity, precipitation
*/

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState(null);

  useEffect(() => {}, []);
  return (
    <div>
      <h2>Weather API</h2>
      <div>
        <p>City:</p>
        <p>Temperature: </p>
        <p>Humidity: </p>
        <p>Precipitation: </p>
      </div>
    </div>
  );
}
export default App;
