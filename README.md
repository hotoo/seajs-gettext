
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
  "警告，熊出没注意。": "警示，狗熊出沒注意安全。"
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

一般 locale 通过形如 `require("./locale/{locale:zh-cn,en-us}/LC_MESSAGES")`
这样的依赖关系方式导入。

其中 `{locale:zh-cn,en-us}` 根据系统设置的方言，或用户使用的方言来决定。
而冒号后面的部分指定了已定义的方言。


### String gettext(String id)

转换指定 id 的字符串为特定的本地语言。


### seajs.setlocale(String locale)

全局方言名称设定，影响所有模块的方言使用。

一般情况下，不需要指定方言，使用用户设定或用户系统设定的方言即可。
但有时用户浏览器使方言 A (如 `en-us`)，但是需要手动切换方言 B (如 `zh-cn`)，
此时可以设定全局的方言名称。


### String seajs.getlocale()

获取当前使用的本地方言名称。


## 方言名称

方言名称遵循国际化标准，目前全世界有大约 140种语言文字。

一般方言名称遵循 `语言` 或 `语言-国家` 格式，如 `ja`, `zh-cn`

更多参考 [Locale](https://github.com/hotoo/seajs-gettext/wiki/Locale)

## 方言定义

方言定义中，可以使用简单的文本，也可以使用具有特殊占位符的文本，这些特殊占位符
可以用实际的数据进行替换。

例如：

```js
var name = "@hotoo";
gettext("My name is %s, I love %s beginning in %i.", name, "@lizzie", 2013);
```

支持的变量类型与 C 语言的 `printf()` 类似，但目前不支持格式化功能。
也就是说使用以下任意一种占位符效果都一样的，目前只将数据转换成字符串，
然后进行替换。

* `%d`
* `%i`
* `%u`
* `%o`
* `%x`
* `%X`
* `%f`
* `%F`
* `%e`
* `%E`
* `%g`
* `%G`
* `%a`
* `%A`
* `%c`
* `%s`
* `%p`
* `%n`

特殊的，如果某个数据未定义，则对应的占位符不进行替换，原样返回。
如果你需要使用其他更强的格式化工具（例如[node-printf](https://github.com/wdavidw/node-printf)），
可以利用这个特性。

```js
printf(gettext("%.3f%%"), 3.1415926); // 3.142%
```

## 参考

* [gettext](http://www.gnu.org/software/gettext/)
* [GNU `gettext' utilities](http://www.gnu.org/software/gettext/manual/gettext.html)
* [使用GetText本地化编程](http://jianlee.ylinux.org/Computer/C/gettext.html)
* [Gettext - wikipedia](http://zh.wikipedia.org/wiki/Gettext)
