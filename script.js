document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('city').value;

    fetch(`https://us1.locationiq.com/v1/search.php?key=pk.9c292e3133fa21c63cf621d6e0dcb503&q=${city}&format=json`)
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;

            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('weather-result');
            resultDiv.innerHTML = `<h2>${city} Weather Forecast</h2><p>Temperature: ${data.hourly.temperature_2m[0]}°C</p>`;
        })
        .catch(error => {
            console.error(error);
        });
});