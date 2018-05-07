var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);

var docEle = document.documentElement;
var win = window;

var isFunction = function (tar) {
    return typeof tar === 'function';
}

//fn返回布尔true，则跳出循环。
var mapObj = function (obj, fn) {
    var result = {};
    for (var key in obj) {
        result[key] = fn(obj[key], key);
    }
    return result;
}

var uniqArr = function (arr) {
    var result = [];
    arr.forEach((item) => {
        if (!result.includes(item)) {
            result.push(item);
        }
    });
    return result;
}


var flatArr = function (arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(cur);
    }, [])
}

var isArrayLike = function (o) {
    return o &&
        typeof o === 'object' &&
        isFinite(o.length) &&
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&
        o.length < 4294967296 &&
        !o.nodeType;
};

var getEventPath = function (e) {

    var result = e.path || (e.composedPath && e.composedPath());
    if (result && result.length !== 0) return result;

    result = new Dom(e.target).parents().nodes;
    result.unshift(e.target);
    result.push(window);
    return result;

};

var guid = 0;
var getGUID = function (prefix = '') {
    return prefix + guid++;
}

var eleMatches = call.bind(Element.prototype.matches ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1;
    });

var eleClosest = call.bind(Element.prototype.closest ||
    function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (eleMatches(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    });


var validNodeParam = function (node) {
    if (node.nodeType) {  // fragment#nodeType : 11
        return node;
    }
    else if (isArrayLike(node)) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < node.length; i++) {
            fragment.appendChild(node[i]);
        }

        return fragment;
    }
}

var reg_upperCase = /[A-Z]/g;
var kebabCase = function (name) {
    return name.replace(reg_upperCase, function (match, pos) {
        return (pos === 0 ? '' : '-') + match.toLowerCase()
    });
};


function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
}

var tmpEle = document.createElement('div');

class Dom {
    /**
     * @param nodes {Array:HTMLElement}
     */
    constructor(nodes) {
        if (nodes === undefined) {
            nodes = [];
        }
        else if (nodes === window) {
            nodes = [window];
        }
        else if (nodes.nodeType) {
            nodes = [nodes];
        }
        else if (!Array.isArray(nodes)) {
            nodes = Array.from(nodes);
        }

        this.nodes = nodes;

        nodes.forEach((node, index) => this[index] = node);

        this.length = nodes.length;

        domMethodNames.forEach(name => {
            if (name === 'constructor') return;
            this[name] = this[name].bind(this);
        })
    }


    each(fn) {
        this.nodes.forEach(fn);
        return this;
    }

    map(fn) {
        return this.nodes.map(fn);
    }

    filter(fn) {
        return this.nodes.filter(fn);
    }


    eq(index) {
        return new Dom(this.nodes[index]);
    }

    first() {
        return this.eq(0)
    }

    last() {
        return this.eq(this.length - 1);
    }

    classNames(index = 0) {
        return slice(this.nodes[index].classList);
    }

    addClass(...names) {
        return this.each((node, index) => {
            node.classList.add(...names);
        })
    }

    removeClass(...names) {
        return this.each((node, index) => {
            node.classList.remove(...names);
        })
    }

    toggleClass(...names) {

        var isSupport = this.nodes[0].classList.toggle;
        if (isSupport) {
            return this.each((node, index) => {
                names.forEach(name => {
                    node.classList.toggle(name);
                })
            })
        }

        var existNames,
            delNames,
            addNames;

        return this.each((node, index) => {
            existNames = this.classNames(index);
            delNames = [];
            addNames = [];
            names.forEach((name) => {
                if (existNames.includes(name)) {
                    delNames.push(name);
                }
                else {
                    addNames.push(name);
                }
            });
            if (delNames.length) {
                this.removeClass.apply(this, delNames);
            }
            if (addNames.length) {
                this.addClass.apply(this, addNames)
            }
        });
    }

    hasClass(name) {
        return this.nodes.some((node) => node.classList.contains(name))
    }


