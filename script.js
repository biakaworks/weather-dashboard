var apiKey = "a974a19edac9a39df9bf53ab07ca4e39";


//#inputArea
    //#submit
    //#cityField

//#btnArea

//#oneDay

//API KEY


function oneDayFx(city){

    var oneURL="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"";
    console.log(oneURL)

    $.ajax({
        url: oneURL,
        method: "GET"
      })
      .then(function(onedayobj) {

        /*
         <div>
          <p>
            City Icon Date
          </p>
          <p>Temp</p>
          <p>Wind Speed</p>
          <p>Humidity</p>
          <p>UV</p>

        </div>
         */

           
          
        var div=$("<div>");
        var temp=$("<p>");
        temp.text(onedayobj.name+" "+onedayobj.weather[0].icon+" "+moment().format('L'))
        var windSpeed=$("<p>");
       // windSpeed.text()
        var humidity=$("<p>");
        // humidy.text()
        var uv=$("<p>");

        //stick it all togheter here
        div.append(temp)
        div.append(windSpeed)
        div.append(humidity)
        div.append(uv)

        //#oneDay
        $("#oneDay").append(div)
   

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
        var lat= onedayobj.coord.lat
        ;
        //lat
        var lon= onedayobj.coord.lon

        //uv: lon and lat=> second ajax call nested
        // http://api.openweathermap.org/data/2.5/uvi?lat='{lat}'&lon={lon}&appid={API key}
        var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey+""
        console.log(uvURL)

        $.ajax({
            url: uvURL,
            method: "GET"
          }).then(function(uvobj) {
            console.log(uvobj.value)
            uv.text(uvobj.value)
    
          });




      });

    
}

//#fiveDay

function fiveDayFx(city){
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

    var urlFiveDay="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+""
    console.log(urlFiveDay)
    //calls every 3 hours, how to get to 24hour=3*8
    //run a forloop to do this 5 times (each iteration should be [i*8] so it is every24 hours)
    //date
    //icon
    //temp
    //hum
    $.ajax({
        url: urlFiveDay,
        method: "GET"
      }).then(function(fiveDayobj) {
        console.log(fiveDayobj.list)
        var i;
for (i = 0; i < 5; i++) {
    console.log(fiveDayobj.list[i*8].dt_txt)
    console.log(moment(fiveDayobj).format('L'))
    var iconurl = "http://openweathermap.org/img/w/" + fiveDayobj.list[i*8].weather[0].icon + ".png";
    console.log(iconurl)

    console.log(fiveDayobj.list[i*8].main.temp)
    console.log(fiveDayobj.list[i*8].main.humidity)

    /*
         <div>
          <p>
           Date
          </p>
          <p>Temp</p>
          <p>Humidity</p>
          <p><img src="hhtp"></p>

        </div>
         */

         //#fiveDay
}
        

      });
}


fiveDayFx("Reno");