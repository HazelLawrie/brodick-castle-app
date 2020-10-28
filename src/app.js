// Display Date

function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let dateOfMonth = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDateTime = document.querySelector("#date");
  currentDateTime.innerHTML = `${day}, ${dateOfMonth} ${month} ${year} <br /> <small>Last updated: ${hours}:${minutes}</small>`;
}

currentDate();

// Get Time for 3 hour forecast

function formatHours(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Get Day for 5 Day forecast

function formatDays(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date(timestamp);
  let day = days[currentDate.getDay()];
  return `${day}`;
}

// Show Weather and City on Screen after fetching Geolocation

function showWeather(response) {
  celciusTemperature = response.data.main.temp;
  
  document.querySelector("#displayed-temp").innerHTML = Math.round(
    celciusTemperature
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  document.querySelector("#pressure-value").innerHTML =
    response.data.main.pressure;
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-value").innerHTML = `${Math.round(
    response.data.wind.speed * 2.237
  )}`;
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].description);
  currentDate();
}

// Get current weather for Brodick, UK

function autoRetrieveBrodick() {
  let apiKey = "1dca542b443d294d157be34aefdc0627";
  let units = `metric`;
  let city = `Brodick`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  apiDaysUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude={current,minutely,hourly}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecastDays);
}

autoRetrieveBrodick();

// Display 3 hour Forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-sm">
            ${formatHours(forecast.dt * 1000)}
            <br>
            <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png">
            <br />
            ${
              forecast.weather[0].description.charAt(0).toUpperCase() +
              forecast.weather[0].description.slice(1)
            }
            <br />
            ${Math.round(forecast.main.temp)}°C | ${
      Math.round((forecast.main.temp * 9) / 5) + 32
    }°F
    </div>`;
  }
}

// Display 5 day forecast

function displayForecastDays(response) {
  let forecastElement = document.querySelector("#forecast-days");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-sm">
            ${formatDays(forecast.dt * 1000)}
            <br>
            <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png">
            <br />
            ${
              forecast.weather[0].description.charAt(0).toUpperCase() +
              forecast.weather[0].description.slice(1)
            }
            <br />
            ${Math.round(forecast.main.temp)}°C | ${
      Math.round((forecast.main.temp * 9) / 5) + 32
    }°F
    </div>`;
  }
}

// Change C to F

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celciusTemperature * 9) / 5) + 32;
  document.querySelector("#displayed-temp").innerHTML = fahrenheitTemp;
}

function displayCelciusTemp(event) {
  event.preventDefault();
  document.querySelector("#displayed-temp").innerHTML = Math.round(
    celciusTemperature
  );
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#change-to-F");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#change-to-C");
celciusLink.addEventListener("click", displayCelciusTemp);

// Make recommended actitivity change depending on wind speed and rain

function displayRecommendedActivity(response) {
let windSpeed = 10;

if (windSpeed === 10) {
    document.querySelector("#recommended-activity").innerHTML = `It is moderately windy today. A tour around the Castle is recommended.`
} else {
    document.querySelector("#recommended-activity").innerHTML = `Hello welcome to castle`
}
}

displayRecommendedActivity();