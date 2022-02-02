let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener("click", (e) => {

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';

});

const getWeather = async (city) => {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e57ffafcb91514aa7f9bcb953ad24c2f`,
            { mode: 'cors' }
        );

        const weatherData = await response.json();
        // console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) {
            tempIcon.src = "thunderstrom.png";
        }
        else if (id < 400 && id > 300) {
            tempIcon.src = "cloud.png";
        }
        else if (id < 600 && id > 500) {
            tempIcon.src = "rain.png";
        }
        else if (id < 700 && id > 600) {
            tempIcon.src = "snow.png";
        }
        else if (id < 800 && id > 700) {
            tempIcon.src = "cloud.png";
        }
        else if (id == 400) {
            tempIcon.src = "clean.png";
        }

    }

    catch (error) {
        alert('City not found');
    }

};

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e57ffafcb91514aa7f9bcb953ad24c2f`

            fetch(api).then((responce) => {
                return responce.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempValue.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) {
                        tempIcon.src = "thunderstrom.png";
                    }
                    else if (id < 400 && id > 300) {
                        tempIcon.src = "cloud.png";
                    }
                    else if (id < 600 && id > 500) {
                        tempIcon.src = "rain.png";
                    }
                    else if (id < 700 && id > 600) {
                        tempIcon.src = "snow.png";
                    }
                    else if (id < 800 && id > 700) {
                        tempIcon.src = "cloud.png";
                    }
                    else if (id == 400) {
                        tempIcon.src = "clean.png";
                    }

                    console.log(data);
                })
        })
    }
})