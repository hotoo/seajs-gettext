
# seajs-gettext

---

GNU `gettext` like for seajs.

---

## 使用说明

project_path/module_name.js

```js
define(function(require, exports, module){

  var Gettext = require("gettext");
  var locale = require("./locale/{locale:zh-cn,us-en}/LC_MESSAGES");

  var gettext = new Gettext(locale);

  console.log(gettext("警告，熊出没注意。"));
});
```

project_path/locale/zh-tw/LC_MESSAGES.js

```js
define({
  "警告，熊出没注意。": "警告，熊出沒注意。"
});
```

project_path/locale/us-en/LC_MESSAGES.js

```js
define({
  "警告，熊出没注意。": "Warnning, Watch Out For The Bear."
});
```


## API

### new Gettext(Object locale)

构造函数，传入本地方言的键值对映射表。

一般 locale 通过形如 `require("./locale/{locale:zh-cn,us-en}/LC_MESSAGES")`
这样的依赖关系方式导入。

其中 `{locale:zh-cn,us-en}` 根据系统设置的方言，或用户使用的方言来决定。
而冒号后面的部分指定了已定义的方言。


### String gettext(String id)

转换指定 id 的字符串未特定的本地语言。


### seajs.setlocale(String locale)

全局方言名称设定，影响所有模块的方言使用。

一般情况下，不需要指定方言，使用用户设定或用户系统设定的方言即可。
但有时用户浏览器使方言 A (如 `en-us`)，但是需要手动切换方言 B (如 `zh-cn`)，
此时可以设定全局的方言名称。


### String seajs.getlocale()

获取当前使用的本地方言名称。


## 参考

* [gettext](http://www.gnu.org/software/gettext/)
* [GNU `gettext' utilities](http://www.gnu.org/software/gettext/manual/gettext.html)
* [使用GetText本地化编程](http://jianlee.ylinux.org/Computer/C/gettext.html)
* [Gettext - wikipedia](http://zh.wikipedia.org/wiki/Gettext)
