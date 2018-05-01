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

## $.create( html )

function( html:string ) : DocumentFragment 

传入html字符，返回一个DOM对象

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
### DOM# children()
### DOM# find(selector)
### DOM# includes(node)
### DOM# closest(selector)
### DOM# match(selector)
### DOM# val(val?)
### DOM# html(html?)
### DOM# text(txt?)
### DOM# style(name:string|object, val?)
### DOM# computeStyle(pseudoElt?)
### DOM# maxScroll(index = 0) 
### DOM# append(newNode)
### DOM# insertAfter(newNode)
### DOM# insertBefore(newNode)
### DOM# remove()
### DOM# offset(index = 0)
### DOM# on(type, fn)
### DOM# off(type, fn?)
### DOM# onDelegate(type, selector, fn)
### DOM# offDelegate(type, selector?, fn?)
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






