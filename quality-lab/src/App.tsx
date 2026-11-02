import { useState, useEffect } from 'react';

/*
I am fetching the city of London's temperature, humidity, precipitation
*/

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

type WeatherApi = {
  location: {
    name: string;
  };
  current: {
    feelslike_f: number;
    humidity: number;
    precip_in: number;
  };
};

function App() {
  const [weather, setWeather] = useState<WeatherApi | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Glasgow`,
        );

        if (!response.ok) {
          throw new Error("City can't be found");
        }

        const data = await response.json();

        setWeather(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weather) {
    return <p>No weather data available</p>;
  }
  return (
    <div>
      <h2>Weather API</h2>
      <div>
        <p>City: {weather?.location.name}</p>
        <p>Temperature: {weather?.current.feelslike_f} </p>
        <p>Humidity: {weather?.current.humidity} </p>
        <p>Precipitation: {weather?.current.precip_in} </p>
      </div>
    </div>
  );
}
export default App;