    parent() {
        return new Dom(this.map((node) => node.parentNode));
    }

    parents(index = 0) {
        var parent = this.nodes[index].parentNode;
        var parents = [];
        while (parent) {
            parents.push(parent);
            parent = parent.parentNode;
        }
        return new Dom(parents);
    }

    children() {
        return new Dom(
            uniqArr(
                flatArr(
                    this.map(
                        node => slice(node.children)
                    )
                )
            )
        );
    }

    next() {
        return new Dom(this.map(node => sibling(node, 'nextSibling')));
    }

    prev() {
        return new Dom(this.map(node => sibling(node, 'previousSibling')));
    }

    find(selector) {
        return new Dom(
            uniqArr(
                flatArr(
                    this.map(
                        node => slice(node.querySelectorAll(selector))
                    )
                )
            )
        );
    }

    includes(node) {
        return this.nodes.includes(node);
    }

    closest(selector) {
        return new Dom(
            this.nodes.map(node => eleClosest(node, selector))
        );
    }

    match(selector) {
        return this.nodes.some(node => eleMatches(node, selector));
    }

    val(val) {
        if (val === undefined) {
            return this.map((node) => node.value || '').join('');
        }
        else return this.each(node => node.value = val);

    }

    attr(name, val) {
        if (val) {
            return this.each(node => node.setAttribute(name, val));
        }
        else if (typeof name === 'string') {
            return this.map(node => node.getAttribute(name)).join(' ');
        }
        else if (typeof name === 'object') {
            for (var key in name) {
                this.each(node => node.setAttribute(key, name[key]));
            }
            return this;
        }
    }

    removeAttr(...names) {
        // names = names.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(cur) : (prev.push(cur) && prev), []);
        names.forEach((name) => {
            this.each(node => node.removeAttribute(name));
        });
        return this;
    }

    html(html) {
        if (html === undefined) {
            return this[0].innerHTML;
        }
        else {
            return this.each(node => node.innerHTML = html);
        }
    }

    text(txt) {
        if (txt === undefined) {
            return this.map((node) => node.innerText).join('');
        }
        else {
            return this.each(node => node.innerText = txt);
        }
    }

    //name: 和style.cssProperty形式一致，使用驼峰形式
    style(name, val) {

        var vals = {};

        if (typeof name === 'string') {
            if (val === undefined) {
                // return this[0].style.getPropertyValue(name);
                return this[0].style[name];
            }
            else vals[name] = val;
        }

        else if (typeof name === 'object') {
            vals = name;
        }
        else return this;

        for (var key in vals) {
            this.each(function (node) {
                // console.log('style add', key, vals[key])
                // node.style.setProperty(key, vals[name]);
                node.style[key] = vals[key];
            })
        }

        return this;
    }

    removeStyle(...names) {
        if (names.length === 0) return this.removeAttr('style');
        else return this.each(node => {
            names.forEach(name => {
                node.style.removeProperty(name);
            })
        })
    }

    /**
     * @param [pseudoElt]
     * @returns {CSSStyleDeclaration}
     */
    computeStyle(pseudoElt) {
        return window.getComputedStyle(this.nodes[0], pseudoElt);
    }

    maxScroll(index = 0) {
        var node = this[index];
        return node.scrollHeight - node.clientHeight;
    }


    //jquery中，实例内部的nodes中，最后一个node添加的是原newNode，其余的添加的都是clone的。
    //保持jquery逻辑
    append(newNode) {

        newNode = validNodeParam(newNode);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((node, index) => {
            node.appendChild(index === lastIndex ? newNode : newNode.cloneNode(true));
        })

    }


    prepend(newNode) {

        newNode = validNodeParam(newNode);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((node, index) => {
            node.insertBefore(index === lastIndex ? newNode : newNode.cloneNode(true), node.firstChild);
        })

    }


    insertBefore(newNode) {

        newNode = validNodeParam(newNode);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((node, index) => {
            node.parentNode.insertBefore(index === lastIndex ? newNode : newNode.cloneNode(true), node);
        })

    }


