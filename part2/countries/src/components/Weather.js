import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState({temperature: '', wind: '', icons: []})//wind_speed, wind_dir, weather_icons
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => {
            const current = response.data.current
            setWeather({
                temperature: `${current.temperature} Celcius`, 
                wind: `${current.wind_speed} mph direction ${current.wind_dir}`, 
                icons: [current.weather_icons]
            })
        })
    }, [])

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div>temperature: {weather.temperature}</div>
            {weather.icons.map(icon => <img key={icon} alt="weather" height="50" src={icon} />)}            
            <div>wind: {weather.wind}</div>
        </div>
    )
}

export default Weather