const fetch = require("node-fetch")
const config = require("../../config.js")

const getWeather = async (location) => {

    const params = new URLSearchParams({
        access_key: config.weather.access_key,
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

module.exports = getWeather