window.addEventListener('load', ()=> {
    let lon;
    let lat;

    //API Keys - first for current weather and the other for the forecast

    const apiKey = /get your key in here
    const apiKey2 = /get your key in here

    const temperatureInfo = document.querySelector('.temperature__description')
    const temperatureDegree = document.querySelector('.temperature__degree')
    const locationInfo = document.querySelector('.location__timezone')
    const iconInfo = document.querySelector('.weather__icon')
    const realFeel = document.querySelector('.temperature__degree__feelslike_value')
    const maxTemp = document.querySelector('.temperature__container__max__degree')
    const minTemp = document.querySelector('.temperature__container__min__degree')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
            lon = location.coords.longitude
            lat = location.coords.latitude

            const apiNow = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`
            const apiDaily = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&lang=pt&units=M&key=${apiKey2}`    
        
            //WORKING WITH API GETTING A RESPONSE JSON ARRAY

            fetch(apiNow)
            .then(response => {
                return response.json()
            })
            .then(meteo => {
                console.log(meteo)
                const {name} = meteo
                console.log(name)
                locationInfo.textContent = name
                const {temp, feels_like} = meteo.main
                console.log(temp, feels_like)
                temperatureDegree.textContent = Math.round(temp)
                realFeel.textContent = Math.round(feels_like)
                //I HAD TO TAKE THE PRESSURE OUT CAUSE THE API IS FAILING RESPONDING
                // const {pressure} = meteo.main
                // console.log(pressure)
                // pressureInfo.textContent = pressure
                const {description, icon} = meteo.weather[0]
                console.log(description, icon)
                temperatureInfo.textContent = description
                iconInfo.textContent = icon
                iconInfo.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"/>`            

            })

            // WORKING WITH THE FORECAST API

            fetch(apiDaily)
            .then(response1 => {
                return response1.json()
            })
            .then(forecast => {
                console.log(forecast)
                const {max_temp, min_temp, } = forecast.data[0]
                maxTemp.textContent = Math.round(max_temp)
                minTemp.textContent = Math.round(min_temp)
            })

        })

    
    }
})


// SEARCHING CODE - API'S for user input in search city


const apiKey = '28a3d5227fa2fd44181652d1533cc617'
const apiKey2 = 'de377140d689419fafdc6ec69f2ed890'
const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', searchCity)

function clearInput () {
    document.getElementById("#city-input").reset()
}

function searchCity() {
    const city = document.querySelector('#city-input').value
    const temperatureInfo = document.querySelector('.temperature__description')
    const temperatureDegree = document.querySelector('.temperature__degree')
    const locationInfo = document.querySelector('.location__timezone')
    const iconInfo = document.querySelector('.weather__icon')
    const realFeel = document.querySelector('.temperature__degree__feelslike_value')
    const maxTemp = document.querySelector('.temperature__container__max__degree')
    const minTemp = document.querySelector('.temperature__container__min__degree')


    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const apiDailyCity = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&lang=pt&units=M&key=${apiKey2}`    

    
    fetch(apiCity)
        .then(response => {
            return response.json();
        })
        .then(meteoCity => {
            console.log(meteoCity)
            const {name} = meteoCity
            locationInfo.textContent = name;
            const {temp, feels_like} = meteoCity.main
            console.log(temp, feels_like)
            temperatureDegree.textContent = Math.round(temp)
            realFeel.textContent = Math.round(feels_like)
            const {description, icon} = meteoCity.weather[0]          
            temperatureInfo.textContent = description;
            iconInfo.innerHTML = `<img src="https://openweathermap.org/img/wn/${meteoCity.weather[0].icon}@2x.png"/>`;

        })

        fetch(apiDailyCity)
            .then(response1 => {
                return response1.json()
            })
            .then(forecastCity => {
                console.log(forecastCity)
                const {max_temp, min_temp, } = forecastCity.data[0]
                maxTemp.textContent = Math.round(max_temp)
                minTemp.textContent = Math.round(min_temp)
            })
    
    // FUNCTIONS 
    // RESETS USER INPUT
    // ADDS FOCUS ON INPUT FIELD
    // ADDS AN ALERT IF THE SEARCH IS MADE WITH BLANK INPUT
    
    validateInput()
    clearField ()
    

    function validateInput() {
        if(city == '') {
            alert('O nome da cidade não pode estar em branco')
        }
    }

    function clearField() {
        document.querySelector('#city-input').value = ""
        document.querySelector('#city-input').focus()
        
    }

    
}

//YASMART WEATHER IS AN APP I MADE TO HONOUR MY WIFE, MY DAUGHTER YASMIN AND MY SON ARTHUR. LOVE YOU! 

//TKS MOM, YOU'RE THE BEST!

//AlSO BIG SHOUT OUT TO MATHEUS PEREIRA AND ALEXANDRE MARIANO FOR HELPING ME ALONG THE PROJECT

