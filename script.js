document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const cityValue = document.getElementById('city').value;
    const city = cityValue.charAt(0).toUpperCase() + cityValue.slice(1);

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
            resultDiv.innerHTML = `<h2>${city}</h2> <h3>${data.hourly.temperature_2m[0]}°C</h3>`;
        })
        .catch(error => {
            console.error(error);
        });
});