//Handlebars configuration
//Load i18n module and our urls.json dictionary from the same folder that our controllers are (just to keep them in an easy to remember place)
const i18n = require('i18n');
const urls = require('../controllers/urls.json');
module.exports = {
    //Setup our default layout
    defaultLayout: 'main',
 
    //More handlebars configuration
    
 
    //Register handlebars helpers
  helpers: {
    //Helper for multiple languages
    i18n: function(){
        return i18n.__.apply(this,arguments);
    },
    //This helper is part of i18n and it is used for multiple languages for plural and singular. Check the documentation for more details:      https://github.com/mashpie/i18n-node
    __n: function(){
        return i18n.__n.apply(this, arguments);
    },
    //Custom helper to reuse urls
    url: function(name){
    //We only need to access to the JSON previously loaded, and   return the value of the key we receive as a parameter
        return urls[name];
    },
  }
}