    insertAfter(newNode) {
        newNode = validNodeParam(newNode);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((node, index) => {
            var next = node.nextElementSibling;
            var parent = node.parentNode;
            var tar = index === lastIndex ? newNode : newNode.cloneNode(true);

            if (next) {
                parent.insertBefore(tar, next);
            }
            else {
                parent.appendChild(tar);
            }
        });

    }

    replace(newNode) {
        newNode = validNodeParam(newNode);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((node, index) => {
            node.parentNode.replaceChild(index === lastIndex ? newNode : newNode.cloneNode(true), node);
        })
    }

    remove() {
        return this.each(node => {
            node.parentNode && node.parentNode.removeChild(node);
        });
    }

    hide() {
        return this.each((node, index) => {

            var $cur = this.eq(index);
            var oldDisplay = $cur.computeStyle().display;

            if (oldDisplay !== 'none') {

                $cur.dataset('_pre_display', oldDisplay);
                $cur.style('display', 'none')
            }

        })
    }

    show(displayValue) {
        return this.each((node, index) => {
            var $cur = this.eq(index);
            var computeDisplay = $cur.computeStyle().display;
            if (computeDisplay !== 'none') return;

            if (displayValue) {
                $cur.style('display', displayValue);
                return;
            }

            var preDisplay = $cur.dataset('_pre_display');
            if (preDisplay) $cur.style('display', preDisplay);
            else {
                //没有缓存原本的display，需要推算
                var inline = $cur.style('display');
                if (inline === 'none') {
                    $cur.removeStyle('display');

                    computeDisplay = $cur.computeStyle().display;
                    if (computeDisplay !== 'none') return;
                }

                // 1. 去除行内 display:none 后，还是none
                // 2. 不存在行内display，或者行内display不是none

                $cur.style('display', 'block');

            }


        })
    }

    clone(deep) {
        var nodes = this.map(node => {
            return node.cloneNode(deep);
        });
        return new Dom(nodes);
    }

    offset(index = 0) {
        var box = this[index].getBoundingClientRect();
        return {
            left: box.left + (win.pageXOffset || docEle.scrollLeft || document.body.scrollLeft) - docEle.clientLeft,
            top: box.top + (win.pageYOffset || docEle.scrollTop || document.body.scrollTop) - docEle.clientTop
        }
    }

    trigger(type, eventInit) {
        return this.each(node => {
            triggerNode(node, type, eventInit);
        })
    }

    on(type, fn) {
        return this.each((node, index) => {
            // console.log('addEventListener', node, fn);
            node.addEventListener(type, fn);
            pushEventCache(node, type, fn);
        })
    }

    off(type, fn) {
        return this.each((node, index) => {

            var cache = getEventCache(node);
            var type_fns = {};
            if (!type) {
                type_fns = cache;
            }
            else if (!fn) {
                type_fns[type] = cache[type];
            }
            else type_fns[type] = [fn];


            for (var key in type_fns) {
                type_fns[key].forEach(fn => node.removeEventListener(key, fn));
            }

            removeEventCache(node, type, fn);

        })
    }


