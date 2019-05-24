//________________NODE_MODULES____________________
//Our express application
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//The i18n module is loaded
const i18n = require('i18n');

//Load handlebars engine and load our configuration from the file hbsconf.js
const handlebars = require('express-handlebars').create(require('./libs/hbsconf.js'));



//________________i18n_CONFIG______________________
i18n.configure({
    //Available languages
    locales: ['en', 'fr','es','de', 'it', 'da'], 

    //Cookie name for preference storage
    cookie: 'locale', 

    //Where the dictionaries will be stored
    directory: __dirname + '/locales', 
    
    //Default language
    defaultLocale: 'en',

    //Reload translations without server relaunch
    autoReload: true,

    // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
    queryParameter: 'lang',
});



//________________USE_HANDLEBARS_______________________
//Set our application to use our configured handlebars module as the view engine 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



//Set our application to use our configuration of the i18n module
//Cookie parser comes first so that i18n init can read the preference
app.use(cookieParser());
app.use(i18n.init);



//________________ARRAY_INFO____________________
//JSONs with Lists
//These arrays are used to create lists, they populate the i18n fields and allow the CV to be expanded with a small
//modification of JSON controller files rather than repeating copious amounts of html code.

//Education
    //Load Arrays
    const edu = require('./controllers/education.json');
    const education = edu[0];
    const eduElements = edu[1];
    
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
    const exp = require('./controllers/experience.json');
    const experience = exp[0];
    const expElements = exp[1];

    //Create Array
    let arrExp = [];
    for(let i = 0; i < experience.length; i++){
        arrExp[i] = {};
        arrExp[i]["id"] = experience[i];
        for(let j = 0; j < expElements.length; j++){
            arrExp[i][expElements[j]] = experience[i] + "-" + expElements[j];
        }
    }

//Languages
    //Load Arrays
    const lang = require('./controllers/languages.json');
    const languages = lang[0];
    const lanElements = lang[1];
    //Create Array
    let arrLan = [];
    for(let i = 0; i < languages.length; i++){
        arrLan[i] = {};
        arrLan[i]["id"] = languages[i];
        for(let j = 0; j < lanElements.length; j++){
            arrLan[i][lanElements[j]] = languages[i] + "-" + lanElements[j];
        }
    }

//Skills
    //Load Array (this one is already made to spec)
    const arrSki = require('./controllers/skills.json');

//Interests
    //Load Array
    const arrInt = require('./controllers/interests.json');

    const tommy = ["1", "2", "3"]


//________________RENDER_PAGES_________________________
//Render home page
app.get('/', function (req, res) {
    res.render('home', {arrEdu, arrExp, arrLan, arrSki, arrInt, tommy});
});

//TEST PAGE /!\
app.get('/skills', function (req, res) {
    res.render('skills');
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