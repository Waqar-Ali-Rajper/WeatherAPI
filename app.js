document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value.trim();
    const apiKey = 'c57bcaaeae89125e26269e74d39f5152';  // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                document.querySelector('.card').style.display = 'block';
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                document.getElementById('feelsLike').textContent = `Feels like: ${data.main.feels_like} °C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
            } else {
                document.querySelector('.card').style.display = 'none';
                document.getElementById('cityName').textContent = 'City not found';
                document.getElementById('temperature').textContent = '';
                document.getElementById('feelsLike').textContent = '';
                document.getElementById('description').textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('.card').style.display = 'none';
            document.getElementById('cityName').textContent = 'Error fetching weather data';
            document.getElementById('temperature').textContent = '';
            document.getElementById('feelsLike').textContent = '';
            document.getElementById('description').textContent = '';
        });
});
