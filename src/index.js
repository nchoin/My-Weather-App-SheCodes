//  refreshWeather function will use the response.data get all the information we need to display.
function refreshWeather(response) {
  console.log(response.data);
  let changeCityElement = document.querySelector("#weather-city");
  let changeConditionsElement = document.querySelector("#conditions");
  let changeHumidityElement = document.querySelector("#humidity");
  let changeWindElement = document.querySelector("#wind");
  let changeIconElement = document.querySelector("#current-temperature-icon");
  let changeTempValueElement = document.querySelector(
    "#current-temperature-value"
  );
  let changeDateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);

  changeCityElement.textContent = response.data.city;
  changeDateElement.textContent = formatDate(date);
  changeConditionsElement.textContent = response.data.condition.description;
  changeHumidityElement.textContent = `${response.data.temperature.humidity}%`;
  changeWindElement.textContent = `${Math.round(response.data.wind.speed)}mph`;
  changeTempValueElement.textContent = Math.round(
    response.data.temperature.current
  );
  changeIconElement.setAttribute("src", response.data.condition.icon_url);
}

// This function will format the date in a userfriendly manner.
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}
// This function will use the data in API to display the next five days of weather.


function displayForecast() {

  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="weather-forecast-day"> 
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">❄️</div>
        <div class="weather-forecast-temps">
            <span class="weather-forecast-max-temp"><strong>32°</strong></span>
            <span class="weather-forecast-min-temp">18°</span>
        </div>
    </div>
       `;
  });
  let forecastElement = document.querySelector("#five-day-forecast");
  forecastElement.innerHTML=forecastHTML;
}
// this function takes the searchCity.value from the sendCitySubmitted function because we used it as an argument, and will add the city to the weatherApiUrl.
function searchForCity(city) {
  let weatherApiKey = "6bccfefa354f0f4do4245dc0a56fata0";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}&units=imperial`;
  console.log(weatherApiUrl);
  axios.get(weatherApiUrl).then(refreshWeather);
}

// created the basic function to target the search city and be able to change the html to display the city name.
function sendCitySubmitted(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-entered");
  console.log(searchCity.value);
  searchForCity(searchCity.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", sendCitySubmitted);

// sets a default city when the page loads
searchForCity("Narragansett");
displayForecast();


// formatting with dates

// let today = new Date();
// let localFormat = today.toLocaleString();
// let hour = today.getHours();
// let localHour = today.toLocaleString(undefined, { hour: 'numeric', hour12: true });
// console.log(localHour);
// let minutes = today.getMinutes().toString().padStart(2, "0");
// console.log(localFormat);
// date.innerHTML = `${localFormat}`;
