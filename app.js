const express = require('express')
const bodyParser = require('body-parser')

const https = require('https');
const res = require('express/lib/response');

const app = express()

app.use(bodyParser.urlencoded({extented: true}))
PORT = process.env.PORT || 3000



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post("/", (req, res) => {
    
    const query = req.body.cityName;
    const apiKey = "d766b68cac7ee49f032614599bf41c44"
    const units = 'metric'

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units=" + units

    https.get(url, (response)=>{
        console.log(response.statusCode);
    
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data)
            
            const temp = weatherData.main.temp
            const weather = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    
            // res.write("<h1>The temperature in " + query + " is " + "<i>"+ temp + "</i>" + " degrees Celsius</h1>")
            res.write(`<h1>The temperature in  ${query} is <i>  ${Math.floor(temp)} </i> degrees Celsius</h1>`)
            res.write(`<h3>The weather is currently <i> ${weather} </i> </h3>`)
    
            res.write("<img src='" + imageURL + "' alt='icon weather' >")
    
            res.send()
        })
    })
})






app.listen(PORT, () => console.log("server running on " + PORT))