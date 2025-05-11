const apiKey = "e46743d5f976b0befb0cb120c5603ecd";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const [weatherResponse, hourlyResponse] = await Promise.all([
            fetch(url),
            fetch(hourlyUrl)
        ]);

        const weatherData = await weatherResponse.json();
        const hourlyData = await hourlyResponse.json();

        if (weatherData.cod !== 200) {
            document.getElementById("weatherResult").innerHTML = `<p>${weatherData.message}</p>`;
            return;
        }

        let hourlyForecast = "<h3>Hourly Forecast</h3><ul style='display: flex; gap: 10px; overflow-x: auto;'>";
        for (let i = 0; i < 5; i++) {
            let hour = hourlyData.list[i];
            hourlyForecast += `<li style='list-style: none; padding: 10px; solid #ddd;'>
                <p><strong>${new Date(hour.dt_txt).getHours()}:00</strong></p>
                <p>${hour.main.temp}°C</p>
                <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="Weather Icon">
            </li>`;
        }
        hourlyForecast += "</ul>";

        document.getElementById("weatherResult").innerHTML = `
            <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>${weatherData.weather[0].description}</p>
            <p><strong>${weatherData.main.temp}°C</strong></p>
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon">
            ${hourlyForecast}
        `;
        
        document.getElementById("cityInput").value = ""; 
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
