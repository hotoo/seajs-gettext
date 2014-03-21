(function(seajs){

  var placeholder = "{locale(:[^}])}";
  var re_placeholder = /\{locale(?:\:([^\}]*))\}/g;
  // define(function(require,...){}) 中的 require 变量名。
  var re_require = /^function\s*\(([^,\)]+)[^\)]*\)/;

  var re_gettext = /(\w+)\s*=\s*require\s*\((['"])gettext\2\)/;
  var locales_spliter = /[,; ]/;

  function toFixed(lang){
    return lang.replace(/_/g, "-").toLowerCase();
  }

  var nav = navigator;
  var sys_local = toFixed(nav.language || nav.userLanguage || nav.browserLanguage);
  var curr_locale = sys_local;

  seajs.on("resolve", function(data){
    var id = data.id;
    var m = re_placeholder.exec(id);
    var hasLocale = false;
    if(m){
      var locales = m[1].split(locales_spliter);

      for(var i=0,l=locales.length; i<l; i++){
        // If defined user-language locale.
        if(locales[i] === curr_locale){
          data.id = id.replace(re_placeholder, curr_locale);
          return; // not break.
        }
      }

      // If not defined user-locale language.
      data.id = undefined;
    }
  });

  seajs.on("define", function(meta){

    //var factory = meta.factory.toString();
    ////var m = re_require.exec(factory);
    ////var var_require = m ? m[1] : null;
    //var m = re_gettext.exec(factory);
    //if(m){
        //console.log("m", m);
      //var var_gettext = m[1];
      //var re_locales = new RegExp(var_gettext + '\\.locales\\(([^\\)]+)\\)');
      //console.log("reg", re_locales);
      //if(m = re_locales.exec(factory)){
        //var var_locale = m[1];
        //console.log(var_locale);
      //}
      //meta.deps.push("/examples/locale/zh-cn/LC_MESSAGE.js");
    //}

  });

  seajs.setlocale = function(locale){
    curr_locale = locale || sys_local;
  };

  define("gettext", [], function(require, exports, module){

    var Gettext = function(locale){

      locale = locale || {};

      var gettext = function(key){
        var args = arguments;
        var idx = 1;
        key = locale.hasOwnProperty(key) ? locale[key] : key;
        key = key.replace(/(%[diuoxXfFeEgGaAcspn])/g, function($0, $1){
          return args[idx++] || $1;
        });
        return key;
      };

      gettext.setlocale = function(lc, locale){
      };
      gettext.bindtextdomain = function(){};
      gettext.textdomain = function(){};
      gettext.locales = function(){};

      return gettext;

    };

    module.exports = Gettext;
    exports.setlocale = function(){};
    exports.bindtextdomain = function(){};
    exports.textdomain = function(){};
  });

})(this.seajs);
