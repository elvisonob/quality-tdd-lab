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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeather(null);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Glasgow`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Something went wrong');
        }

        setWeather(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        console.error(error);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>No weather data available</p>;
  }
  return (
    <div>
      <h2>Weather API</h2>
      <div>
        <p>City: {weather.location.name}</p>
        <p>Temperature: {weather.current.feelslike_f} </p>
        <p>Humidity: {weather.current.humidity} </p>
        <p>Precipitation: {weather.current.precip_in} </p>
      </div>
    </div>
  );
}
export default App;
