import config from '../../config'
import { URLSearchParams } from 'url'
import fetch from 'node-fetch'

const getWeather = async (location: string) => {

    let params = new URLSearchParams({
        access_key: `${config.weather.access_key}`,
        query: location
    }).toString()

    const res = await fetch(`http://api.weatherstack.com/current?${params}`)
    let data = await res.json()
    if (data.success == false) return
    return {
        location: data.location.name + ', ' + data.location.region + ', ' + data.location.country,
        time: data.location.localtime,
        temperature: data.current.temperature,
        weather_descriptions: data.current.weather_descriptions[0],
        weather_icons: data.current.weather_icons[0],
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        is_day: data.current.is_day,
    }
}

export default getWeather