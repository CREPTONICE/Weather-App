const box = document.querySelector(".weather_box");
const search = document.getElementById("maglass");
const middle = document.querySelector(".middle");
const bottom = document.querySelector(".bottom");
const error = document.querySelector(".not_found");

search.addEventListener("click", () => {
  const APIKEY = `09e469b06d5e3c1afc70e52c16ec3823`;
  const city = document.getElementById("search").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        box.style.height = "400px";
        middle.style.display = "none";
        bottom.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      const image = document.querySelector(".middle img");
      const temprature = document.querySelector(".middle .middle_temprature");
      const description = document.querySelector(".middle .middle_description");
      const humidity = document.getElementById("humidity");
      const wind = document.getElementById("wind");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "clear.png";
          break;

        case "Clouds":
          image.src = "cloud.png";
          break;

        case "Mist":
          image.src = "mist.png";
          break;

        case "Rain":
          image.src = "rain.png";
          break;

        case "Snow":
          image.src = "snow.png";
          break;

        default:
          image.src = "";
      }

      temprature.innerHTML = `${parseInt(json.main.temp)}`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      middle.style.display = "";
      bottom.style.display = "";
      middle.classList.add("fadeIn");
      bottom.classList.add("fadeIn");
      box.style.height = "490px";
    });
});
