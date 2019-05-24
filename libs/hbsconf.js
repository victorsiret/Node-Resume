//Handlebars configuration
//Load i18n module and our urls.json dictionary from the same folder that our controllers are (just to keep them in an easy to remember place)
const i18n = require('i18n');
const urls = require('../controllers/urls.json');

const cookieParser = require('cookie-parser');

module.exports = {
  //Setup our default layout
  defaultLayout: 'main',

  //More handlebars configuration
  

  //Register handlebars helpers
  helpers: {
    //Helper for multiple languages
    i18n: function(string, options){
      // supplement locale for block helpers
      this.locale = options.data.root.locale;  
      return i18n.__.apply(this,arguments);
    },

    //This helper is part of i18n and it is used for multiple languages for plural and singular.
    __n: function(){
        return i18n.__n.apply(this, arguments);
    },

    //Custom helper to reuse urls
    url: function(name){
      //We only need to access to the JSON previously loaded, and   return the value of the key we receive as a parameter
      return urls[name];
    },
    
    //Creates html text based on skill level between one and four, comprised of empty and full circles
    skillHTML: function(number){
      return '<i class="fas fa-circle fa-sm"></i>'.repeat(number) + '<i class="far fa-circle fa-sm"></i>'.repeat(4-number);
    }
  }
}