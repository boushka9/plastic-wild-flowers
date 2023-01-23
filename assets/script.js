$(document).ready(function () {


    //gets current date in MM/DD/YYYY format
    let currentDate = moment().format("L");

    // add a # of days from current day to get dates for 5-day forcast
    let day1date = moment().add(1, "days").format("L");
    let day2date = moment().add(2, "days").format("L");
    let day3date = moment().add(3, "days").format("L");
    let day4date = moment().add(4, "days").format("L");
    let day5date = moment().add(5, "days").format("L");

   //set default city to austin so page isn't blank on first load

   //past searches are retrieved from local storage w key pastCities

    //let pastCities = JSON.parse(localStorage.getItem(pastCities)) || [];

    //Func to load past searched cities from local storage 

    //Get city name from the input city form
    $("#get-results").on("click", (event) => {
        event.preventDefault();
        $("#city-name").val();
        getCityName();
        findCity();
    })

    function getCityName() {
        cityName = $("#city-name").val();

        if (!cityName) {
            window.alert("Please enter a city name");
            return;
        } else {
            return cityName;
        }
    }



    // API searches for given city - SET TO AUSTIN FOR SETUP
    function findCity() {
        
        let coords = [];

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=cb32126a8e0dc1a5be8e3ad121f71997",
            method: "GET",

        }).then(function (response) {
            //response returns from lat/lon of city
            coords.push(response.coord.lat);
            coords.push(response.coord.lon);

            //weather variables from api
            let currentName = response.name;
            let currentIcon = response.weather[0].icon;
            let currentTemp = response.main.temp;
            let currentHum = response.main.humidity;
            let currentWind = response.wind.speed;
        
            $("#current-name").html(currentName);
            $("#current-date").text(currentDate);
            $("#icon").html(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`);
            $("#current-temp").text("Current Tempurature in (F): " + currentTemp + "°");
            $("#humidity").text("Current Humidity Levels: " + currentHum + "%");
            $("#wind").text("Current Wind Speeds: " + currentWind + "mph");
        })
    }

    // findCity();
})
