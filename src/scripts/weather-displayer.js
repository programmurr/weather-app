const weatherDisplayer = () => {
  function parseDescription(description) {
    return description.split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }

  function parseTime(unixTime) {
    const dateTime = new Date(unixTime * 1000);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
  }

  function parseWindSpeed(metricSpeed) {
    return Math.round(metricSpeed * 2.2369363);
  }

  function setBackgroundImage(backgroundImage, category) {
    switch (category) {
      case 'Atmosphere':
        backgroundImage.src = '../src/img/Atmosphere.jpg';
        break;
      case 'Clear':
        backgroundImage.src = '../src/img/Clear.jpg';
        break;
      case 'Clouds':
        backgroundImage.src = '../src/img/Clouds.jpg';
        break;
      case 'Drizzle':
        backgroundImage.src = '../src/img/Drizzle.jpg';
        break;
      case 'Rain':
        backgroundImage.src = '../src/img/Rain.jpg';
        break;
      case 'Snow':
        backgroundImage.src = '../src/img/Snow.jpg';
        break;
      case 'Thunderstorm':
        backgroundImage.src = '../src/img/Thunderstorm.jpg';
        break;
      default:
        backgroundImage.src = '../src/img/Default.jpg';
    }
  }

  function displayWeather(data, div, backgroundImage) {
    div.innerHTML = '';

    const location = document.createElement('h3');
    location.id = 'location-display';
    location.textContent = data.name;

    const currentDate = new Date();
    const timeNow = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

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
    temperature.textContent = `Temp: ${data.temp} Celsius`;

    const feelsLike = document.createElement('h3');
    feelsLike.id = 'feels-like';
    feelsLike.textContent = `Feels like ${data.tempFeelsLike} Celsius`;

    const windSpeed = document.createElement('h3');
    windSpeed.id = 'wind-speed';
    windSpeed.textContent = `Wind speed: ${parseWindSpeed(data.windSpeed)} mph`;

    const appendages = [
      location,
      time,
      category,
      description,
      temperature,
      feelsLike,
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

  return { displayWeather };
};

export default weatherDisplayer;
