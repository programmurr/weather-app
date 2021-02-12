const weatherFetcher = () => {
  async function cleanWeatherData(weatherData) {
    return {
      category: weatherData.weather[0].main,
      categoryDescription: weatherData.weather[0].description,
      humidityPercentage: weatherData.main.humidity,
      name: weatherData.name,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
      temp: weatherData.main.temp,
      tempFeelsLike: weatherData.main.feels_like,
      windSpeed: weatherData.wind.speed,
    };
  }

  async function getWeather(location) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=083f648ccd46dcb20ecb3b4fdd992ecd&units=metric`, { mode: 'cors' });
      const rawWeatherData = await response.json();
      const parsedWeatherData = await cleanWeatherData(rawWeatherData);
      return parsedWeatherData;
    } catch (err) {
      alert('Please enter a location');
      console.error(err);
    }
  }

  return { getWeather };
};

export default weatherFetcher;
