import './styles/style.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import weatherFetcher from './scripts/weather-fetcher';
import weatherDisplayer from './scripts/weather-displayer';

const input = document.getElementById('location');
const form = document.getElementsByTagName('form')[0];
const displayDiv = document.getElementById('display');
const backgroundImage = document.querySelector('img');
const weather = weatherFetcher();
const displayer = weatherDisplayer();

weather.getWeather('Belfast')
  .then((json) => {
    displayer.displayWeather(json, displayDiv, backgroundImage);
  });

function searchWeather() {
  weather.getWeather(input.value)
    .then((json) => {
      displayer.displayWeather(json, displayDiv, backgroundImage);
    })
    .catch((err) => {
      // ssshhhhh just let the alert handle it
    });

  form.reset();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  searchWeather();
});
