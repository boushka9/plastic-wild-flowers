$(document).ready(function () {
    //gets current date in MM/DD/YYYY format
    let currentDate = moment().format("L");
    // add one day for each five day forcast
    let date1 = moment().add(1, "days").format("l");
    let date2 = moment().add(2, "days").format("l");
    let date3 = moment().add(3, "days").format("l");
    let date4 = moment().add(4, "days").format("l");
    let date5 = moment().add(5, "days").format("l");



   //set city to Austin and run func to get weather so page isn't blank on first load
    function defaultCity() {
        cityName = "Austin";
        findCity();
    }
    //call on page load
    defaultCity();

    //cityHistory is retrieved w key city (if no history = empty array)
    let cityHistory = JSON.parse(localStorage.getItem("city")) || [];


    //Listen for submit on click button then run finction to get city name and plug it into api call
    //On click, the city name is also saved to the cityHistory local storage
    $("#get-results").on("click", (event) => {
        event.preventDefault();
        getCityName();
        findCity();
        // If city name is not in cityHistory, add it to localStorage
        if (cityHistory.includes(cityName) === false) {
            cityHistory.push(cityName);
            localStorage.setItem("city", JSON.stringify(cityHistory));
        }
        //ignore portion of array that is already rendered, only what is not listed on screen will apear
        $("#stored-cities").html("");
        //on submit click, run func to render, stop render after ten 
        for (var i = 0; i < cityHistory.length && i < 10; i++) {
            renderPastCity(cityHistory[i]);
        }

    })

    // on page load, for each city i city history, run func to render, stop render after ten 
    for (var i = 0; i < cityHistory.length && i < 10; i++) {
        renderPastCity(cityHistory[i]);
    }

    //create a list item for each city
    function renderPastCity(cityText) {
        let cityItem = $("<li>").addClass("city-li").text(cityText);
        $("#stored-cities").append(cityItem);
    }

    // if past city is clicked, render that city again
    $("#stored-cities li").on("click", (event) => {
        //on click, get the value of the clicked list item and set that to cityName
        let runAgain = $(event.target);
        cityName = runAgain.text();
        //then run the function to render the city with the clicked cityName
        return findCity(cityName);
    })

     // clear local storage 
     $("#clear").on("click", () => {
        localStorage.removeItem("city");
        $("#stored-cities").empty();
     })

    // city name = input box, must have a name written in it
    function getCityName() {
        cityName = $("#city-name").val();
        // if input box empty, dont't run
        if (!cityName) {
            window.alert("Please enter a city name");
            return;
        } else {
            return cityName;
        }
        
    }


    // API searches for inputed city name
    function findCity() {
        

        $.ajax({

            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=cb32126a8e0dc1a5be8e3ad121f71997",

            method: "GET",

        }).then(function (response) {

            //weather variables from api
            let cityID = response.id;
            let currentName = response.name;
            let currentIcon = response.weather[0].icon;
            let currentTemp = response.main.temp;
            let currentHum = response.main.humidity;
            let currentWind = response.wind.speed;

            //render variables from api onto page
            $("#current-name").text(currentName);
            $("#current-date").text(currentDate);
            $("#icon").html(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`);
            $("#current-temp").text("Current Tempurature in (F): " + currentTemp + "°");
            $("#humidity").text("Current Humidity Levels: " + currentHum + "%");
            $("#wind").text("Current Wind Speeds: " + currentWind + "mph");


            getFiveDays(cityID);
        })
    }


    function getFiveDays(cityID) {
        //get five day forcast using the city id from the prev. api call
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial&appid=cb32126a8e0dc1a5be8e3ad121f71997",
            method: "GET",
        }).then(function (response) {
            //variables for each days icon
            let icon1 = response.list[0].weather[0].icon;
            let icon2 = response.list[1].weather[0].icon;
            let icon3 = response.list[2].weather[0].icon;
            let icon4 = response.list[3].weather[0].icon;
            let icon5 = response.list[4].weather[0].icon;
            //variables for each days temp
            let temp1 = response.list[0].main.temp;
            let temp2 = response.list[1].main.temp;
            let temp3 = response.list[2].main.temp;
            let temp4 = response.list[3].main.temp;
            let temp5 = response.list[4].main.temp;
            //variables for each days humidity
            let hum1 = response.list[0].main.humidity;
            let hum2 = response.list[1].main.humidity;
            let hum3 = response.list[2].main.humidity;
            let hum4 = response.list[3].main.humidity;
            let hum5 = response.list[4].main.humidity;
            //variables for each days wind speed
            let wind1 = response.list[0].wind.speed;
            let wind2 = response.list[1].wind.speed;
            let wind3 = response.list[2].wind.speed;
            let wind4 = response.list[3].wind.speed;
            let wind5 = response.list[4].wind.speed;

            console.log(wind1);
            
            //set variables from api to the text/html to render onto the screen
            $("#date1").text(date1);
            $("#date2").text(date2);
            $("#date3").text(date3);
            $("#date4").text(date4);
            $("#date5").text(date5);

            $("#icon1").html(`<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`);
            $("#icon2").html(`<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`);
            $("#icon3").html(`<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`);
            $("#icon4").html(`<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`);
            $("#icon5").html(`<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`);

            $("#temp1").text("Temp: " + temp1 + "°");
            $("#temp2").text("Temp: " + temp2 + "°");
            $("#temp3").text("Temp: " + temp3 + "°");
            $("#temp4").text("Temp: " + temp4 + "°");
            $("#temp5").text("Temp: " + temp5 + "°");

            $("#hum1").text(hum1 + "%");
            $("#hum2").text(hum2 + "%");
            $("#hum3").text(hum3 + "%");
            $("#hum4").text(hum4 + "%");
            $("#hum5").text(hum5 + "%");

            $("#wind1").text("Wind: " + wind1 + "mph");
            $("#wind2").text("Wind: " + wind2 + "mph");
            $("#wind3").text("Wind: " + wind3 + "mph");
            $("#wind4").text("Wind: " + wind4 + "mph");
            $("#wind5").text("Wind: " + wind5 + "mph");

            //TO THE GRADER: I would apreciate constructive criticism on how to render the five days in a for loop


        })

    
    };

});  


