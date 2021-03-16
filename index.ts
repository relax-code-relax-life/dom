var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);

var docEle = document.documentElement;
var win = window;

var isFunction = function (tar): tar is Function {
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

var isArrayLike = function (o): o is ArrayLike<any> {
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
    // @ts-ignore
    Element.prototype.matchesSelector ||
    // @ts-ignore
    Element.prototype.mozMatchesSelector ||
    // @ts-ignore
    Element.prototype.msMatchesSelector ||
    // @ts-ignore
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

interface n extends HTMLElement {
    value?: string
}

type nodeConvertible = HTMLElement | HTMLElement[] | DocumentFragment | string;

function testNodeOrFragment(node): node is HTMLElement | DocumentFragment {
    return node.nodeType
}

var validNodeParam = function (node: nodeConvertible): HTMLElement | DocumentFragment {
    if (testNodeOrFragment(node)) {  // fragment#nodeType : 11
        return node;
    } else if (typeof node === 'string') {
        return $.fragment(node);
    } else if (isArrayLike(node)) {
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
    nodes: n[]
    length: number
    [index: number]: n

    /**
     * @param n {Array:HTMLElement}
     */
    constructor(n: Array<n | typeof window | HTMLElement | Node> | typeof window | n | NodeList | HTMLCollection) {
        let nodes
        if (n == null) {
            nodes = [];
        } else if (n === window) {
            nodes = [window];
        } else if ((n as Element).nodeType) {
            nodes = [n];
        } else {
            if (!Array.isArray(n)) {
                nodes = Array.from(n as any);
            }
            nodes = (n as any[]).filter(node => {
                return node === window || (node && node.nodeType);
            })
        }

        this.nodes = nodes;

        nodes.forEach((node, index) => this[index] = node);

        this.length = nodes.length;

        domMethodNames.forEach(name => {
            if (name === 'constructor') return;
            this[name] = this[name].bind(this);
        })
    }


    each(fn: (node: n, index?: number, c?: n[]) => void): this {
        this.nodes.forEach(fn);
        return this;
    }

    map<T>(fn: (node: n, index?: number, c?: n[]) => T): T[] {
        return this.nodes.map(fn);
    }

    filter(fn: (node: n, index?: number, c?: n[]) => boolean): n[] {
        return this.nodes.filter(fn);
    }


    eq(index: number): Dom {
        return new Dom(this.nodes[index]);
    }

    first(): Dom {
        return this.eq(0)
    }

    last(): Dom {
        return this.eq(this.length - 1);
    }

    //region class
    classNames(index = 0): string[] {
        return slice(this.nodes[index].classList);
    }

    addClass(...names: string[]): this {
        names = names.map(name => name.trim()).filter(name => name);
        if (names.length === 0) return this;
        return this.each((node, index) => {
            node.classList.add(...names);
        })
    }

    removeClass(...names: string[]): this {
        names = names.map(name => name.trim()).filter(name => name);
        if (names.length === 0) return this;

        return this.each((node, index) => {
            node.classList.remove(...names);
        })
    }

    toggleClass(...names: string[]): this {
        names = names.map(name => name.trim()).filter(name => name);
        if (names.length === 0) return this;

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
                } else {
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

    hasClass(name: string): boolean {
        return this.nodes.some((node) => node.classList.contains(name))
    }

    //endregion

    //region walk dom

    parent(): Dom {
        const nodes = this.map((node) => node.parentNode as HTMLElement);
        return new Dom(nodes);
    }

    parents(index = 0): Dom {
        var parent = this.nodes[index].parentNode;
        var parents = [];
        while (parent) {
            parents.push(parent);
            parent = parent.parentNode;
        }
        return new Dom(parents);
    }

    children(): Dom {
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

    next(): Dom {
        return new Dom(
            this.map(node => sibling(node, 'nextSibling'))
        );
    }

    prev(): Dom {
        return new Dom(
            this.map(node => sibling(node, 'previousSibling'))
        );
    }

    find(selector: string): Dom {
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

    closest(selector: string): Dom {
        return new Dom(
            this.nodes.map(node => eleClosest(node, selector))
        );
    }

    //endregion

    //region assert
    includes(node: HTMLElement): boolean {
        return this.nodes.includes(node);
    }

    match(selector: string) {
        return this.nodes.some(node => eleMatches(node, selector));
    }

    //endregion

    //region manipulate
    val(): string;
    val(val: string): this;
    val(val?) {
        if (val === undefined) {
            return this.map((node) => node.value || '').join('');
        } else return this.each(node => node.value = val);
    }

    attr(name: string): string;
    attr(name: { [name: string]: string }): this;
    attr(name: string, val: string): this;
    attr(name, val?) {
        if (val) {
            return this.each(node => node.setAttribute(name, val));
        } else if (typeof name === 'string') {
            return this.map(node => node.getAttribute(name)).join(' ');
        } else if (typeof name === 'object') {
            for (var key in name) {
                this.each(node => node.setAttribute(key, name[key]));
            }
            return this;
        }
    }

    removeAttr(...names: string[]): this {
        // names = names.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(cur) : (prev.push(cur) && prev), []);
        names.forEach((name) => {
            this.each(node => node.removeAttribute(name));
        });
        return this;
    }

    html(): string;
    html(html: string): this;
    html(html?) {
        if (html === undefined) {
            return this.map(node => node.innerHTML).join('');
        } else {
            return this.each(node => node.innerHTML = html);
        }
    }

    outerHtml(): string;
    outerHtml(string): this;
    outerHtml(html?) {
        if (html === undefined) {
            return this.map(node => node.outerHTML).join('');
        } else {
            return this.each(node => node.outerHTML = html);
        }
    }

    text(): string;
    text(string): this;
    text(txt?) {
        if (txt === undefined) {
            return this.map((node) => node.innerText).join('');
        } else {
            return this.each(node => node.innerText = txt);
        }
    }


    //jquery中，实例内部的nodes中，最后一个node添加的是原newNode，其余的添加的都是clone的。
    //保持jquery逻辑
    append(node: nodeConvertible): this {

        let newNode = validNodeParam(node);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((n, index) => {
            n.appendChild(index === lastIndex ? newNode : newNode.cloneNode(true));
        })
    }


    prepend(node: nodeConvertible): this {

        let newNode = validNodeParam(node);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((n, index) => {
            n.insertBefore(index === lastIndex ? newNode : newNode.cloneNode(true), n.firstChild);
        })

    }


    insertBefore(node: nodeConvertible): this {

        let newNode = validNodeParam(node);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((n, index) => {
            n.parentNode.insertBefore(index === lastIndex ? newNode : newNode.cloneNode(true), n);
        })

    }


    insertAfter(node: nodeConvertible): this {
        let newNode = validNodeParam(node);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((n, index) => {
            var next = n.nextElementSibling;
            var parent = n.parentNode;
            var tar = index === lastIndex ? newNode : newNode.cloneNode(true);

            if (next) {
                parent.insertBefore(tar, next);
            } else {
                parent.appendChild(tar);
            }
        });

    }

    replace(node: nodeConvertible): this {
        let newNode = validNodeParam(node);
        if (!newNode) return this;

        var lastIndex = this.length - 1;
        return this.each((n, index) => {
            n.parentNode.replaceChild(index === lastIndex ? newNode : newNode.cloneNode(true), n);
        })
    }

    remove(): this {
        return this.each(node => {
            node.parentNode && node.parentNode.removeChild(node);
        });
    }

    //endregion

    //region style
    //name: 和style.cssProperty形式一致，使用驼峰形式
    style(name: { [name: string]: string }): this;
    style(name: string, val: string): this;
    style(name: string): string;
    style(name, val?) {

        var vals = {};

        if (typeof name === 'string') {
            if (val === undefined) {
                // return this[0].style.getPropertyValue(name);
                return this[0].style[name];
            } else vals[name] = val;
        } else if (typeof name === 'object') {
            vals = name;
        } else return this;

        for (var key in vals) {
            this.each(function (node) {
                // console.log('style add', key, vals[key])
                // node.style.setProperty(key, vals[name]);
                node.style[key] = vals[key];
            })
        }

        return this;
    }

    removeStyle(): this; // 删除行内style
    removeStyle(...names: string[]): this; // 删除指定的行内style
    removeStyle(...names) {
        if (names.length === 0) return this.removeAttr('style');
        else return this.each(node => {
            names.forEach(name => {
                node.style.removeProperty(name);
            })
        })
    }

    /**
     * @param [pseudoElt] 伪元素字符串
     * @returns {CSSStyleDeclaration}
     */
    computeStyle(pseudoElt?: string): CSSStyleDeclaration {
        return window.getComputedStyle(this.nodes[0], pseudoElt);
    }

    isHidden(): boolean {
        return this.nodes.every((node, index) => {
            var style = this.eq(index).computeStyle();
            return style.display === 'none' || style.visibility === 'hidden';
        })
    }

    isVisible(): boolean {
        return !this.isHidden();
    }

    maxScroll(index = 0): number {
        var node = this[index];
        return node.scrollHeight - node.clientHeight;
    }

    hide(): this {
        return this.each((node, index) => {

            var $cur = this.eq(index);
            var oldDisplay = $cur.computeStyle().display;

            if (oldDisplay !== 'none') {

                $cur.dataset('_pre_display', oldDisplay);
                $cur.style('display', 'none')
            }

        })
    }

    show(displayValue?: string): this {
        // 更改元素的display，按以下优先级:
        // 1. 使用displayValue参数
        // 2. 使用元素属性 data-_pre_display
        // 3. 如果元素存在行内display:none，则去除行内display
        // 3. 如果元素应用的display样式为none，则设置行内display:block，否则直接返回。
        // 简单来说就是 使用传入displayValue>使用data-_pre_display> 去除inline:display:block或设置display:block
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
                }

                // 考虑情况
                // 1. 存在行内display:none，但去除后还是none
                // 2. 存在行内display不是none，或者不存在行内display, 但元素应用的最高优先级样式为display:none

                computeDisplay = $cur.computeStyle().display;
                if (computeDisplay !== 'none') return;

                $cur.style('display', 'block');

            }


        })
    }

    toggle(displayValue?: string): this {
        return this.each((node, index) => {
            var $cur = this.eq(index);
            $cur.computeStyle().display === 'none' ? $cur.show(displayValue) : $cur.hide()
        });
    }

    //endregion

    clone(deep?: boolean): Dom {
        var nodes = this.map(node => {
            return node.cloneNode(deep);
        });
        return new Dom(nodes);
    }

    /**
     * 距离文档左上角的left与top的值
     * @param [index]
     */
    offset(index = 0): { left: number, top: number } {
        var box = this[index].getBoundingClientRect();
        return {
            left: box.left + (win.pageXOffset || docEle.scrollLeft || document.body.scrollLeft) - docEle.clientLeft,
            top: box.top + (win.pageYOffset || docEle.scrollTop || document.body.scrollTop) - docEle.clientTop
        }
    }

    /**
     * 返回距离某个父元素的偏移值。传入的root必须是当前元素的父元素，否则返回undefined
     * @param root
     * @param [index]
     */
    offsetRoot(root, index = 0): { left: number, top: number } | undefined {
        if (!root || !root.nodeType) return this.offset(index);
        var node = this[index]
        if (!root.contains(node)) return undefined;

        var box = node.getBoundingClientRect();
        var rootBox = root.getBoundingClientRect();

        return {
            left: box.left - rootBox.left - root.clientLeft + root.scrollLeft,
            top: box.top - rootBox.top - root.clientTop + root.scrollTop
        }
    }

    trigger(type: string, eventInit?: EventInit): this {
        return this.each(node => {
            triggerNode(node, type, eventInit);
        })
    }

    on(type: string, fn: eventListener): this {
        return this.each((node, index) => {
            // console.log('addEventListener', node, fn);
            node.addEventListener(type, fn);
            pushEventCache(node, type, fn);
        })
    }

    off(type: string, fn: eventListener): this {
        return this.each((node, index) => {

            var cache = getEventCache(node);
            var type_fns = {};
            if (!type) {
                type_fns = cache;
            } else if (!fn) {
                type_fns[type] = cache[type];
            } else type_fns[type] = [fn];


            for (var key in type_fns) {
                type_fns[key].forEach(fn => node.removeEventListener(key, fn));
            }

            removeEventCache(node, type, fn);

        })
    }


    onDelegate(type: string, selector: string, fn: eventListener): this {

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
                    // @ts-ignore
                    var selector_fns_map = listener.cache;
                    for (var s in selector_fns_map) {
                        queryNodesList.push(
                            {
                                queryNodes: slice(node.querySelectorAll(s)),
                                fns: selector_fns_map[s]
                            }
                        );
                    }

                    var pathNodesIndexCeil = pathNodes.length;
                    queryNodesList.forEach(({queryNodes, fns}) => {

                        for (var i = 0; i < pathNodesIndexCeil; i++) {
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

                // @ts-ignore
                listener.cache = {[selector]: [fn]};
                // @ts-ignore
                listener.isDelegate = true;

                node.addEventListener(type, listener);
                pushEventCache(node, type, listener);
            } else {
                var selector_fns_map = wrapper.cache;
                if (selector_fns_map[selector]) {
                    selector_fns_map[selector].push(fn);
                } else {
                    selector_fns_map[selector] = [fn];
                }
            }

        });
    }

    //需要保证和onDelegate的type,selector,fn都相同。
    //或者
    //  缺省fn,则是取消对selector的代理监听。
    //  缺省selector和fn,则是取消在当前对type类型事件的所有代理监听。
    offDelegate(type: string, selector: string, fn: eventListener) {

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
            } else if (!cache[type]) return;
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

                } else if (!fn) {
                    cache[selector] = undefined;
                } else {
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

    dataset = (function () {

        if (tmpEle.dataset) {
            return function (name, val?) {
                if (val) return this.each(node => node.dataset[name] = val);
                else if (typeof name === 'string') {
                    return this.map(node => node.dataset[name]).join('')
                } else if (typeof name === 'object') {
                    for (var key in name) {
                        this.each(node => node.dataset[key] = name[key])
                    }
                }
                return this;
            }
        } else {
            return function (name, val?) {
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
    })()

    offsetHeight: positionFn
    offsetWidth: positionFn
    offsetTop: positionFn
    offsetLeft: positionFn
    clientHeight: positionFn
    clientWidth: positionFn
    clientTop: positionFn
    clientLeft: positionFn
    scrollHeight: positionFn
    scrollWidth: positionFn
    scrollTop: positionFn
    scrollLeft: positionFn
}

//region event help
interface EventInit {
    bubbles?: boolean // 默认false
    cancelable?: boolean // 默认false
    composed?: boolean // 默认false
}

type eventListener = (event?) => void | { handleEvent(event?): void };

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
    } else {
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
        return;
    }

    //removeEventCache(node,type,fn)
    cache[type] = cache[type].filter((listener) => listener !== fn);
    if (cache[type].length === 0) cache[type] = undefined;
};


const getBaseEvent = function (name, eventInit?) {
    if (isFunction(Event)) {
        return new Event(name, eventInit);
    } else {
        var ev = document.createEvent("MouseEvents");
        ev.initEvent(name, true, true);//事件类型,是否冒泡,是否可以取消事件
        if (eventInit)
            Object.assign(ev, eventInit);
        return ev;

    }
}
const getSpecialEvent = function (constructor, name, eventInit?) {
    return isFunction(constructor) ? new constructor(name, eventInit) : getBaseEvent(name, eventInit);
}
const getMouseEvent = getSpecialEvent.bind(this, MouseEvent);
const getKeyEvent = getSpecialEvent.bind(this, KeyboardEvent);
const getFocusEvent = getSpecialEvent.bind(this, FocusEvent);
const getWheelEvent = getSpecialEvent.bind(this, WheelEvent);


var eventFactoryMap = [
    [/^key.*/, getKeyEvent],
    [/^(.*click|mouse.*|drop)/, getMouseEvent],
    [/^(focus.*|blur)/, getFocusEvent],
    [/^wheel/, getWheelEvent]
]
const getEvent = function (name, eventInit?) {
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

//todo eventInit行为不一致，在focus/blur/click中忽略了eventInit
var triggerNode = function (node, name, eventInit?) {
    name = name.trim();
    if (triggerSpecial[name] && triggerSpecial[name].check(node)) {
        triggerSpecial[name].trigger(node);
        return;
    }

    var event = getEvent(name, eventInit);
    node.dispatchEvent(event);
};


//endregion

type positionFn = (index?) => number

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
    } else {
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

//使用children,所以只会取到element，不能取到所有node
//eg: $.create('<div>child</div>child2<div>child</div>').length; //2
var isHtml = /</;
$.create = function (html) {
    if (isHtml.test(html)) {
        tmpEle.innerHTML = html;
        return new Dom(tmpEle.children);
    } else {
        return new Dom(document.createElement(html));
    }
}


const domMethodNames = Object.getOwnPropertyNames(Dom.prototype);

export default $;

export {
    Dom
}