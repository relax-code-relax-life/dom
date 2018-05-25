# desc
简陋的dom操作的封装。不考虑IE9以下及个别少数的兼容情况。

# 下载
* npm install --save wwl-dom

# 使用
* import $ from "wwl-dom"
* var $ = require('wwl-dom')

# API

## $( selector )

function ( selector: string|node ) : DOM

selector参数可以是选择器或者html元素节点，返回一个DOM对象。

如果参数是选择器,函数内部通过`document.querySelectorAll`进行查找。

## $.create( htmlOrTag )

function( htmlOrTag:string ) : DOM

传入html字符或者标签名称，返回一个DOM对象

```javascript

$.create('<div>test</div>').outerHtml();    //<div>test</div>
$.create('div').text('test');               //<div>test</div>

```

## $.fragment(html)

function( html:string ) : DocumentFragment

返回一个文档片段。
使用场景:
```javascript
//<div id="container"></div>

$('#container').append( $.create('outer<span>inner</span>') );  //<div id="container"><span>inner</span></div>
$('#container').append( $.fragment('outer<span>inner</span>') );//<div id="container">outer<span>inner</span></div>

```

## note

```javascript
$.create('<div>txt1</div>text2').outerHtml();      //<div>txt1</div>
$.create('<div>text1</div><span>text2</span>').outerHtml(); //<div>text1</div><span>text2</span>
$.create('div').append($.fragment('<div>txt1</div>text2')).outerHtml(); //<div><div>txt1</div>text2</div>
```

`create`方法中，最外层的文本必须要有标签包裹。


## DOM对象API

### DOM# each( fn )

### DOM# map( fn )

### DOM# filter( fn )

### DOM# eq( index )

### DOM# first( )

### DOM# last( )

### DOM# classNames( index=0 )

### DOM# addClass( ...names )
### DOM# removeClass( ...names )
### DOM# toggleClass( ...names )
### DOM# hasClass(name)
### DOM# parent()
### DOM# parents()
### DOM# children()
### DOM# prev()
### DOM# next()
### DOM# find(selector)
### DOM# includes(node)
### DOM# closest(selector)
### DOM# match(selector)
### DOM# attr(name,val?)
### DOM# removeAttr(...names)
### DOM# val(val?)
### DOM# html(html?)
### DOM# outerHtml(html?)
如果传入html，则会替换掉原节点，同时返回的是原节点。如果需要替换后的新节点，需要重新获取。
### DOM# text(txt?)
### DOM# style(name:string|object, val?)
### DOM# removeStyle(...names)
### DOM# computeStyle(pseudoElt?)
### DOM# maxScroll(index = 0) 
### DOM# append(newNode)
### DOM# prepend(newNode)
### DOM# insertAfter(newNode)
### DOM# insertBefore(newNode)
### DOM# replace(newNode)
### DOM# remove()
### DOM# hide()
### DOM# show(displayValue?)
### DOM# clone(deep?)
### DOM# offset(index = 0)
### DOM# on(type, fn)
### DOM# off(type, fn?)
### DOM# onDelegate(type, selector, fn)
### DOM# offDelegate(type, selector?, fn?)
### DOM# trigger(type,data?)
### DOM# offsetHeight(index=0)
### DOM# offsetWidth(index=0)
### DOM# offsetTop(index=0)
### DOM# offsetLeft(index=0)
### DOM# clientHeight(index=0)
### DOM# clientWidth(index=0)
### DOM# clientTop(index=0)
### DOM# clientLeft(index=0)
### DOM# scrollHeight(index=0)
### DOM# scrollWidth(index=0)
### DOM# scrollTop(index=0)
### DOM# scrollLeft(index=0)






