
let fetchbtn = document.getElementById("fetch-btn")
const Apikey = "8517a900612dbf6db921a249b24cbda5";
const weatherdata = document.getElementById("weather");



//  ..........fetching current location using geolocation api...............

function fetchLocation() {
    weatherdata.innerHTML="";

  let lat;
  let long;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge:0,
  };
  
  navigator.geolocation.getCurrentPosition(success, error,options);
  function success(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    renderlocation(lat, long);
    weather(lat, long);
  }
  function error(err) {
    if (err.code === 1)
    {
      alert("geolocation-permission_denied");
     throw new Error("geolocation-permission_denied");
    }
    if(err.code === 2) 
    {
      alert("geolocation-unavailable");
      throw new Error("geolocation-unavailable")
    };
    if (err.code === 3){

      alert("geolocation-timeou");
      throw new Error("geolocation-timeout");
    }
    } 
  
  
}

//  rendering and displaying  latitude and longitude of current location  and showing on map.......

function renderlocation(lat, long) {

  let topelement = document.createElement("div");
  topelement.className = "top";
  topelement.innerHTML = `
     <h1>Welcome To The Weather App</h1>
     <p>Here is your current location</p>
     <div>
       <span>Lat : ${lat}</span>
       <span>Long : ${long}</span>
   </div>
   <div class="map-container">
       <!-- <img src="asset/Screenshot 2022-12-14 at 7.18 1.svg" alt="map"> -->
       <iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" style="width:90vw;  height:40vw;" frameborder="0" style="border:0"></iframe>
   </div>`;

  weatherdata.appendChild(topelement);
}

//  rendering and displaying data of weather at page...........

function renderWeatherData(data) {
  const bottomelement = document.createElement("div");
  bottomelement.className = "bottom";
  bottomelement.innerHTML = `<h1>Your Weather Data</h1>
    <div>
        <span>Location: ${data.name}</span>
        <span>Wind Speed : ${Math.floor((data.wind.speed)*3.6)}kmph</span>
        <span>Humidity : ${(data.main.humidity)}</span>
        <span>Time one : GMT +${Number(data.timezone)/3600}</span>
        <span>Pressure : ${Math.ceil((data.main.pressure)*0.0009869233)}atm</span>
        <span>Wind direction : North West</span>
        <span>UV Index : 500</span>
        <span>Feels like : ${data.main.feels_like}°</span>

    </div>`;
  weatherdata.appendChild(bottomelement);
}

//..........  fetching weather data using api-call by taking  lat and lon of  current location......
async function weather(lat, long) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${Apikey}&units=metric`);
        const data = await response.json();
         renderWeatherData(data);
      }
      catch(error){
        console.log(`An error occured : ${error}`)
      }
  
}
  
    // ............on Clicking fectching latitude ang longitude of current location ........
fetchbtn.addEventListener("click",()=>{
    fetchLocation(); 
});


