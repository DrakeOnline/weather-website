
const weatherForm   = document.querySelector('form')
const search        = document.querySelector('input')
const locationH     = document.querySelector('#location')
const forecastD     = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    locationH.textContent = 'Loading'
    forecastD.textContent = ''
    const location = search.value
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                locationH.textContent = data.error
            } else {
                locationH.textContent = data.location
                
                let tempNode = document.createElement("P");
                let tempText = document.createTextNode("The current temperature is " + data.forecast.temperature + "° Fahrenheit");
                tempNode.appendChild(tempText);
                document.getElementById("forecast").appendChild(tempNode);

                let rainNode = document.createElement("P");
                let rainText = document.createTextNode(data.forecast.rain_probability + "% chance of rain");
                rainNode.appendChild(rainText);
                document.getElementById("forecast").appendChild(rainNode);

                let summaryNode = document.createElement("P");
                let summaryText = document.createTextNode(data.forecast.daily_weather_summary);
                summaryNode.appendChild(summaryText);
                document.getElementById("forecast").appendChild(summaryNode);
            }
        })
    })
})