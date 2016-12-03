$(".now").hide();
$('#query').keyup(function(){
    // All code will be inside of this block
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);

        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page

    }); // end getJSON

}); // end keyup

// Get weather data from wunderground.com
function getData(lat, lon) {
    // Get the data from the wunderground API
    $.ajax({
        url: "//api.wunderground.com/api/5fabe86224c61a86/geolookup/conditions/forecast/q/" + lat + "," + lon + ".json",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            var city = data['location']['city'];
            var state = data['location']['state'];
            var high = data.forecast.simpleforecast.forecastday["0"].high.fahrenheit;
            var low = data.forecast.simpleforecast.forecastday["0"].low.fahrenheit;
            var summary = data.current_observation.weather;
            var icon = data.current_observation.icon;
            var iconurl = "//icons.wxug.com/i/c/k/" +icon+ ".gif";
            var wind = data.current_observation.wind_string;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f);
            $('.title').append(" " + city + ", " + state);
            $("#title").text("Weather Now: " + city + ", " + state);
            $("#currentTemp").text("Temperature: " + Math.round(temp_f) + " \u00B0F");
            $("#summary").text(summary);
            $("#high").text("Today's High: " + Math.round(high) + " \u00B0F");
            $("#low").text("Today's Low: " + Math.round(low) + " \u00B0F");
            $(".nowicon").html('<img src=' + iconurl + ' alt=' + icon + ' class= nowicon>');
            $("#windDescription").text(wind)
            $("#cover").fadeOut(250);
        }
    });
}

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    $('#searchResults').hide();
    $('#srchfrm').hide();
    $('.now').show();
    $('.nowS').css("height", "450px");
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    $.ajax({
        url:"//api.wunderground.com/api/5fabe86224c61a86/geolookup/conditions/q/" + jsonCity + ".json",
        dataType: "jsonp",
        success: function (data) {
            var lat = data.location.lat
            var lon = data.location.lon
            //console.log(data);
            //console.log(data[jsonCity]);
            //var zip = data[jsonCity].zip;
            //console.log(zip);
            getData(lat, lon);
        }
    });
});

// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

