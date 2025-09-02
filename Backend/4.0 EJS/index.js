import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {

const d = new Date();
let day = d.getDay();

    if (day != 0 && day != 6){
        res.render("index.ejs",{
            dayType:"a weekday", 
            advice:"it,s time to work hard"});
    }else{
        res.render("index.ejs",{
            dayType:"a weekend", 
            advice:"it,s time to have fun"});
    }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});