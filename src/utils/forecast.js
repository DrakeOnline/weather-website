const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f69d41049da16afc4069c01f7c6087c9/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?lang=en';

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('\nUnable to connect to forecast services', undefined); 
        } else if (body.error) {
            callback('\nCould not find location', undefined);
        } else {
            const temperature           = body.currently.temperature;
            const rain_probability      = body.currently.precipProbability;
            const daily_weather_summary = body.daily.data[0].summary;
            
            const weather_report        = `<p>Summary: ${daily_weather_summary}</p><p>Currently: ${temperature}\u00B0 Fahrenheit</p><p>${rain_probability+'%'} chance of rain</p>`;

            callback(undefined, {temperature, rain_probability, daily_weather_summary})
        }
    })
}

module.exports = forecast;