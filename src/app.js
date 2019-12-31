// Core modules
const path      = require('path');
// Imports
const express   = require('express');
const hbs       = require('hbs')
// Personal modules
const geocode   = require('./utils/geocode')
const forecast  = require('./utils/forecast')

// Variables
const app           = express();
const port          = process.env.PORT || 3000
const publicPath    = path.join(__dirname, '../public');
const viewsPath     = path.join(__dirname, '../templates/views');
const partialsPath  = path.join(__dirname, '../templates/partials');

// Express settings
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

// Page Setups
app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Here you will find FAQ and other help guides'
    });    
})

app.get('/weather' , (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) { 
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) { 
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send('You must provide a search term')
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'This Help article couldn\'t be found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'This page couldn\'t be located'
    });
})

// Setup Server for Listening
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})