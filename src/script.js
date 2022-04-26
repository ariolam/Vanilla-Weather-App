let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let time = document.querySelector("#currentDate");
time.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  let iconClass = translateIconName(response.data.weather[0].icon);
  if (iconElement.classList.length < 3) {
    iconElement.classList.add(iconClass);
  } else {
    iconElement.classList.remove(iconElement.classList[2]);
    iconElement.classList.add(iconClass);
  }

  celsiusTemperature = response.data.main.temp;
}

function translateIconName(iconId) {
  if (iconId === "01d" || iconId === "01n") {
    return "fa-sun";
  }
  if (iconId === "02d" || iconId === "02n") {
    return "fa-cloud-sun";
  }
  if (iconId === "03d" || iconId === "03n") {
    return "fa-cloud";
  }
  if (iconId === "04d" || iconId === "04n") {
    return "fa-cloud";
  }
  if (iconId === "09d" || iconId === "09n") {
    return "fa-cloud-rain";
  }
  if (iconId === "10d" || iconId === "10n") {
    return "fa-cloud-sun-rain";
  }
  if (iconId === "11d" || iconId === "11n") {
    return "fa-cloud-bolt";
  }
  if (iconId === "13d" || iconId === "13n") {
    return "fa-snowflake";
  }
  if (iconId === "50d" || iconId === "50n") {
    return "fa-smog";
  }
}

function searchCity(city) {
  let apiKey = "e12a6661f841359a9c3ef6d9a972206e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submitLocation(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}
searchCity("Athens");

let form = document.querySelector("#search-engine");
form.addEventListener("submit", submitLocation);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e12a6661f841359a9c3ef6d9a972206e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(dispayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector(".current");
button.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
