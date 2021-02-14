import Atmosphere from '../img/Atmosphere.jpg';
import Clear from '../img/Clear.jpg';
import Clouds from '../img/Clouds.jpg';
import Default from '../img/Default.jpg';
import Drizzle from '../img/Drizzle.jpg';
import Rain from '../img/Rain.jpg';
import Snow from '../img/Snow.jpg';
import Thunderstorm from '../img/Thunderstorm.jpg';

const weatherDisplayer = () => {
  function parseDescription(description) {
    return description.split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }

  function parseTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    return `${hours}:${minutes}`;
  }

  function parseWindSpeed(metricSpeed) {
    return Math.round(metricSpeed * 2.2369363);
  }

  function setBackgroundImage(backgroundImage, category) {
    switch (category) {
      case 'Atmosphere':
        backgroundImage.src = Atmosphere;
        break;
      case 'Clear':
        backgroundImage.src = Clear;
        break;
      case 'Clouds':
        backgroundImage.src = Clouds;
        break;
      case 'Drizzle':
        backgroundImage.src = Drizzle;
        break;
      case 'Rain':
        backgroundImage.src = Rain;
        break;
      case 'Snow':
        backgroundImage.src = Snow;
        break;
      case 'Thunderstorm':
        backgroundImage.src = Thunderstorm;
        break;
      default:
        backgroundImage.src = Default;
    }
  }

  function displayWeather(data, div, backgroundImage, toggle) {
    div.innerHTML = '';

    const location = document.createElement('h3');
    location.id = 'location-display';
    location.textContent = data.name;

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
    const timeNow = `${hours}:${minutes}`;

    const time = document.createElement('h3');
    time.id = 'time';
    time.textContent = timeNow;

    const category = document.createElement('h3');
    category.id = 'category';
    category.textContent = data.category;

    const description = document.createElement('h3');
    description.id = 'description';
    description.textContent = parseDescription(data.categoryDescription);

    const humidity = document.createElement('h3');
    humidity.id = 'cloud-cover';
    humidity.textContent = `Humidity: ${data.humidityPercentage}%`;

    const sunrise = document.createElement('h3');
    sunrise.id = 'sunrise';
    sunrise.textContent = `Sunrise: ${parseTime(data.sunrise)}`;

    const sunset = document.createElement('h3');
    sunset.id = 'sunset';
    sunset.textContent = `Sunset: ${parseTime(data.sunset)}`;

    const temperature = document.createElement('h3');
    temperature.id = 'temperature';
    if (toggle.className === 'true') {
      temperature.textContent = `${data.temp} \u00B0F`;
    } else {
      temperature.textContent = `${data.temp} \u00B0C`;
    }

    const feelsLike = document.createElement('h3');
    feelsLike.id = 'feels-like';
    feelsLike.textContent = `Feels like ${data.tempFeelsLike} \u00B0C`;
    if (toggle.className === 'true') {
      feelsLike.textContent = `Feels like ${data.tempFeelsLike} \u00B0F`;
    } else {
      feelsLike.textContent = `Feels like ${data.tempFeelsLike} \u00B0C`;
    }

    const windSpeed = document.createElement('h3');
    windSpeed.id = 'wind-speed';
    windSpeed.textContent = `Wind speed: ${parseWindSpeed(data.windSpeed)} mph`;

    const appendages = [
      location,
      time,
      temperature,
      feelsLike,
      description,
      humidity,
      sunrise,
      sunset,
      windSpeed,
    ];

    appendages.forEach((appendage) => {
      div.appendChild(appendage);
    });

    setBackgroundImage(backgroundImage, data.category);
  }

  function convertToF(data) {
    const fahrenheitTemp = ((data.temp * 1.8) + 32);
    const fahrenheitFeels = ((data.tempFeelsLike * 1.8) + 32);
    data.temp = fahrenheitTemp.toFixed(2);
    data.tempFeelsLike = fahrenheitFeels.toFixed(2);
    return data;
  }

  return { displayWeather, convertToF };
};

export default weatherDisplayer;
