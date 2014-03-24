(function(seajs){

  // fixed non-standardized language name.
  // @param {String} lang, language name.
  // @return {String}
  function toFixed(lang){
    return lang.replace(/_/g, "-").toLowerCase();
  }

  // trim string left and right spaces.
  // @param {String} string
  // @return {String}
  function trim(string){
    return string.replace(/^\s+/, "").replace(/\s+$/, "");
  }

  var re_placeholder = /\{locale(?:\:([^\}]*))?\}/g;
  var locales_spliter = ",";
  var nav = navigator;
  var SYS_LOCALE = toFixed(
    nav.language ||
    nav.userLanguage ||
    nav.browserLanguage ||
    nav.systemLanguage ||
    ""
  );
  var CURR_LOCALE = SYS_LOCALE;


  // Set current locale name.
  // @return {Seajs}
  seajs.setlocale = function(locale){
    CURR_LOCALE = locale || SYS_LOCALE;
    return seajs;
  };

  // Get current locale name.
  // @return {String}
  seajs.getlocale = function(){
    return CURR_LOCALE;
  };

  // NOT SUPPORT AND NOT NEED.
  //seajs.bindtextdomain = function(){};
  //seajs.textdomain = function(){};


  // resolve locales module id.
  seajs.on("resolve", function(data){
    var id = data.id;
    var m = re_placeholder.exec(id);
    if(m){
      var locales = m[1].split(locales_spliter);

      for(var i=0,l=locales.length; i<l; i++){
        // If defined user-language locale.
        if(trim(locales[i]) === CURR_LOCALE){
          data.id = id.replace(re_placeholder, CURR_LOCALE);
          return; // not break or continue.
        }
      }

      // If not defined user-locale language.
      data.id = undefined;
    }
  });

  function _define(require, exports, module){

    var Gettext = function(locale){

      locale = locale || {};

      var gettext = function(key){
        if(!key){return "";}
        var args = arguments;
        var idx = 1;
        key = locale.hasOwnProperty(key) ? locale[key] : key;
        key = key.replace(/%\!?[diuoxXfFeEgGaAcspn]\b/g, function($0, $1){
          var r = args[idx++];
          return typeof r !== "undefined" ? r :
            ($1.indexOf("%!")===0 ? "" : $1);
        });
        return key;
      };
      gettext.getlocale = seajs.getlocale;

      return gettext;

    };

    module.exports = Gettext;
  }

  define("gettext", [], _define);
  define(_define);

})(this.seajs);
