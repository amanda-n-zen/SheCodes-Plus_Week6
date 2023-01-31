//todays date
let now = new Date();

let today = document.querySelector("#dateTime");

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
let month = months[now.getMonth()];
let monthdate = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

if (hour < 10) {
  today.innerHTML = `${day}, ${month} ${monthdate}, $0{hour}:${minute}`;
} else {
  today.innerHTML = `${day}, ${month} ${monthdate}, ${hour}:${minute}`;
}

if (minute < 10) {
  today.innerHTML = `${day}, ${month} ${monthdate}, ${hour}:0${minute}`;
} else {
  today.innerHTML = `${day}, ${month} ${monthdate}, ${hour}:${minute}`;
}

// Change to correct city when search and prevent default

// Show temperature for that city
function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `Current: ${Math.round(
    response.data.main.temp
  )}°C`;

  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  temperatureDescription.innerHTML = `${response.data.weather[0].description}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
}

function handleCity(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  handleCity(searchInput.value);
}
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", getCity);
