//  refreshWeather function will use the response.data get all the information we need to display.  
function refreshWeather(response){
    console.log(response.data);
    let changeCityElement = document.querySelector("#weather-city");
    let changeConditionsElement = document.querySelector("#conditions");
    let changeHumidityElement = document.querySelector("#humidity");
    let changeWindElement = document.querySelector("#wind")
    let changeIconElement = document.querySelector("#current-temperature-icon");
    let changeTempValueElement = document.querySelector("#current-temperature-value");
    
    changeCityElement.textContent = response.data.city;
    changeConditionsElement.textContent = response.data.condition.description;
    changeHumidityElement.textContent = `${response.data.temperature.humidity}%`;
    changeWindElement.textContent= `${Math.round(response.data.wind.speed)}mph`;
    changeTempValueElement.textContent = Math.round(response.data.temperature.current);
}


// this function takes the searchCity.value from the sendCitySubmitted function because we used it as an argument, and will add the city to the weatherApiUrl.
function searchForCity(city){
  let weatherApiKey = "6bccfefa354f0f4do4245dc0a56fata0";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}&units=imperial`;
  console.log(weatherApiUrl);
  axios.get(weatherApiUrl).then(refreshWeather);
}

// created the basic function to target the search city and be able to change the html to display the city name. 
function sendCitySubmitted(event){
  event.preventDefault();
  let searchCity = document.querySelector("#city-entered");


  console.log(searchCity.value);
  searchForCity(searchCity.value)
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", sendCitySubmitted);





// formatting with dates
let date = document.querySelector("#date");
let today = new Date();
let localFormat = today.toLocaleString();
let hour = today.getHours();
let localHour = today.toLocaleString(undefined, { hour: 'numeric', hour12: true });
console.log(localHour);
let minutes = today.getMinutes().toString().padStart(2, "0");
console.log(localFormat);
date.innerHTML = `${localFormat}`;
