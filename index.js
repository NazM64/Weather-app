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
  let h3 = document.querySelector("#date-time");
  h3.innerHTML = formatDate(response.data.dt * 1000);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let weatherDescription = response.data.weather[0].description;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${weatherDescription}`;
  let temperature = Math.round(response.data.main.temp);
  let highDegree = document.querySelector(".high-degree");
  highDegree.innerHTML = `${temperature}`;
  let minTemperature = Math.round(response.data.main.temp_min);
  let lowDegree = document.querySelector(".low-degree");
  lowDegree.innerHTML = `${minTemperature}`;
}

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
