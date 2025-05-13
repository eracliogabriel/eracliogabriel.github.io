// Substitua com sua chave da API do OpenWeatherMap
const API_KEY = 'SUA_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Elementos do DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Tradu��o das descri��es do tempo
const weatherDescriptions = {
    'clear sky': 'C�u limpo',
    'few clouds': 'Poucas nuvens',
    'scattered clouds': 'Nuvens dispersas',
    'broken clouds': 'Nublado',
    'shower rain': 'Chuva forte',
    'rain': 'Chuva',
    'thunderstorm': 'Tempestade',
    'snow': 'Neve',
    'mist': 'Neblina'
};

// Fun��o para buscar dados do clima
async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
        if (!response.ok) {
            throw new Error('Cidade n�o encontrada');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
    }
}

// Fun��o para atualizar as informa��es na tela
function updateWeatherInfo(data) {
    // Atualiza o �cone do tempo
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Atualiza as informa��es
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = Math.round(data.main.temp);
    description.textContent = weatherDescriptions[data.weather[0].description] || data.weather[0].description;
    feelsLike.textContent = Math.round(data.main.feels_like);
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Converte m/s para km/h
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = cityInput.value.trim();
        if (cityName) {
            getWeatherData(cityName);
        }
    }
});

// Carrega o clima de uma cidade padr�o ao iniciar
window.addEventListener('load', () => {
    getWeatherData('S�o Paulo');
}); 