const fetch = require("node-fetch")
require('dotenv').config()

const getClima = async (location) => {

    console.log(`location: ${location}`)

    const params = new URLSearchParams({
        access_key: process.env.WEATHER_ACCESS_KEY,
        query: `${location}`
    })

    const res = await fetch(`http://api.weatherstack.com/current?${params}`)
    let data = await res.json()
    if(data.location){
        data = {
            location: data.location.name + ", " + data.location.region + ", " + data.location.country,
            time: data.location.localtime,
            temperature: data.current.temperature,
            weather_descriptions: data.current.weather_descriptions[0],
            weather_icons: data.current.weather_icons[0],
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
            is_day: data.current.is_day,
        }
        return data
    }
}

module.exports = getClima