window.addEventListener('load', ()=> {
    let lon;
    let lat;
    
    const apiKey = '28a3d5227fa2fd44181652d1533cc617'
    const temperatureInfo = document.querySelector('.temperature__description')
    const temperatureDegree = document.querySelector('.temperature__degree')
    const locationInfo = document.querySelector('.location__timezone')
    const iconInfo = document.querySelector('.weather__icon')
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
            lon = location.coords.longitude
            lat = location.coords.latitude

            const apiNow = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`

            fetch(apiNow)
            .then(response => {
                return response.json()
            })
            .then(meteo => {
                console.log(meteo)
                const {name} = meteo
                console.log(name)
                locationInfo.textContent = name
                const {temp} = meteo.main
                console.log(temp)
                temperatureDegree.textContent = Math.round(temp)
                const {description, icon} = meteo.weather[0]
                console.log(description, icon)
                temperatureInfo.textContent = description
                iconInfo.textContent = icon
                iconInfo.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"/>`            

            })

        })

    
    }
})

const apiKey = '28a3d5227fa2fd44181652d1533cc617'
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
    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

    fetch(apiCity)
        .then(response => {
            return response.json();
        })
        .then(meteoCity => {
            console.log(meteoCity)
            const {name} = meteoCity
            locationInfo.textContent = name;
            const {temp} = meteoCity.main
            console.log(temp)
            temperatureDegree.textContent = Math.round(temp);
            const {description, icon} = meteoCity.weather[0]          
            temperatureInfo.textContent = description;
            iconInfo.innerHTML = `<img src="https://openweathermap.org/img/wn/${meteoCity.weather[0].icon}@2x.png"/>`;

        });
    
    cleanfield ()

    function cleanfield() {
        document.querySelector('#city-input').value = ""
    }
}
