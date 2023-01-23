$(document).ready(function () {
    //gets current date in MM/DD/YYYY format
    let currentDate = moment().format("L");

    // add a # of days from current day to get dates for 5-day forcast
    let day1date = moment().add(1, "days").format("L");
    let day2date = moment().add(2, "days").format("L");
    let day3date = moment().add(3, "days").format("L");
    let day4date = moment().add(4, "days").format("L");
    let day5date = moment().add(5, "days").format("L");

   //set city to Austin and run func to get weather so page isn't blank on first load
    function defaultCity() {
        cityName ="Austin";
        findCity();
    }
    //call on page load
    defaultCity();

    //cityHistory is retrieved w key city
    let cityHistory = JSON.parse(localStorage.getItem("city")) || [];


    //Listen for submit on click button then run finction to get city name and plug it into api call
    //On click, the city name is also saved to the cityHistory local storage
    $("#get-results").on("click", (event) => {
        event.preventDefault();
        getCityName();
        findCity();
        cityHistory.push(cityName);
        localStorage.setItem("city", JSON.stringify(cityHistory));
        console.log(cityHistory);
    })


    //Listen for submit on click button then run finction to get city name and plug it into api call
    $("#get-results").on("click", (event) => {
        event.preventDefault();
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

    // API searches for inputed city name

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

            //render variables from api onto page
            $("#current-name").html(currentName);
            $("#current-date").text(currentDate);
            $("#icon").html(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`);
            $("#current-temp").text("Current Tempurature in (F): " + currentTemp + "°");
            $("#humidity").text("Current Humidity Levels: " + currentHum + "%");
            $("#wind").text("Current Wind Speeds: " + currentWind + "mph");
        })
    }
        findCity();

})
