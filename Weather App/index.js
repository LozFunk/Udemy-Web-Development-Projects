import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = "64c430c1bfa5a320298c014b1d1f4b0a"
const API_URL = `https://api.openweathermap.org/data/2.5/`;

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

app.get("/",(req,res) =>{
    res.render("index.ejs",{content:null});
});

app.post("/get-weather", async (req, res) => {
  const city_name = req.body.name;
  try {
    const result = await axios.get(API_URL + "weather?" + `q=${city_name}` + "&" + `appid=${API_KEY}` +"&units=metric" );
    res.render("index.ejs", { content:{
        temp : result.data.main.temp,
        feelsLike: result.data.main.feels_like,
        humidity: result.data.main.humidity,
        temp_min: result.data.main.temp_min,
        temp_max: result.data.main.temp_max,
        windSpeed: result.data.wind.speed,
        city_name: result.data.name,
        desc: capitalizeFirstLetter(result.data.weather[0].description),
        icon: result.data.weather[0].icon,
        icon_url: `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@4x.png`,
        country: result.data.sys.country,
        time: result.data.timezone,
    } 
  });
  } catch (error) {
    let message = "An error occurred while fetching weather data.";

    if (error.response) {
      if (error.response.status === 404) {
        message = `City "${city_name}" not found. Please try again.`;
      } else {
        message = `Error ${error.response.status}: ${error.response.data.message}`;
      }
    } else if (error.request) {
      message = "No response received from the weather service.";
    } else {
      message = "Request setup error: " + error.message;
    }

    res.render("index.ejs", { content: { error: message } });
  }
});

app.listen(port, ()=>{
    console.log(`Server is running on Port:${port}`)
});