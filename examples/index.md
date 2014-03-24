# 演示文档

---

<script src="../src/seajs-gettext.js"></script>

<pre id="demo">...</pre>

* 如果你的浏览器使用简体中文(zh-cn)，上面会显示 `你好 Word。`。
* 如果你的浏览器使用加利西亚语(gl, Galician)，上面会显示 `Ola Word.`。
* 否则，上面会显示 `Hello Word.`。

----

方言定义示例：

````javascript
define("demo/locale/zh-cn/LC_MESSAGES", [], {
  "Hello %s.": "你好 %s。"
});

// Galician
define("demo/locale/gl/LC_MESSAGES", [], {
  "Hello %s.": "Ola %s."
});
````

模块定义示例：

````js
define("demo", [], function(require, exports){
  var Gettext = require("gettext");
  // {locale:zh-cn,gl} 中，后面的部分 `zh-cn,gl` 用于指定已定义的方言，
  //                   不要加入未定义的方言，
  //                   同时不建议加入默认方言。
  var locale = require("demo/locale/{locale:zh-cn,gl}/LC_MESSAGES");
  var gettext = new Gettext(locale);

  exports.hello = gettext("Hello %s.", "World");
});
````

模块使用示例：

````js
seajs.use(['$', 'demo'], function($, demo){
  $("#demo").html(demo.hello + "<br/>locale: " + seajs.getlocale());
});
````
