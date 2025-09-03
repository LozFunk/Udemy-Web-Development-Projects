import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = "64c430c1bfa5a320298c014b1d1f4b0a"
const API_URL = `https://api.openweathermap.org/data/2.5/`;


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
        windSpeed: result.data.wind.speed,
        city_name: result.data.name,
    } });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});





app.listen(port, ()=>{
    console.log(`Server is running on Port:${port}`)
})