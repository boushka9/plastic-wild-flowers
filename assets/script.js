$(document).ready(function () {
    //gets current date in MM/DD/YYYY format
    let currentDate = moment().format("L");


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

        // if past city is clicked, render that city again (moved inside render past city func so you don't have to refresh page to run click func)
        $("#stored-cities li").on("click", (event) => {
        //on click, get the value of the clicked list item and set that to cityName
        let runAgain = $(event.target);
        cityName = runAgain.text();
        //then run the function to render the city with the clicked cityName
        return findCity(cityName);
    })
    }


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
            $("#icon").html(`<img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`);
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
            const weatherCards = document.querySelectorAll(".cards");
            for (var i = 0; i < weatherCards.length; i++){
                weatherCards[i].innerHTML ="";
                //get date for each i and create and set html element/value and append to weather cards i string
                let forcastDate = moment().add(1 + i, "days").format("l");
                let forcastDateEl = document.createElement("p");
                forcastDateEl.innerHTML = forcastDate;
                weatherCards[i].append(forcastDateEl);

                //get icon for each i and create and set html element/value and append to weather cards i string
                let forcastIcon = response.list[i].weather[0].icon;
                let forcastIconEl = document.createElement("img");
                forcastIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${forcastIcon}@2x.png`);
                weatherCards[i].append(forcastIconEl);

                //get temp for each i and create and set html element/value and append to weather cards i string
                let forcastTemp = response.list[i].main.temp;
                let forcastTempEl = document.createElement("p");
                forcastTempEl.innerHTML = "Temp: " + forcastTemp + "° (F)";
                weatherCards[i].append(forcastTempEl);

                // get humidity for each i and create and set html element/value and append to weather cards i string
                let forcastHum = response.list[i].main.humidity;
                let forcastHumEl =document.createElement("p");
                forcastHumEl.innerHTML = "Humidity: " + forcastHum + "%"
                weatherCards[i].append(forcastHumEl);
                
                // get wind speed for each i and create and set html element/value and append to weather cards i string
                let forcastWind = response.list[i].wind.speed;
                let forcastWindEl = document.createElement("p");
                forcastWindEl.innerHTML = "Wind: " + forcastWind + "mph";
                weatherCards[i].append(forcastWindEl);
            }
            

        })

    
    };

});  


        