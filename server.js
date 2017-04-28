const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

var app = express();


app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        };
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Ciao Express!</h1>');
    // res.send({
    //     name:'Antonio',
    //     lastname: "D'Onchia"
    // });
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcome: 'Benvenuto nel mio sito!'
    });
});

// app.use( (req, res, next) => {
//     res.send('Blocking Middleware');
// });

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.listen(3000, () => {
    console.log('Il Server è in ascolto sulla porta 3000');
});