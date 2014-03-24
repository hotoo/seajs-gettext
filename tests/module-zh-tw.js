
define(function(require, exports, module) {

  var Gettext = require("gettext");
  var locale = require("./locale/{locale:zh-tw}/LC_MESSAGES");
  var gettext = new Gettext(locale);

  module.exports = gettext;

});
