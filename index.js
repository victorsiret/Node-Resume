//________________NODE_MODULES____________________
//Our express application
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//The i18n module is loaded
const i18n = require('i18n');

//Load handlebars engine and load our configuration from the file hbsconf.js
const handlebars = require('express-handlebars').create(require('./libs/hbsconf.js'));



//________________ARRAY_INFO____________________
//JSONs with Lists
//Education
    //Load Arrays
    const eduElements = require('./controllers/eduElements.json');
    const education = require('./controllers/education.json');
    //Create Array
    let arrEdu = [];
    for(let i = 0; i < education.length; i++){
        arrEdu[i] = {};
        arrEdu[i]["id"] = education[i];
        for(let j = 0; j < eduElements.length; j++){
            arrEdu[i][eduElements[j]] = education[i] + "-" + eduElements[j];
        }
    }

//Experience
    //Load Arrays
    const expElements = require('./controllers/expElements.json');
    const experience = require('./controllers/experience.json');
    //Create Array
    let arrExp = [];
    for(let i = 0; i < experience.length; i++){
        arrExp[i] = {};
        arrExp[i]["id"] = experience[i];
        for(let j = 0; j < expElements.length; j++){
            arrExp[i][expElements[j]] = experience[i] + "-" + expElements[j];
        }
    }





//________________i18n_CONFIG______________________
i18n.configure({
    //Available languages
    locales: ['en', 'fr','es','de','it','da'], 

    //Cookie name for preference storage
    cookie: 'locale', 

    //Where the dictionaries will be stored
    directory: __dirname + '/locales', 
    
    //Default language
    defaultLocale: 'en',

    //Reload translations without server relaunch
    autoReload: true,
});



//________________USE_HANDLEBARS_______________________
//Set our application to use our configured handlebars module as the view engine 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Set our application to use our configuration of the i18n module
//Cookie parser comes first so that i18n init can read the preference
app.use(cookieParser());
app.use(i18n.init);



//________________RENDER_PAGES_________________________
//Render home page
app.get('/', function (req, res) {
    res.render('home', {arrEdu, arrExp});
});

//TEST PAGE /!\
app.get('/page1', function (req, res) {
    res.render('page1');
});

//Change language and redirect to previous page
app.get('/in-:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('back');
});



//________________USE_STATIC_FILES_______________________
app.use(express.static('client'));



//________________LISTEN_TO_PORT_3000____________________
app.listen(3000, () => console.log('App listening on port 3000!'));