    onDelegate(type, selector, fn) {

        //通过on添加的事件回调，在接收到冒泡的事件时，this和e.currentTarget一致。
        //目标是在delegate中，和on中保持一致， this和e.currentTarget为selector指定的元素。
        //  由于currentTarget为只读不可更改，
        //  所以，e.currentTarget仍然绑定事件的节点，this为selector指定的元素。

        return this.each((node) => {

            var cache = getEventCache(node);
            var wrapper = cache[type] && cache[type].find(fn => fn.isDelegate);

            if (!wrapper) {
                var listener = function (e) {

                    var pathNodes = getEventPath(e);

                    var queryNodesList = [];

                    //cache:  { selector : fns }
                    var selector_fns_map = listener.cache;
                    for (var s in selector_fns_map) {
                        queryNodesList.push(
                            {
                                queryNodes: slice(node.querySelectorAll(s)),
                                fns: selector_fns_map[s]
                            }
                        );
                    }

                    var startIndex = pathNodes.length;
                    queryNodesList.forEach(({queryNodes, fns}) => {

                        for (var i = startIndex; i > -1; i--) {
                            let cur = pathNodes[i];
                            if (queryNodes.includes(cur)) {

                                fns.forEach(fn => {
                                    // e.currentTarget=cur;
                                    fn.call(cur, e);
                                    // fn.call(cur, Object.create(e, {currentTarget: {value: cur}}))
                                })

                                break;
                            }
                        }

                    });

                }

                listener.cache = {[selector]: [fn]};
                listener.isDelegate = true;

                node.addEventListener(type, listener);
                pushEventCache(node, type, listener);
            }
            else {
                var selector_fns_map = wrapper.cache;
                if (selector_fns_map[selector]) {
                    selector_fns_map[selector].push(fn);
                }
                else {
                    selector_fns_map[selector] = [fn];
                }
            }

        });
    }

    //需要保证和onDelegate的type,selector,fn都相同。
    //或者
    //  缺省fn,则是取消对selector的代理监听。
    //  缺省selector和fn,则是取消在当前对type类型事件的所有代理监听。
    offDelegate(type, selector, fn) {

        return this.each((node) => {

            var cache = getEventCache(node);
            if (!cache) return;


            //{ type:[ listener ] }
            // listener: function()
            // listener.cache   { selector:fn }
            var type_listeners_map;


            //offDelegate(), 缺省type，在取消对该node的所有代理监听
            if (!type) {
                type_listeners_map = mapObj(cache, listeners => {
                    return listeners.filter(listener => listener.isDelegate);
                })
            }
            else if (!cache[type]) return;
            else {
                type_listeners_map = {
                    [type]: cache[type].filter(listener => listener.isDelegate)
                }
            }


            //offDelegate(), offDelegate('click')
            if (!selector) {
                for (var t in type_listeners_map) {
                    type_listeners_map[t].forEach(listener => {
                        node.removeEventListener(t, listener);
                        removeEventCache(node, t, listener);
                    })
                }
                return;
            }


            //offDelegate('click','div');
            type_listeners_map[type].forEach(listener => {
                var cache = listener.cache;
                if (!cache[selector]) {

                }
                else if (!fn) {
                    cache[selector] = undefined;
                }
                else {
                    var index = cache[selector].indexOf(fn);
                    cache[selector].splice(index, 1);
                }

                var isNoDelListener = Object.keys(cache).filter((selector) => {
                    return cache[selector] && cache[selector].length > 0
                }).length === 0;

                if (isNoDelListener) {
                    node.removeEventListener(type, listener);
                    removeEventCache(node, type, listener);
                }

            })


        })
    }
}


Dom.prototype.dataset = (function () {

    if (tmpEle.dataset) {
        return function (name, val) {
            if (val) return this.each(node => node.dataset[name] = val);
            else if (typeof name === 'string') {
                return this.map(node => node.dataset[name]).join('')
            }
            else if (typeof name === 'object') {
                for (var key in name) {
                    this.each(node => node.dataset[key] = name[key])
                }
            }
            return this;
        }
    }
    else {
        return function (name, val) {
            var convertName;
            if (typeof name === 'string') convertName = 'data-' + kebabCase(name);
            else if (typeof name === 'object') {
                convertName = {};
                for (var key in name) {
                    convertName['data-' + kebabCase(key)] = name[key];
                }
            }
            return this.attr(convertName, val);
        }
    }

})();


//region event help

// id--> { type--> fns }
var eventCacheMap = {};

const getNodeId = function (node) {
    var id = node._expando_e$id;
    if (!id) {
        id = node._expando_e$id = getGUID('node');
    }

    return id;
};
const getEventCache = function (node) {
    var id = getNodeId(node);
    var cache = eventCacheMap[id];
    if (!cache) cache = eventCacheMap[id] = {};

    return cache

};

