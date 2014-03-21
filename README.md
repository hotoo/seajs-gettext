
# seajs-gettext

---

gettext plugin for seajs.

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

### seajs.setlocale(String locale)

设置全局的地点，当子模块未指定定点时，使用全局地点。

### new Gettext(Object locale)

构造函数，传入本地语言映射表。

一般 locale 通过形如 `require("./locale/{locale:zh-cn,us-en}/LC_MESSAGES")`
这样的依赖关系方式导入。

其中 `{locale:zh-cn,us-en}` 根据系统设置的方言，或用户使用的方言来决定。
而冒号后面的部分指定了已定义的方言。


### gettext.setlocale(String locale)

设置局部的地点。

当同时未指定局部地点和全局地点时，使用用户客户端指定的地点。

### String gettext(String id)

转换指定 id 的字符串未特定的本地语言。


## 参考

* [gettext](http://www.gnu.org/software/gettext/)
* [GNU `gettext' utilities](http://www.gnu.org/software/gettext/manual/gettext.html)
* [使用GetText本地化编程](http://jianlee.ylinux.org/Computer/C/gettext.html)
* [Gettext - wikipedia](http://zh.wikipedia.org/wiki/Gettext)
