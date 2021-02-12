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

  function displayWeather(data, div) {
    console.log(data);

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
    windSpeed.textContent = `Wind speed: ${data.windSpeed} m/s`;

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
  }

  return { displayWeather };
};

export default weatherDisplayer;
