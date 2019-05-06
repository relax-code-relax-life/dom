/*http://wangwl.net*/
!function(e,t){if("function"==typeof define&&define.amd)define("dom",["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.dom=n.exports}}(this,function(e){"use strict";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Function.prototype.call,u=o.bind(Array.prototype.slice),c=document.documentElement,a=window,f=function(e){return"function"==typeof e},l=function(e){var t=[];return e.forEach(function(e){t.includes(e)||t.push(e)}),t},s=function(e){return e.reduce(function(e,t){return e.concat(t)},[])},h=function(e){var t=e.path||e.composedPath&&e.composedPath();return t&&0!==t.length?t:((t=new E(e.target).parents().nodes).unshift(e.target),t.push(window),t)},d=0,v=o.bind(Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),p=o.bind(Element.prototype.closest||function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(v(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),y=function(e){if(e.nodeType)return e;if("string"==typeof e)return H.fragment(e);if((r=e)&&"object"===(void 0===r?"undefined":i(r))&&isFinite(r.length)&&r.length>=0&&r.length===Math.floor(r.length)&&r.length<4294967296&&!r.nodeType){for(var t=document.createDocumentFragment(),n=0;n<e.length;n++)t.appendChild(e[n]);return t}var r},m=/[A-Z]/g,g=function(e){return e.replace(m,function(e,t){return(0===t?"":"-")+e.toLowerCase()})};function k(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}var b=document.createElement("div"),E=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===t?t=[]:t===window?t=[window]:t.nodeType?t=[t]:(Array.isArray(t)||(t=Array.from(t)),t=t.filter(function(e){return e===window||e&&e.nodeType})),this.nodes=t,t.forEach(function(e,t){return n[t]=e}),this.length=t.length,_.forEach(function(e){"constructor"!==e&&(n[e]=n[e].bind(n))})}return r(e,[{key:"each",value:function(e){return this.nodes.forEach(e),this}},{key:"map",value:function(e){return this.nodes.map(e)}},{key:"filter",value:function(e){return this.nodes.filter(e)}},{key:"eq",value:function(t){return new e(this.nodes[t])}},{key:"first",value:function(){return this.eq(0)}},{key:"last",value:function(){return this.eq(this.length-1)}},{key:"classNames",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return u(this.nodes[e].classList)}},{key:"addClass",value:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===(t=t.map(function(e){return e.trim()}).filter(function(e){return e})).length?this:this.each(function(e,r){var i;(i=e.classList).add.apply(i,n(t))})}},{key:"removeClass",value:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===(t=t.map(function(e){return e.trim()}).filter(function(e){return e})).length?this:this.each(function(e,r){var i;(i=e.classList).remove.apply(i,n(t))})}},{key:"toggleClass",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return 0===(n=n.map(function(e){return e.trim()}).filter(function(e){return e})).length?this:this.nodes[0].classList.toggle?this.each(function(e,t){n.forEach(function(t){e.classList.toggle(t)})}):this.each(function(t,r){i=e.classNames(r),o=[],u=[],n.forEach(function(e){i.includes(e)?o.push(e):u.push(e)}),o.length&&e.removeClass.apply(e,o),u.length&&e.addClass.apply(e,u)});var i,o,u}},{key:"hasClass",value:function(e){return this.nodes.some(function(t){return t.classList.contains(e)})}},{key:"parent",value:function(){return new e(this.map(function(e){return e.parentNode}))}},{key:"parents",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.nodes[t].parentNode,r=[];n;)r.push(n),n=n.parentNode;return new e(r)}},{key:"children",value:function(){return new e(l(s(this.map(function(e){return u(e.children)}))))}},{key:"next",value:function(){return new e(this.map(function(e){return k(e,"nextSibling")}))}},{key:"prev",value:function(){return new e(this.map(function(e){return k(e,"previousSibling")}))}},{key:"find",value:function(t){return new e(l(s(this.map(function(e){return u(e.querySelectorAll(t))}))))}},{key:"closest",value:function(t){return new e(this.nodes.map(function(e){return p(e,t)}))}},{key:"includes",value:function(e){return this.nodes.includes(e)}},{key:"match",value:function(e){return this.nodes.some(function(t){return v(t,e)})}},{key:"val",value:function(e){return void 0===e?this.map(function(e){return e.value||""}).join(""):this.each(function(t){return t.value=e})}},{key:"attr",value:function(e,t){if(t)return this.each(function(n){return n.setAttribute(e,t)});if("string"==typeof e)return this.map(function(t){return t.getAttribute(e)}).join(" ");if("object"===(void 0===e?"undefined":i(e))){for(var n in e)this.each(function(t){return t.setAttribute(n,e[n])});return this}}},{key:"removeAttr",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach(function(t){e.each(function(e){return e.removeAttribute(t)})}),this}},{key:"html",value:function(e){return void 0===e?this.map(function(e){return e.innerHTML}).join(""):this.each(function(t){return t.innerHTML=e})}},{key:"outerHtml",value:function(e){return void 0===e?this.map(function(e){return e.outerHTML}).join(""):this.each(function(t){return t.outerHTML=e})}},{key:"text",value:function(e){return void 0===e?this.map(function(e){return e.innerText}).join(""):this.each(function(t){return t.innerText=e})}},{key:"append",value:function(e){if(!(e=y(e)))return this;var t=this.length-1;return this.each(function(n,r){n.appendChild(r===t?e:e.cloneNode(!0))})}},{key:"prepend",value:function(e){if(!(e=y(e)))return this;var t=this.length-1;return this.each(function(n,r){n.insertBefore(r===t?e:e.cloneNode(!0),n.firstChild)})}},{key:"insertBefore",value:function(e){if(!(e=y(e)))return this;var t=this.length-1;return this.each(function(n,r){n.parentNode.insertBefore(r===t?e:e.cloneNode(!0),n)})}},{key:"insertAfter",value:function(e){if(!(e=y(e)))return this;var t=this.length-1;return this.each(function(n,r){var i=n.nextElementSibling,o=n.parentNode,u=r===t?e:e.cloneNode(!0);i?o.insertBefore(u,i):o.appendChild(u)})}},{key:"replace",value:function(e){if(!(e=y(e)))return this;var t=this.length-1;return this.each(function(n,r){n.parentNode.replaceChild(r===t?e:e.cloneNode(!0),n)})}},{key:"remove",value:function(){return this.each(function(e){e.parentNode&&e.parentNode.removeChild(e)})}},{key:"style",value:function(e,t){var n={};if("string"==typeof e){if(void 0===t)return this[0].style[e];n[e]=t}else{if("object"!==(void 0===e?"undefined":i(e)))return this;n=e}for(var r in n)this.each(function(e){e.style[r]=n[r]});return this}},{key:"removeStyle",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?this.removeAttr("style"):this.each(function(e){t.forEach(function(t){e.style.removeProperty(t)})})}},{key:"computeStyle",value:function(e){return window.getComputedStyle(this.nodes[0],e)}},{key:"maxScroll",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0];return e.scrollHeight-e.clientHeight}},{key:"hide",value:function(){var e=this;return this.each(function(t,n){var r=e.eq(n),i=r.computeStyle().display;"none"!==i&&(r.dataset("_pre_display",i),r.style("display","none"))})}},{key:"show",value:function(e){var t=this;return this.each(function(n,r){var i=t.eq(r),o=i.computeStyle().display;if("none"===o)if(e)i.style("display",e);else{var u=i.dataset("_pre_display");if(u)i.style("display",u);else{if("none"===i.style("display")&&i.removeStyle("display"),"none"!==(o=i.computeStyle().display))return;i.style("display","block")}}})}},{key:"clone",value:function(t){return new e(this.map(function(e){return e.cloneNode(t)}))}},{key:"offset",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0].getBoundingClientRect();return{left:e.left+(a.pageXOffset||c.scrollLeft||document.body.scrollLeft)-c.clientLeft,top:e.top+(a.pageYOffset||c.scrollTop||document.body.scrollTop)-c.clientTop}}},{key:"offsetRoot",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!e||!e.nodeType)return this.offset(t);var n=this[t];if(!e.contains(n))return 0;var r=n.getBoundingClientRect(),i=e.getBoundingClientRect();return{left:r.left-i.left-e.clientLeft+e.scrollLeft,top:r.top-i.top-e.clientTop+e.scrollTop}}},{key:"trigger",value:function(e,t){return this.each(function(n){q(n,e,t)})}},{key:"on",value:function(e,t){return this.each(function(n,r){n.addEventListener(e,t),L(n,e,t)})}},{key:"off",value:function(e,t){return this.each(function(n,r){var i=S(n),o={};for(var u in e?o[e]=t?[t]:i[e]:o=i,o)o[u].forEach(function(e){return n.removeEventListener(u,e)});T(n,e,t)})}},{key:"onDelegate",value:function(e,n,r){return this.each(function(i){var o=S(i),c=o[e]&&o[e].find(function(e){return e.isDelegate});if(c){var a=c.cache;a[n]?a[n].push(r):a[n]=[r]}else{var f=function e(t){var n=h(t),r=[],o=e.cache;for(var c in o)r.push({queryNodes:u(i.querySelectorAll(c)),fns:o[c]});var a=n.length;r.forEach(function(e){for(var r=e.queryNodes,i=e.fns,o=function(){var e=n[u];if(r.includes(e))return i.forEach(function(n){n.call(e,t)}),"break"},u=a;u>-1;u--){if("break"===o())break}})};f.cache=t({},n,[r]),f.isDelegate=!0,i.addEventListener(e,f),L(i,e,f)}})}},{key:"offDelegate",value:function(e,n,r){return this.each(function(i){var o=S(i);if(o){var u;if(e){if(!o[e])return;u=t({},e,o[e].filter(function(e){return e.isDelegate}))}else u=function(e,t){var n={};for(var r in e)n[r]=t(e[r],r);return n}(o,function(e){return e.filter(function(e){return e.isDelegate})});if(n)u[e].forEach(function(t){var o=t.cache;if(o[n])if(r){var u=o[n].indexOf(r);o[n].splice(u,1)}else o[n]=void 0;else;0===Object.keys(o).filter(function(e){return o[e]&&o[e].length>0}).length&&(i.removeEventListener(e,t),T(i,e,t))});else for(var c in u)u[c].forEach(function(e){i.removeEventListener(c,e),T(i,c,e)})}})}}]),e}();E.prototype.dataset=b.dataset?function(e,t){if(t)return this.each(function(n){return n.dataset[e]=t});if("string"==typeof e)return this.map(function(t){return t.dataset[e]}).join("");if("object"===(void 0===e?"undefined":i(e)))for(var n in e)this.each(function(t){return t.dataset[n]=e[n]});return this}:function(e,t){var n;if("string"==typeof e)n="data-"+g(e);else if("object"===(void 0===e?"undefined":i(e)))for(var r in n={},e)n["data-"+g(r)]=e[r];return this.attr(n,t)};var w={},A=function(e){var t=e._expando_e$id;return t||(t=e._expando_e$id=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+d++}("node")),t},S=function(e){var t=A(e),n=w[t];return n||(n=w[t]={}),n},L=function(e,t,n){var r=S(e);r[t]?r[t].push(n):r[t]=[n]},T=function(e,t,n){var r=A(e),i=w[r];i&&(t||(w[r]=void 0),i[t]&&(n?(i[t]=i[t].filter(function(e){return e!==n}),0===i[t].length&&(i[t]=void 0)):i[t]=void 0))},C=function(e,t){if(f(Event))return new Event(e,t);var n=document.createEvent("MouseEvents");return n.initEvent(e,!0,!0),t&&Object.assign(n,t),n},N=function(e,t,n){return f(e)?new e(t,n):C(t,n)},j=N.bind(void 0,MouseEvent),x=[[/^key.*/,N.bind(void 0,KeyboardEvent)],[/^(.*click|mouse.*|drop)/,j],[/^(focus.*|blur)/,N(void 0,FocusEvent)],[/^wheel/,N(void 0,WheelEvent)]],M={focus:{check:function(e){return e.focus},trigger:function(e){e.focus()}},blur:{check:function(e){return e.blur},trigger:function(e){e.blur()}},click:{check:function(e){return e.click},trigger:function(e){e.click()}}},q=function(e,t,n){if(t=t.trim(),M[t]&&M[t].check(e))M[t].trigger(e);else{var r=function(e,t){var n=x.find(function(t){return t[0].test(e)});return n?n[1](e,t):C(e,t)}(t,n);e.dispatchEvent(r)}};function H(e){return new E("string"==typeof e?document.querySelectorAll(e):e)}["offset","client","scroll"].forEach(function(e){["Height","Width","Top","Left"].forEach(function(t){var n=e+t;E.prototype[n]=function(){return this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0][n]}})}),H.fragment=function(e){b.innerHTML=e;for(var t,n=document.createDocumentFragment();t=b.firstChild;)n.appendChild(t);return n};var O=/</;H.create=function(e){return O.test(e)?(b.innerHTML=e,new E(b.children)):new E(document.createElement(e))};var _=Object.getOwnPropertyNames(E.prototype);e.default=H});