const pushEventCache = function (node, type, fn) {

    var cache = getEventCache(node);

    if (!cache[type]) {
        cache[type] = [fn];
    }
    else {
        cache[type].push(fn);
    }

};
const removeEventCache = function (node, type, fn) {
    var id = getNodeId(node);
    var cache = eventCacheMap[id];

    if (!cache) return;

    //removeEventCache(node)
    if (!type) {
        eventCacheMap[id] = undefined;
    }

    //removeEventCache(node,type)
    if (!cache[type]) return;
    if (!fn) {
        cache[type] = undefined;
    }

    //removeEventCache(node,type,fn)
    cache[type] = cache[type].filter((listener) => listener !== fn);
    if (cache[type].length === 0) cache[type] = undefined;
};


const getBaseEvent = function (name, eventInit) {
    if (isFunction(Event)) {
        return new Event(name, eventInit);
    }
    else {
        var ev = document.createEvent("MouseEvents");
        ev.initEvent(name, true, true);//事件类型,是否冒泡,是否可以取消事件
        if (eventInit)
            Object.assign(ev, eventInit);
        return ev;

    }
}
const getSpecialEvent = function (constructor, name, eventInit) {
    return isFunction(constructor) ? new constructor(name, eventInit) : getBaseEvent(name, eventInit);
}
const getMouseEvent = getSpecialEvent.bind(this, MouseEvent);
const getKeyEvent = getSpecialEvent.bind(this, KeyboardEvent);
const getFocusEvent = getSpecialEvent(this, FocusEvent);
const getWheelEvent = getSpecialEvent(this, WheelEvent);


var eventFactoryMap = [
    [/^key.*/, getKeyEvent],
    [/^(.*click|mouse.*|drop)/, getMouseEvent],
    [/^(focus.*|blur)/, getFocusEvent],
    [/^wheel/, getWheelEvent]
]
const getEvent = function (name, eventInit) {
    var factoryMap = eventFactoryMap.find(entry => entry[0].test(name));
    return factoryMap ? factoryMap[1](name, eventInit) : getBaseEvent(name, eventInit);
}

var triggerSpecial = {
    focus: {
        check(node) {
            return node.focus
        },
        trigger(node) {
            node.focus();
        }
    },
    blur: {
        check(node) {
            return node.blur
        },
        trigger(node) {
            node.blur();
        }
    },
    click: {
        check(node) {
            return node.click
        },
        trigger(node) {
            node.click();
        }
    }
}

var triggerNode = function (node, name, eventInit) {
    name = name.trim();
    if (triggerSpecial[name] && triggerSpecial[name].check(node)) {
        triggerSpecial[name].trigger(node);
        return;
    }

    var event = getEvent(name, eventInit);
    node.dispatchEvent(event);
};


//endregion


['offset', 'client', 'scroll'].forEach(function (prefix) {
    ['Height', 'Width', 'Top', 'Left'].forEach(function (suffix) {
        var prop = prefix + suffix;
        Dom.prototype[prop] = function (index = 0) {
            return this[index][prop];
        };
    });
})


// $.eventCacheMap = eventCacheMap;

function $(selector) {
    if (typeof selector === 'string') {
        return new Dom(document.querySelectorAll(selector));
    }
    else {
        return new Dom(selector);
    }
}


$.fragment = function (html) {
    tmpEle.innerHTML = html;
    var fragment = document.createDocumentFragment();
    var child;
    while (child = tmpEle.firstChild) {
        fragment.appendChild(child);
    }
    return fragment;
}

var isHtml = /</;
$.create = function (html) {
    if (isHtml.test(html)) {
        tmpEle.innerHTML = html;
        return new Dom(tmpEle.children);
    }
    else {
        return new Dom(document.createElement(html));
    }
}


const domMethodNames = Object.getOwnPropertyNames(Dom.prototype);

export default $;