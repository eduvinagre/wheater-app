window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let temperatureInfo = document.querySelector('.temperature__description')
    let temperatureDegree = document.querySelector('.temperature__degree')
    let locationInfo = document.querySelector('.location__timezone')
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
            lon = location.coords.longitude
            lat = location.coords.latitude

            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}2&key=de377140d689419fafdc6ec69f2ed890&include=minutely,alerts&lang=pt&units=M`

            // *API to 16 day forecast const api = `https://api.weatherbit.io/v2.0/forecast/daily?city=&lat=${lat}&lon=${long}&key=de377140d689419fafdc6ec69f2ed890&lang=pt&units=M&days=16`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(weather => {
                console.log(weather)
                const [{app_temp, city_name, weather:{description}}] = weather.data
                
                // //API's DOM
                temperatureDegree.textContent = app_temp
                temperatureInfo.textContent = description 
                locationInfo.textContent = city_name
            })
        })

        
    }
    // }else{
    //     // colocar aqui opção para o usuário definir a localização necessária
    // }

})

// ????Como acessar um array dentro de um objeto dentro de um objeto