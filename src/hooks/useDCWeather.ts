import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  high: number;
  low: number;
  wind: string;
}

const FALLBACK_WEATHER: WeatherData = {
  temp: 58,
  condition: 'Partly Cloudy',
  high: 64,
  low: 41,
  wind: 'NW 8 mph',
};

// WMO Weather interpretation codes to descriptions
const wmoToCondition = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Showers';
  if (code <= 86) return 'Snow Showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

const degToDir = (deg: number): string => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

export const useDCWeather = () => {
  const [weather, setWeather] = useState<WeatherData>(FALLBACK_WEATHER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Washington DC coordinates: 38.9072, -77.0369
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=38.9072&longitude=-77.0369&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/New_York&forecast_days=1'
        );

        if (!res.ok) throw new Error('Weather API error');

        const data = await res.json();
        const current = data.current;
        const daily = data.daily;

        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: wmoToCondition(current.weather_code),
          high: Math.round(daily.temperature_2m_max[0]),
          low: Math.round(daily.temperature_2m_min[0]),
          wind: `${degToDir(current.wind_direction_10m)} ${Math.round(current.wind_speed_10m)} mph`,
        });
      } catch (err) {
        console.error('Weather fetch failed:', err);
        // Keep fallback
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading };
};
