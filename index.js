var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);

var docEle = document.documentElement;
var win = window;


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

var uniqAndFlatNodes = function (arrOfHtmlCollection) {
    return uniqArr(
        flatArr(
            arrOfHtmlCollection.map(item => slice(item))
        )
    )
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

    append(newNode) {
        return this.each(node => {
            node.appendChild(newNode)
        });
    }

    remove() {
        return this.each(node => {
            node.parentNode.removeChild(node);
        });
    }


    offset(index = 0) {
        var box = this[index].getBoundingClientRect();
        return {
            x: box.left + (win.pageXOffset || docEle.scrollLeft || document.body.scrollLeft) - docEle.clientLeft,
            y: box.top + (win.pageYOffset || docEle.scrollTop || document.body.scrollTop) - docEle.clientTop
        }
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
            if (fn === undefined) {
                let fns = getEventCache(node, type);
                if (fns) {
                    fns.forEach((fn) => node.removeEventListener(type, fn));
                    clearEventCache(node, type);
                }
            }
            else {
                node.removeEventListener(type, fn);
                removeEventCache(node, type, fn);
            }

        })
    }


    onDelegate(type, selector, fn) {

        return this.each((node) => {

            let listener = function (e) {

                //事件回调中,this和e.currentTarget相同，为当前绑定事件元素。
                let tarNodes = node.querySelectorAll(selector);
                var i = 0, len = tarNodes.length;
                for (; i < len; i++) {
                    if (tarNodes[i] === e.target) {
                        fn.apply(e.target, arguments);
                    }
                }

            }

            listener.isDelegate = true;
            listener.selector = selector;
            listener.callback = fn;

            node.addEventListener(type, listener);

            pushEventCache(node, type, listener);
        });
    }

    //需要保证和onDelegate的type,selector,fn都相同。
    //或者
    //  缺省fn,则是取消对selector的代理监听。
    //  缺省selector和fn,则是取消在当前对type类型事件的所有代理监听。
    offDelegate(type, selector, fn) {

        return this.each((node) => {
            var data = getEventCache(node, type);
            if (!data) return;

            var listeners = data.filter((fn) => fn.isDelegate);
            if (selector) listeners = listeners.filter(fn => fn.selector === selector);
            if (fn) listeners = listeners.filter(fn => fn.callback === fn);

            listeners.forEach(listener => {
                node.removeEventListener(type, listener);
                removeEventCache(node, type, listener);
            })
        })
    }
}


//region event help
const nodeExpando = function (node) {
    var data = node._expando_event;
    if (!data) {
        data = node._expando_event = {};
    }
    return data;
};
const getEventCache = function (node, type) {
    return nodeExpando(node)[type];
};
const pushEventCache = function (node, type, fn) {
    var data = nodeExpando(node);
    if (!data[type]) {
        data[type] = [fn];
    }
    else {
        data[type].push(fn);
    }
};
const removeEventCache = function (node, type, fn) {
    var data = nodeExpando(node);
    if (!data[type]) return;
    var index = data[type].indexOf(fn);
    if (index > -1) {
        data[type].splice(index, 1);
    }
    if (data[type].length === 0) {
        delete data[type]
    }
};
const clearEventCache = function (node, type) {
    delete nodeExpando(node)[type];
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


function $(selector) {
    if (typeof selector === 'string') {
        return new Dom(document.querySelectorAll(selector));
    }
    else {
        return new Dom(selector);
    }
}


var tmpEle = document.createElement('div');
$.create = function (html) {
    tmpEle.innerHTML = html;
    var fragment = document.createDocumentFragment();
    var child;
    while (child = tmpEle.firstChild) {
        fragment.appendChild(child);
    }
    return fragment;
}

export default $;