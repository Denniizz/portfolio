import { setupModal } from "../modal.js";

setupModal("weatherCard", "weatherWindow", "weatherCloseBtn");

const apiKey = "";
const cityInput = document.getElementById("cityInput");
const searchWeatherBtn = document.getElementById("searchWeatherBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        searchWeatherBtn.click();
    }
});

searchWeatherBtn.addEventListener("click", async () => {

    const city = cityInput.value.trim();

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            cityName.textContent = "❌ City not found";
            return;
        }

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {
        cityName.textContent = "Error fetching weather";
    }

    getForecast(city);
});

const forecastContainer = document.getElementById("forecastContainer");

async function getForecast(city) 
{
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") return;

    forecastContainer.innerHTML = "";

    const dailyData = [];

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyData.find(d => d.date === date)) 
        {
            dailyData.push({
                date,
                temp: item.main.temp,
                icon: item.weather[0].icon,
                desc: item.weather[0].description
            });
        }
    });

    dailyData.slice(0, 5).forEach(day => {

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${day.date}</p>
            <img src="https://openweathermap.org/img/wn/${day.icon}.png">
            <p>${Math.round(day.temp)}°C</p>
        `;

        forecastContainer.appendChild(card);
    });
}