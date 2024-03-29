const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.eventNames.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=> {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
    console.log('Невозможно добавить в server.log файл');
    }
});
    next();
});

// app.use((req, res, next) => {
// res.render('maintenance.hbs');

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Домашняя страница',
        welcomeMessage: 'Добро пожаловать на мой вебсайт',
       
    });
    });
app.get('/about', (req, res) =>{
 res.render('about.hbs', {
     pageTitle: 'Страница об мне',
});
});

app.get('/bad', (req, res) => {
res.send({
    errorMessage: 'Запрос не обработан'
});
});

app.listen (port, () => {
    console.log(`Сервер поднят на порту ${port}`);
});