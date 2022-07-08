

const apiKey = config.API_KEY;

const fahrenheit = (K) => { 
    temp = (K-273.15)*1.8+32
    temp = `${parseInt(temp)}${'\u2109'}`
    return temp
}

const celsius = (K) => {
    temp = (K-273.15)
    temp = `${parseInt(temp)}${'\u2103'}`
    return temp
}

const DOM_Elements = {
    widget: '.widget'
}

const createWidget = (city, country, current, feels, high, low, forecast, icon) => {
    const html = `
    <div class="card shadow-0 border">
        <div class="card-body p-4">
            <h4 class="mb-1 sfw-normal">${city}, ${country}</h4>
            <p class="mb-2">Current temperature: <strong>${current}</strong></p>
            <p>Feels like: <strong>${feels}</strong></p>
            <p>Max: <strong>${high}</strong>, Min: <strong>${low}</strong></p>

            <div class="d-flex flex-row align-items-center">
                <p class="mb-0 me-4">${forecast}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="">
            </div>
        </div>
    </div>`
    document.querySelector(DOM_Elements.widget).insertAdjacentHTML('beforeend',html)
}

const clearWidget = () => document.querySelector(DOM_Elements.widget).innerHTML = ''

// create a form variable
const form = document.querySelector("#testForm")

// Listen for form submittal
console.log(form)
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    let city = document.querySelector("#citySearch")
    console.log(city.value)
    if (document.getElementById('inlineRadio1').checked){
        loadDataC(city.value)
    } else if (document.getElementById('inlineRadio2').checked){
        loadDataF(city.value)
    } else {loadDataF(city.value)}
})

// create radio variables
const radio1 = document.querySelector("#inlineRadio1")

const radio2 = document.querySelector("#inlineRadio2")

// Listen for radio clicks
radio1.addEventListener('click', () =>{
    let city = document.querySelector("#citySearch")
    if (city.value) {
        clearWidget()
        loadDataC(city.value)
    }
})

radio2.addEventListener('click', () =>{
    let city = document.querySelector("#citySearch")
    if (city.value) {
        clearWidget()
        loadDataF(city.value)
    }
})


const getData = async (city_name) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`)
    console.log(response.data)
    return response.data
}


const loadDataC = async (city_name) => {
    clearWidget()
    const weatherInfo = await getData(city_name);
    // Create variables for widget
    let forecast = weatherInfo.weather[0].main;
    let current = celsius(weatherInfo.main.temp);
    let feels = celsius(weatherInfo.main.feels_like);
    let high = celsius(weatherInfo.main.temp_max);
    let low = celsius(weatherInfo.main.temp_min);
    let city = weatherInfo.name;
    let country = weatherInfo.sys.country;
    let icon = weatherInfo.weather[0].icon
    // use createWidget() to create weather display
    console.log(`${forecast} ${high}`)
    createWidget(city, country, current, feels, high, low, forecast, icon)
}

const loadDataF = async (city_name) => {
    clearWidget()
    const weatherInfo = await getData(city_name);
    // Create variables for widget
    let forecast = weatherInfo.weather[0].main;
    let current = fahrenheit(weatherInfo.main.temp);
    let feels = fahrenheit(weatherInfo.main.feels_like);
    let high = fahrenheit(weatherInfo.main.temp_max);
    let low = fahrenheit(weatherInfo.main.temp_min);
    let city = weatherInfo.name;
    let country = weatherInfo.sys.country;
    let icon = weatherInfo.weather[0].icon
    // use createWidget() to create weather display
    console.log(`${forecast} ${high}`)
    createWidget(city, country, current, feels, high, low, forecast, icon)
}

const clicked = () => {
    console.log('success')
}
