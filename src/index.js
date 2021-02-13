import './styles/style.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import weatherFetcher from './scripts/weather-fetcher';
import weatherDisplayer from './scripts/weather-displayer';

const input = document.getElementById('location');
const form = document.getElementsByTagName('form')[0];
const displayDiv = document.getElementById('display');
const backgroundImage = document.querySelector('img');
const toggleTemp = document.getElementById('toggle');
const weather = weatherFetcher();
const displayer = weatherDisplayer();

weather.getWeather('Belfast')
  .then((json) => {
    displayer.displayWeather(json, displayDiv, backgroundImage, toggleTemp);
  });

function searchWeather() {
  weather.getWeather(input.value)
    .then((json) => {
      displayer.displayWeather(json, displayDiv, backgroundImage, toggleTemp);
    })
    .catch((err) => {
      // ssshhhhh just let the alert handle it
    });

  form.reset();
}

toggleTemp.addEventListener('click', (event) => {
  const location = document.getElementById('location-display');
  const toggle = event.target;

  if (toggle.className === 'false') {
    toggle.classList.remove('false');
    toggle.classList.add('true');
    toggle.textContent = 'Toggle \u00B0C';

    weather.getWeather(location.textContent)
      .then((json) => displayer.convertToF(json))
      .then((json) => {
        displayer.displayWeather(json, displayDiv, backgroundImage, toggle);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    toggle.classList.remove('true');
    toggle.classList.add('false');
    toggle.textContent = 'Toggle \u00B0F';

    weather.getWeather(location.textContent)
      .then((json) => displayer.convertToC(json))
      .then((json) => {
        displayer.displayWeather(json, displayDiv, backgroundImage, toggle);
      })
      .catch((err) => {
      // ssshhhhh just let the alert handle it
      });
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  searchWeather();
});
