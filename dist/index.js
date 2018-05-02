!function(e,t){if("function"==typeof define&&define.amd)define("dom",["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.dom=n.exports}}(this,function(e){"use strict";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=Function.prototype.call,o=i.bind(Array.prototype.slice),u=document.documentElement,a=window,c=function(e){var t=[];return e.forEach(function(e){t.includes(e)||t.push(e)}),t},f=function(e){return e.reduce(function(e,t){return e.concat(t)},[])},s=function(e){var t=e.path||e.composedPath&&e.composedPath();return t&&0!==t.length?t:((t=new g(e.target).parents().nodes).unshift(e.target),t.push(window),t)},l=0,h=i.bind(Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),d=i.bind(Element.prototype.closest||function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(h(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),v=function(e,t){var n;t.nodeType?e(t):(n=t)&&"object"===(void 0===n?"undefined":r(n))&&isFinite(n.length)&&n.length>=0&&n.length===Math.floor(n.length)&&n.length<4294967296&&!n.nodeType&&o(t).forEach(e)},p=/[A-Z]/g,y=function(e){return e.replace(p,function(e,t){return(0===t?"":"-")+e.toLowerCase()})},m=document.createElement("div"),g=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===t?t=[]:t===window?t=[window]:t.nodeType?t=[t]:Array.isArray(t)||(t=Array.from(t)),this.nodes=t,t.forEach(function(e,t){return n[t]=e}),this.length=t.length,_.forEach(function(e){"constructor"!==e&&(n[e]=n[e].bind(n))})}return n(e,[{key:"each",value:function(e){return this.nodes.forEach(e),this}},{key:"map",value:function(e){return this.nodes.map(e)}},{key:"filter",value:function(e){return this.nodes.filter(e)}},{key:"eq",value:function(t){return new e(this.nodes[t])}},{key:"first",value:function(){return this.eq(0)}},{key:"last",value:function(){return this.eq(this.length-1)}},{key:"classNames",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return o(this.nodes[e].classList)}},{key:"addClass",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.each(function(e,n){var r;(r=e.classList).add.apply(r,t)})}},{key:"removeClass",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.each(function(e,n){var r;(r=e.classList).remove.apply(r,t)})}},{key:"toggleClass",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var i,o,u;return this.nodes[0].classList.toggle?this.each(function(e,t){n.forEach(function(t){e.classList.toggle(t)})}):this.each(function(t,r){i=e.classNames(r),o=[],u=[],n.forEach(function(e){i.includes(e)?o.push(e):u.push(e)}),o.length&&e.removeClass.apply(e,o),u.length&&e.addClass.apply(e,u)})}},{key:"hasClass",value:function(e){return this.nodes.some(function(t){return t.classList.contains(e)})}},{key:"parent",value:function(){return new e(this.map(function(e){return e.parentNode}))}},{key:"parents",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.nodes[t].parentNode,r=[];n;)r.push(n),n=n.parentNode;return new e(r)}},{key:"children",value:function(){return new e(c(f(this.map(function(e){return o(e.children)}))))}},{key:"find",value:function(t){return new e(c(f(this.map(function(e){return o(e.querySelectorAll(t))}))))}},{key:"includes",value:function(e){return this.nodes.includes(e)}},{key:"closest",value:function(t){return new e(this.nodes.map(function(e){return d(e,t)}))}},{key:"match",value:function(e){return this.nodes.some(function(t){return h(t,e)})}},{key:"val",value:function(e){return void 0===e?this.map(function(e){return e.value||""}).join(""):this.each(function(t){return t.value=e})}},{key:"attr",value:function(e,t){if(t)return this.each(function(n){return n.setAttribute(e,t)});if("string"==typeof e)return this.map(function(t){return t.getAttribute(e)}).join(" ");if("object"===(void 0===e?"undefined":r(e))){for(var n in e)this.each(function(t){return t.setAttribute(n,e[n])});return this}}},{key:"removeAttr",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach(function(t){e.each(function(e){return e.removeAttribute(t)})}),this}},{key:"html",value:function(e){return void 0===e?this[0].innerHTML:this.each(function(t){return t.innerHTML=e})}},{key:"text",value:function(e){return void 0===e?this.map(function(e){return e.innerText}).join(""):this.each(function(t){return t.innerText=e})}},{key:"style",value:function(e,t){var n={};if("string"==typeof e){if(void 0===t)return this[0].style[e];n[e]=t}else{if("object"!==(void 0===e?"undefined":r(e)))return this;n=e}for(var i in n)this.each(function(e){e.style[i]=n[i]});return this}},{key:"removeStyle",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?this.removeAttr("style"):this.each(function(e){t.forEach(function(t){e.style.removeProperty(t)})})}},{key:"computeStyle",value:function(e){return window.getComputedStyle(this.nodes[0],e)}},{key:"maxScroll",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0];return e.scrollHeight-e.clientHeight}},{key:"_append",value:function(e){return this.each(function(t){t.appendChild(e)})}},{key:"append",value:function(e){return v(this._append,e),this}},{key:"_insertBefore",value:function(e){return this.each(function(t){t.parentNode.insertBefore(e,t)})}},{key:"insertBefore",value:function(e){return v(this._insertBefore,e),this}},{key:"_insertAfter",value:function(e){return this.each(function(t){var n=t.nextElementSibling,r=t.parentNode;n?r.insertBefore(e,n):r.appendChild(e)})}},{key:"insertAfter",value:function(e){return v(this._insertAfter,e),this}},{key:"remove",value:function(){return this.each(function(e){e.parentNode.removeChild(e)})}},{key:"hide",value:function(){var e=this;return this.each(function(t,n){var r=e.eq(n),i=r.computeStyle().display;"none"!==i&&(r.dataset("_pre_display",i),r.style("display","none"))})}},{key:"show",value:function(e){var t=this;return this.each(function(n,r){var i=t.eq(r),o=i.computeStyle().display;if("none"===o)if(e)i.style("display",e);else{var u=i.dataset("_pre_display");if(u)i.style("display",u);else{if("none"===i.style("display")&&(i.removeStyle("display"),"none"!==(o=i.computeStyle().display)))return;i.style("display","block")}}})}},{key:"offset",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0].getBoundingClientRect();return{left:e.left+(a.pageXOffset||u.scrollLeft||document.body.scrollLeft)-u.clientLeft,top:e.top+(a.pageYOffset||u.scrollTop||document.body.scrollTop)-u.clientTop}}},{key:"on",value:function(e,t){return this.each(function(n,r){n.addEventListener(e,t),w(n,e,t)})}},{key:"off",value:function(e,t){return this.each(function(n,r){var i=E(n),o={};for(var u in e?o[e]=t?[t]:i[e]:o=i,o)o[u].forEach(function(e){return n.removeEventListener(u,e)});A(n,e,t)})}},{key:"onDelegate",value:function(e,n,r){return this.each(function(i){var u=E(i),a=u[e]&&u[e].find(function(e){return e.isDelegate});if(a){var c=a.cache;c[n]?c[n].push(r):c[n]=[r]}else{var f=function e(t){var n=s(t),r=[],u=e.cache;for(var a in u)r.push({queryNodes:o(i.querySelectorAll(a)),fns:u[a]});var c=n.length;r.forEach(function(e){for(var r=e.queryNodes,i=e.fns,o=function(){var e=n[u];if(r.includes(e))return i.forEach(function(n){n.call(e,t)}),"break"},u=c;u>-1;u--){if("break"===o())break}})};f.cache=t({},n,[r]),f.isDelegate=!0,i.addEventListener(e,f),w(i,e,f)}})}},{key:"offDelegate",value:function(e,n,r){return this.each(function(i){var o=E(i);if(o){var u;if(e){if(!o[e])return;u=t({},e,o[e].filter(function(e){return e.isDelegate}))}else u=function(e,t){var n={};for(var r in e)n[r]=t(e[r],r);return n}(o,function(e){return e.filter(function(e){return e.isDelegate})});if(n)u[e].forEach(function(t){var o=t.cache;if(o[n])if(r){var u=o[n].indexOf(r);o[n].splice(u,1)}else o[n]=void 0;else;0===Object.keys(o).filter(function(e){return o[e]&&o[e].length>0}).length&&(i.removeEventListener(e,t),A(i,e,t))});else for(var a in u)u[a].forEach(function(e){i.removeEventListener(a,e),A(i,a,e)})}})}}]),e}();g.prototype.dataset=m.dataset?function(e,t){if(t)return this.each(function(n){return n.dataset[e]=t});if("string"==typeof e)return this.map(function(t){return t.dataset[e]}).join("");if("object"===(void 0===e?"undefined":r(e)))for(var n in e)this.each(function(t){return t.dataset[n]=e[n]});return this}:function(e,t){var n;if("string"==typeof e)n="data-"+y(e);else if("object"===(void 0===e?"undefined":r(e)))for(var i in n={},e)n["data-"+y(i)]=e[i];return this.attr(n,t)};var k={},b=function(e){var t=e._expando_e$id;return t||(t=e._expando_e$id=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+l++}("node")),t},E=function(e){var t=b(e),n=k[t];return n||(n=k[t]={}),n},w=function(e,t,n){var r=E(e);r[t]?r[t].push(n):r[t]=[n]},A=function(e,t,n){var r=b(e),i=k[r];i&&(t||(k[r]=void 0),i[t]&&(n||(i[t]=void 0),i[t]=i[t].filter(function(e){return e!==n}),0===i[t].length&&(i[t]=void 0)))};function S(e){return new g("string"==typeof e?document.querySelectorAll(e):e)}["offset","client","scroll"].forEach(function(e){["Height","Width","Top","Left"].forEach(function(t){var n=e+t;g.prototype[n]=function(){return this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0][n]}})}),S.fragment=function(e){m.innerHTML=e;for(var t,n=document.createDocumentFragment();t=m.firstChild;)n.appendChild(t);return n};var L=/</;S.create=function(e){return L.test(e)?(m.innerHTML=e,new g(m.children)):new g(document.createElement(e))};var _=Object.getOwnPropertyNames(g.prototype);e.default=S});