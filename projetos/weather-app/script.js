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

// Tradução das descrições do tempo
const weatherDescriptions = {
    'clear sky': 'Céu limpo',
    'few clouds': 'Poucas nuvens',
    'scattered clouds': 'Nuvens dispersas',
    'broken clouds': 'Nublado',
    'shower rain': 'Chuva forte',
    'rain': 'Chuva',
    'thunderstorm': 'Tempestade',
    'snow': 'Neve',
    'mist': 'Neblina'
};

// Função para buscar dados do clima
async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
    }
}

// Função para atualizar as informações na tela
function updateWeatherInfo(data) {
    // Atualiza o ícone do tempo
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Atualiza as informações
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

// Carrega o clima de uma cidade padrão ao iniciar
window.addEventListener('load', () => {
    getWeatherData('São Paulo');
}); 