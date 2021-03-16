Lightweight DOM manipulation library.

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

# API`

## $( selector )

function ( selector: string|HTMLElement ) : Dom

If the type of `selector` parameter is string, the function will query by `document.querySelectorAll`.

## $.create( htmlOrTag )

function( htmlOrTag:string ) : Dom

Create a Dom object from html or tagName.

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


## Dom API

### Dom# each( fn )

### Dom# map( fn )

### Dom# filter( fn )

### Dom# eq( index )

### Dom# first( )

### Dom# last( )

### Dom# classNames( index=0 )

### Dom# addClass( ...names )
### Dom# removeClass( ...names )
### Dom# toggleClass( ...names )
### Dom# hasClass(name)
### Dom# parent()
### Dom# parents()
### Dom# children()
### Dom# prev()
### Dom# next()
### Dom# find(selector)
### Dom# includes(node)
### Dom# closest(selector)
### Dom# match(selector)
### Dom# attr(name:string,val?)
### Dom# attr(name: {[name:string]:string} )
### Dom# dataset(name,val?)
### Dom# removeAttr(...names)
### Dom# val(val?)
### Dom# html(html?)
### Dom# outerHtml(html?):this
如果传入html，则会替换掉原节点，同时返回的是原节点。如果需要替换后的新节点，需要重新获取。
### Dom# text(txt?)
### Dom# style(name:string, val?)
### Dom# style(name: {[name]:string})
### Dom# removeStyle(...names)
### Dom# computeStyle(pseudoElt?)
### Dom# maxScroll(index = 0) 
### Dom# append(newNode)
### Dom# prepend(newNode)
### Dom# insertAfter(newNode)
### Dom# insertBefore(newNode)
### Dom# replace(newNode)
### Dom# remove()
### Dom# hide()
### Dom# show(displayValue?)
### Dom# clone(deep?)
### Dom# offset(index = 0)
### Dom# offsetRoot(rootNode, index=0)
### Dom# on(type, fn)
### Dom# off(type, fn?)
### Dom# onDelegate(type, selector, fn)
### Dom# offDelegate(type, selector?, fn?)
### Dom# trigger(type,data?)
### Dom# offsetHeight(index=0)
### Dom# offsetWidth(index=0)
### Dom# offsetTop(index=0)
### Dom# offsetLeft(index=0)
### Dom# clientHeight(index=0)
### Dom# clientWidth(index=0)
### Dom# clientTop(index=0)
### Dom# clientLeft(index=0)
### Dom# scrollHeight(index=0)
### Dom# scrollWidth(index=0)
### Dom# scrollTop(index=0)
### Dom# scrollLeft(index=0)






