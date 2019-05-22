//________________NODE_MODULES____________________
//Our express application
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//The i18n module is loaded
const i18n = require('i18n');

//Load handlebars engine and load our configuration from the file hbsconf.js
const handlebars = require('express-handlebars').create(require('./libs/hbsconf.js'));


//JSONs with Lists
const elements = require('./controllers/elements.json');
const experience = require('./controllers/experience.json');
let arrArr = [];
let arrObj = [];

//Create Matrix
for(let i = 0; i < experience.length; i++){
    arrArr[i] = [];
    for(let j = 0; j < elements.length; j++){
        arrArr[i][j] = experience[i] + "-" + elements[j];
    }
}

for(let i = 0; i < experience.length; i++){
    arrObj[i] = {};
    for(let j = 0; j < elements.length; j++){
        arrObj[i][elements[j]] = experience[i] + "-" + elements[j];
    }
}

console.log(arrArr);
console.log(arrObj);

//experiments
const tommy = "tommy";



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
    res.render('home', {experience, elements, arrArr, arrObj});
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