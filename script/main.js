window.addEventListener('load', ()=> {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
            long = location.coords.longitude
            lat = location.coords.latitude
        })
    }else{
        // colocar aqui opção para o usuário definir a localização necessária
    }

})