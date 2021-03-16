Lighter Dom manipulation library.

# Install
* npm install --save relax-dom

# Import
* import $ from "relax-dom"
* const $ = require('relax-dom')

# Typescript
Typescript has been supported from v3.0.37.
```typescript
import $, {Dom} from 'relax-dom';
let $input : Dom;
$input = $('input');
```

# API

## $( selector )

function ( selector: string|HTMLElement ) : DOM

If the type of `selector` parameter is string, the function will query by `document.querySelectorAll`.

## $.create( htmlOrTag )

function( htmlOrTag:string ) : DOM

Create a DOM object from html or tagName.

If the parameter includes `<` character, it will be considered as html string. 
Otherwise, the parameter is considered as a tag name.

```javascript

$.create('<div>test</div>').outerHtml();    //<div>test</div>
$.create('div').text('test');               //<div>test</div>

```

## $.fragment(html)

function( html:string ) : DocumentFragment

Usage scenarios: 
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

In `create` method，text must be wrapped.


## DOM API

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
### DOM# attr(name:string,val?)
### DOM# attr(name: {[name:string]:string} )
### DOM# dataset(name,val?)
### DOM# removeAttr(...names)
### DOM# val(val?)
### DOM# html(html?)
### DOM# outerHtml(html?):this
如果传入html，则会替换掉原节点，同时返回的是原节点。如果需要替换后的新节点，需要重新获取。
### DOM# text(txt?)
### DOM# style(name:string, val?)
### DOM# style(name: {[name]:string})
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
### DOM# offsetRoot(rootNode, index=0)
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






