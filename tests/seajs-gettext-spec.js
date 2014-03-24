define(function(require) {

  var expect = require("expect");
  var Gettext = require('gettext');
  var locale = require('./locale/{locale:zh-cn,us-en}/LC_MESSAGES');
  var gettext = new Gettext(locale);

  var seajs = window.seajs;

  var LOCALE_ZH_CN = require("./locale/zh-cn/LC_MESSAGES");

  function format(key){
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
  }

  describe('seajs-gettext', function() {

    it('gettext(key)', function() {
      var key = "Hello World.";
      expect(gettext(key)).to.equal(LOCALE_ZH_CN[key])
    });

    it('gettext(key with variables)', function() {
      var key = "Hello %s.";
      var val = "World";
      expect(gettext(key, val)).to.equal(format(LOCALE_ZH_CN[key], val))
    });

    it('seajs.setlocale() and seajs.getlocale()', function() {
      var locale1 = "us-en";
      seajs.setlocale(locale1)
      expect(gettext.getlocale()).to.equal(locale1);
      expect(seajs.getlocale()).to.equal(gettext.getlocale());

      var locale2 = "xxx";
      seajs.setlocale(locale2)
      expect(gettext.getlocale()).to.equal(locale2);
      expect(seajs.getlocale()).to.equal(gettext.getlocale());
    });

    it('change locale:en-us', function(done) {
      var lang0 = "en-us";
      seajs.setlocale(lang0);
      expect(seajs.getlocale()).to.equal(lang0);
      seajs.use(["./module-" + lang0], function(gettext0){

        expect(gettext0("locale")).to.equal(lang0);
        done();

      });
    });

    it('change locale:zh-tw', function(done) {
      var lang0 = "zh-tw";
      seajs.setlocale(lang0);
      expect(seajs.getlocale()).to.equal(lang0);
      seajs.use(["./module-" + lang0], function(gettext0){

        expect(gettext0("locale")).to.equal(lang0);
        done();

      });
    });
  });

});
