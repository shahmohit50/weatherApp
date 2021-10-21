const appConstants = {
  apiKey: "b5f17cbfc30122d9b9e4dcf80011e9c6",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  units: "metric",
  unknownValue: "NA",
  imageUrl: "http://openweathermap.org/img/wn/",
};

window.onload = (event) => {
  // alert("Heel");
  let location = "Mumbai";
  fetch(
         `${appConstants.baseUrl}?q=${location}&units=${appConstants.units}&APPID=${appConstants.apiKey}`
       )
       .then((response) => {
              if (response.status === 200) {
                return response.json();
              }
              throw Error("Error fetching data.");
            })
            .then((data) => {
              updateDom(data);
            })
            .catch((error) => {
              console.error(error);
              alert(`Error getting information for ${location}`);
            });
};
// window.onload(event){
//   alert("Hello");
//   const location = "Mumbai";
//   fetch(
//     `${appConstants.baseUrl}?q=${location}&units=${appConstants.units}&APPID=${appConstants.apiKey}`
//   )
//     .then((response) => {
//       if (response.status === 200) {
//         return response.json();
//       }
//       throw Error("Error fetching data.");
//     })
//     .then((data) => {
//       updateDom(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       alert(`Error getting information for ${location}`);
//     });
//}
function getWeatherInformation(event) {
  event.preventDefault();
  const location = document.querySelector(".input-group")[0].value;
  fetch(
    `${appConstants.baseUrl}?q=${location}&units=${appConstants.units}&APPID=${appConstants.apiKey}`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw Error("Error fetching data.");
    })
    .then((data) => {
      updateDom(data);
    })
    .catch((error) => {
      console.error(error);
      alert(`Error getting information for ${location}`);
    });
}

function hide() {
  document.querySelector(".input-group").style.display = "block";
  document.querySelector(".button1").style.display = "none";
}
function show(){
    document.querySelector(".input-group").style.display = "none";
  document.querySelector(".button1").style.display = "block";
}
function updateDom(data) {
  const dateInformation = getDateInformation();
//   document.querySelector(
//     ".weather .weather-information .weather-day"
//   ).innerHTML = dateInformation.day;
  document.querySelector(
    ".header .time"
  ).innerHTML = `${dateInformation.date} ${dateInformation.month} ${dateInformation.year}`;

  document.querySelector(
    ".header .city"
  ).innerHTML = `${data?.name || appConstants.unknownValue}, ${
    data?.sys?.country || appConstants.unknownValue
  }`;


  document
    .querySelector(
      ".header .temperature .icon img"
    )
    .setAttribute(
      "src",
      `${appConstants.imageUrl}${data?.weather?.[0]?.icon}.png`
    );

    document.querySelector(
        ".header .temperature .value"
      ).innerHTML = `${parseInt(data?.main?.temp || 0)}&deg;C`;


      document.querySelector(
        ".header .weather-descr"
      ).innerHTML = `${data?.weather?.[0]?.main || appConstants.unknownValue}`;  

      document.querySelector(
        ".information .humidity .value"
      ).innerHTML = `${data?.main?.humidity || appConstants.unknownValue}%`; 

      document.querySelector(
        ".information .avg-temp .value"
      ).innerHTML = `${data?.main?.temp || appConstants.unknownValue}&deg`; 

      document.querySelector(
        ".information .wind-speed .value"
      ).innerHTML = `${data?.wind?.speed || appConstants.unknownValue}m/s`; 
      
      document.querySelector(
        ".information .visibility .value"
      ).innerHTML = `${data?.visibility || appConstants.unknownValue}`; 

      show();
}
function getDateInformation() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return {
    day,
    date,
    month,
    year,
  };
}
