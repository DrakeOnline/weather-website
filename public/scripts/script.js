
const weatherForm   = document.querySelector('form')
const search        = document.querySelector('input')
const locationP     = document.querySelector('#location')
const forecastP     = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    locationP.textContent = 'Loading'
    forecastP.textContent = ''
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                locationP.textContent = data.error
            } else {
                locationP.textContent = data.location
                forecastP.textContent = data.forecast
            }
        })
    })
})