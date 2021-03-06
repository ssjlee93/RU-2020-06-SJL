$(document).ready(function () {
    var cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"];
    var lat;
    var lon;
    var APIkey = "e1744359027cd03c7ab52626ecd3d11f";
    var city;

    var allt = $("div.card").find("span.t");
    var allh = $("div.card").find("span.h");
    var alld = $("div.card").find("span.d");
    var alli = $("div.card").find("img.i");

    var temps = [];
    var hums = [];
    var dates = [];
    var icons = [];
    var imgAlts = [];

    function lastCities() {
        if (localStorage.getItem("cities") === null) {
            cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"]
        } else {
            cities = JSON.parse(localStorage.getItem("cities"));
            console.log(JSON.parse(localStorage["cities"]));
        }
        addCity();

        return;
    }

    function addCity() {
        $("#cities").empty();
        for (var i = 0; i < cities.length; i++) {
            var newCity = $("<li>");
            newCity.addClass("list-group-item list-group-item-action city");
            newCity.attr("data-city", cities[i]);
            newCity.text(cities[i]);
            $("#cities").append(newCity);
        }
    }

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#search").val().trim();
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
        console.log(localStorage.getItem("cities"))
        addCity();

        $("#search").val("");
    });

    function cityForecast() {
        city = $(this).attr("data-city");
        localStorage.setItem("city", city);
        temps = [];
        hums = [];
        dates = [];
        icons = [];
        imgAlts = [];

        forecasts();
    }

    function lastForecast() {
        city = localStorage.getItem("city")
        forecasts();

        return;
    }

    function forecasts() {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
        $(".uv").removeClass("bg-success bg-danger bg-warning");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //print city name at the top 
            var city = response.city.name;
            $("#cityName").text(city);
            var windspeed = response.list[0].wind.speed;
            $(".w").text(windspeed);
            //print temperature, humidity, and the icon using .find method. 
            //.find the class in <span> to create a new object collection, 
            //then loop through the object and response to print temperature, humidity, and icon \
            console.log(response);
            for (var i = 0; i < response.list.length; i += 8) {
                var temperature = response.list[i].main.temp;
                var humidity = response.list[i].main.humidity;
                var dateUnix = (response.list[i].dt) * 1000;
                var date = new Date(dateUnix).toLocaleDateString("en-US");
                var iconCode = response.list[i].weather[0].icon;
                var iconAlt = response.list[i].weather[0].description;
                var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
                temps.push(temperature);
                hums.push(humidity);
                dates.push(date);
                icons.push(iconURL);
                imgAlts.push(iconAlt);
                i--;

            }

            for (var i = 0; i < 6; i++) {
                allt.eq(i).text(temps[i]);
                allh.eq(i).text(hums[i]);
                alld.eq(i).text(dates[i]);
                alli.eq(i).attr("src", icons[i]);
                alli.eq(i).attr("alt", imgAlts[i]);
            }
            //make another ajax call for UV index 
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            printUV();

        });
    };

    function printUV() {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            $(".uv").text(response.value);
            console.log(response);
            if (response.value < 3) {
                $(".uv").addClass("bg-success");
            } else if (response.value < 6) {
                $(".uv").addClass("bg-warning");
            } else {
                $(".uv").addClass("bg-danger");
            }
        })

    }

    function clear() {
        $("#cities").empty();
        cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"];

        addCity();
    }

    console.log(localStorage)
    lastForecast();
    lastCities();
    $(document).on("click", ".city", cityForecast);
    $("#clearBtn").on("click", clear);
});