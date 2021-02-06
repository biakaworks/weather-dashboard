var apiKey = "a974a19edac9a39df9bf53ab07ca4e39";
//array to contain city
//if we have data, get it from ls else use an empty array
//checkit from ls
//getls
var movies=[];
localStorage.getItem("cityWeather");
console.log(localStorage.getItem("cityWeather"));
if (localStorage.getItem("cityWeather")){
    movies=JSON.parse(localStorage.getItem("cityWeather"));
}else {movie=[]}


function oneDayFx(city){
    $("#oneDay").empty()

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
        var cid=$("<p>");
        cid.text(onedayobj.name+" "+onedayobj.weather[0].icon+" "+moment().format('L'))
        var temp=$("<p>");
        temp.text()
        var windSpeed=$("<p>");
        windSpeed.text(onedayobj.wind.speed)
        var humidity=$("<p>");
        humidity.text()
        var uv=$("<p>");
        uv.text()

        //stick it all togheter here
        div.append(cid)
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
    $("#fiveDay").empty()

    var urlFiveDay="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+""
    console.log(urlFiveDay)
    //calls every 3 hours, how to get to 24hour=3*8
    //run a forloop to do this 5 times (each iteration should be [i*8] so it is every24 hours)

    $.ajax({
        url: urlFiveDay,
        method: "GET"
      }).then(function(fiveDayobj) {
        console.log(fiveDayobj.list)
        var i;
for (i = 0; i < 5; i++) {
    console.log(fiveDayobj.list[i*8].dt_txt)
    console.log(moment(fiveDayobj.list[i*8].dt_txt).format('L'))
    var iconurl = "http://openweathermap.org/img/w/" + fiveDayobj.list[i*8].weather[0].icon + ".png";
    console.log(iconurl)

    console.log(fiveDayobj.list[i*8].main.temp)
    console.log(fiveDayobj.list[i*8].main.humidity)

    var div=$("<div>");
    var temp=$("<p>");
    temp.text(fiveDayobj.list[i*8].main.temp);
    var humidity=$("<p>");
    humidity.text(fiveDayobj.list[i*8].main.humidity);
    
    
    // temp.text(fiveDayobj.name+" "+fiveDayobj.)
    /*
        <div>
          <p>
           Day
          </p>
          <p>Temp</p>
          <p>Humidity</p>
          <p>
            <img src="hhtp">
          </p>

        </div>
         */

        var day=$("<p>");
        day.text(moment(fiveDayobj.list[i*8].dt_txt).format('L'))
        var icon=$("<p>");
        var image=$("<img>");
        image.attr("src", iconurl);

        icon.append(image);

        div.append(day)
        div.append(temp)
        div.append(humidity)
        div.append(icon)
         //#fiveDay

         $("#fiveDay").append(div)
}
        

      });
}
 // This function handles events where a movie button is clicked
 $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();
    //mising oneDayfx, fiveDayFx
    oneDayFx(movie)
    fiveDayFx(movie)
    // Adding movie from the textbox to our array
    movies.push(movie);
    localStorage.setItem("cityWeather", JSON.stringify(movies));


    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  
// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("movie-btn");
      // Adding a data-attribute
      a.attr("data-name", movies[i]);
      // Providing the initial button text
      a.text(movies[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }

     // Adding a click event listener to all elements with a class of "movie-btn"
  $(".movie-btn").click(function(){
    //grab city
    var city = $(this).attr("data-name");
    console.log(city)
    //call five day and oneday
    oneDayFx(city);
    fiveDayFx(city);

    
      });
  }

  renderButtons()
  oneDayFx("reno")
  fiveDayFx("reno")