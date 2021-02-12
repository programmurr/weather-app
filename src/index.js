import './styles/style.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const input = document.getElementById('location');
const form = document.getElementsByTagName('form')[0];
const displayDiv = document.getElementById('display');

async function cleanWeatherData(weatherData) {
  return {
    category: weatherData.weather[0].main,
    cloudCoverage: weatherData.clouds.all,
    coordLat: weatherData.coord.lat,
    coordLon: weatherData.coord.lon,
    countryName: weatherData.sys.country,
    categoryDescription: weatherData.weather[0].description,
    humidityPercentage: weatherData.main.humidity,
    name: weatherData.name,
    pressure: weatherData.main.pressure,
    sunrise: weatherData.sys.sunrise,
    sunset: weatherData.sys.sunset,
    temp: weatherData.main.temp,
    tempFeelsLike: weatherData.main.feels_like,
    tempMax: weatherData.main.temp_max,
    tempMin: weatherData.main.temp_min,
    timeAdjust: weatherData.timezone,
    windSpeed: weatherData.wind.speed,
  };
}

async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=083f648ccd46dcb20ecb3b4fdd992ecd&units=metric`, { mode: 'cors' });
    const rawWeatherData = await response.json();
    const parsedWeatherData = await cleanWeatherData(rawWeatherData);
    console.log(parsedWeatherData);
  } catch (err) {
    alert('Please enter a location');
    console.error(err);
  }
}

getWeather('Belfast');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getWeather(input.value);
  form.reset();
});
