const form = document.getElementById('searchForm');
const cityInput = document.getElementById('city');
const result = document.getElementById('result');
const err = document.getElementById('err');

// Set your API key here
const API_KEY = 'YOUR_REAL_API_KEY'; // Replace with your OpenWeatherMap API key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    err.textContent = 'Please enter a city name';
    result.classList.add('hidden');
    return;
  }

  err.textContent = '';
  result.classList.add('hidden');

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();
    renderWeather(data);
  } catch (e) {
    err.textContent = e.message;
  }
});

function renderWeather(data) {
  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${Math.round(data.main.temp)}°C</strong> — ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
  `;
  result.innerHTML = html;
  result.classList.remove('hidden');
}
