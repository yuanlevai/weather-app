const apiKey = 'a857077ead9c234f78030d0e5cc512e3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search-input');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
            return;
        }
        if (!response.ok) {
            throw new Error('Gagal mengambil data cuaca');
        }

        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'images/snow.png';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'images/mist.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'images/rain.png';
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    } catch (error) {
        console.log('terjadi kesalahan :', error.message);
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('.error').style.display = 'block';
    }
}

searchInput.addEventListener('input', function () {
    if (searchInput.value.trim() === '') {
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('.error').style.display = 'none';
        return;
    }
    checkWeather(searchInput.value);
});