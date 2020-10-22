var apiKey = "a974a19edac9a39df9bf53ab07ca4e39";

//#inputArea
    //#submit
    //#cityField

//#btnArea

//#oneDay

function oneDayFx(city){
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    var oneURL="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"";
    console.log(oneURL);

    $.ajax({
        url: oneURL,
        method: "GET"
      }).then(function(onedayobj) {
       console.log(onedayobj.name);
       //city
       console.log(onedayobj.weather[0].icon);

    //icon
    console.log(moment().format('L'))
    //date
    console.log(onedayobj.main.temp);
    //temp
    console.log(onedayobj.main.humidity);
    //hum
    //wind
    //UV
        //lon
        var lat;
        //lat
        var lon;

        //uv: lon and lat=> second ajax call nested
        //http://api.openweathermap.org/data/2.5/uvi?lat='{lat}'&lon={lon}&appid={API key}
    //     var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"

    //     $.ajax({
    //         url: uvURL,
    //         method: "GET"
    //       }).then(function(uvobj) {
    //         console.log(uvobj)
    //       });


      });

    
}

//#fiveDay

function fiveDayFx(city){
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    //calls every 3 hours, how to get to 24hour=3*8
    //run a forloop to do this 5 times (each iteration should be [i*8] so it is every24 hours)
    //date
    //icon
    //temp
    //hum
}

oneDayFx("Kansas+City");