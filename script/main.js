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
                temperatureDegree.textContent = temp
                const {description, icon} = meteo.weather[0]
                console.log(description, icon)
                temperatureInfo.textContent = description
                iconInfo.textContent = icon
                iconInfo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`            

            })

        })

    // } else {
    //     if(!navigator.geolocation)
    //     const city_input = document.querySelector(".search__box")
    //     const search_btn = document.querySelector("#search");
    //     const apiKey = '28a3d5227fa2fd44181652d1533cc617'


    //     search_btn.addEventListener("submit", (e) => {
    //         e.preventDefault()
    //         const city = city_input.value
        
        
    //         const apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city_input}&units=metric&lang=pt_br&appid=${apiKey}`

    //     fetch(apiSearch)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(meteo => {
    //             console.log(meteo)
    //             const {name} = meteo
    //             console.log(name)
    //             locationInfo.textContent = name
    //             const {temp} = meteo.main
    //             console.log(temp)
    //             temperatureDegree.textContent = temp
    //             const {description, icon} = meteo.weather[0]
    //             console.log(description, icon)
    //             temperatureInfo.textContent = description
    //             iconInfo.textContent = icon
    //             iconInfo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`            

    //         })
    //     }}
    }
})

