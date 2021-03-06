$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long){
        $.ajax({
            url : "//api.wunderground.com/api/5fabe86224c61a86/geolookup/conditions/q/" + lat + "," + long + ".json",
            dataType : "jsonp",
            success : function(data) {
                console.log(data);
                var city = data['location']['city'];
                var state = data['location']['state'];
                var tempF = data['current_observation']['temp_f'];
                var feelsLike = data['current_observation']['feelslike_f'];
                var weather = data['current_observation']['weather'];
                var windDescription = data['current_observation']['wind_string'];
                var rain = data['current_observation']['precip_today_in'];
                var RtempF = Math.round(tempF);
                $('.title').append(" " + city + ", " + state);
                $("#title").text("Weather Now: " + city + ", " + state);
                $("#currentTemp").text("Temperature: " + RtempF + " \u00B0F");
                $("#summary").text(weather);
                $("#feelsLike").text("Feels Like: " + feelsLike + " \u00B0F");
                $("#windDescription").text(windDescription);
                $("#rain").text("Expected " + rain + " inches of Rain Today");
            }

        });

        $("#cover").fadeOut(250);

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str){
        return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
});
