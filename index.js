const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));




app.get('/', (req, res) => {

        res.sendFile(__dirname + '/index.html');
});


app.post('/', (req, res) => {
        const query = req.body.city;
        const appid = '**********************;
        const unit = 'metric';
        const url = " https://api.openweathermap.org/data/2.5/weather?q=" + query + "&id=*****&appid=" + appid + "&units=" + unit;
        https.get(url, (response) => {
                console.log(response.statusCode);


                response.on('data', (data) => {
                        const weatherData = (JSON.parse(data));
                        const temp = weatherData.main.temp;
                        const description = weatherData.weather[0].description;
                        const icon = weatherData.weather[0].icon;
                        const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                        res.write("<h1>the temp of " + query + ":" + temp + " degree celcies.</h1>");
                        res.write("<p>Description of Weather:" + description + " </p>");
                        res.write("<img src=" + imgurl + ">");
                        res.send();

                });

        });


});


app.listen(4545, (req, res) => {
        console.log("server is live now");
});
