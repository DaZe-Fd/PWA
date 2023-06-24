const input = document.querySelector('.city_input')
const button = document.querySelector('.check')
const img = document.querySelector('img')
const errorMsg = document.querySelector('.error')
const cityName = document.querySelector('.city_name')
const tempDescription = document.querySelector('.temperature_descripton')
const tempFeel = document.querySelector('.feels_like')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind_speed')
const clouds = document.querySelector('.clouds')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=88533a71be00f4b90f284d3b2b5c2d3a'
// 88533a71be00f4b90f284d3b2b5c2d3a
const apiUnits = '&units=metric'
const apiLang = '&lang=pl'

function getWeather() {
	const apiCity = input.value
	const URL = apiLink + apiCity + apiKey + apiUnits + apiLang
	console.log(URL)

	axios
		.get(URL)
		.then(response => {
			console.log(response.data)
			clouds.textContent = `${response.data.clouds.all} %`
			windSpeed.textContent = `${response.data.wind.speed} km/h`
			humidity.textContent = `${response.data.main.humidity} %`
			pressure.textContent = `${response.data.main.pressure} hPa`
			tempFeel.textContent = `${response.data.main.feels_like} ℃`
			cityName.textContent = `${response.data.name}`
			img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
			tempDescription.textContent = `${response.data.weather[0].description}`
			errorMsg.textContent = ''
			
		})
		.catch(error => {
			if (error.response.data.cod !== '200') {
				errorMsg.textContent = `${error.response.data.message}`
			}
			;[clouds, windSpeed, humidity, pressure, tempFeel, tempDescription, cityName]
			forEach(el => {
				el.textContent = ''
			})
			img.src = ''
		})
		.finally(() => {
			input.value = ''
		})
}

button.addEventListener('click', getWeather)
