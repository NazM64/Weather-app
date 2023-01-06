function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated:${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let h3 = document.querySelector("#date-time");
  h3.innerHTML = formatDate(response.data.dt * 1000);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let weatherDescription = response.data.weather[0].description;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${weatherDescription}`;

  highCelsiusTemperature = response.data.main.temp;
  lowCelsiusTemperature = response.data.main.temp_min;

  let highFahrenheitDegree = document.querySelector(".high-degree");
  highFahrenheitDegree.innerHTML = Math.round(highCelsiusTemperature);
  let lowFahrenheitDegree = document.querySelector(".low-degree");
  lowFahrenheitDegree.innerHTML = Math.round(lowCelsiusTemperature);
  let iconElement = document.querySelector("#icon-top");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let highCelsiusTemperature = null;
let lowCelsiusTemperature = null;

function highTempFahrenheit(event) {
  event.preventDefault();
  let highFahrenheitDegree = document.querySelector(".high-degree");
  let highTempFahrenheit = (highCelsiusTemperature * 9) / 5 + 32;
  highFahrenheitDegree.innerHTML = Math.round(highTempFahrenheit);
}

let highTemperatureFahrenheit = document.querySelector("#fahrenheit-link-high");
highTemperatureFahrenheit.addEventListener("click", highTempFahrenheit);

function lowTempFahrenheit(event) {
  event.preventDefault();
  let lowFahrenheitDegree = document.querySelector(".low-degree");
  let lowTempFahrenheit = (lowCelsiusTemperature * 9) / 5 + 32;
  lowFahrenheitDegree.innerHTML = Math.round(lowTempFahrenheit);
}

let lowTemperatureFahrenheit = document.querySelector("#fahrenheit-link-low");
lowTemperatureFahrenheit.addEventListener("click", lowTempFahrenheit);

function findCity(city) {
  let apiKey = "ecf6996c8a62ee385547d2ae6dc3dea8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    findCity(city);
  } else {
    alert("Please Enter a city name");
  }
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

function currentPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ecf6996c8a62ee385547d2ae6dc3dea8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector(".current-button");
currentLocation.addEventListener("click", currentWeather);
