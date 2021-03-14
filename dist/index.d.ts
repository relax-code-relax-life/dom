interface n extends HTMLElement {
    value?: string;
}
declare type nodeConvertible = HTMLElement | HTMLElement[] | DocumentFragment | string;
declare class Dom {
    nodes: n[];
    length: number;
    [index: number]: n;
    /**
     * @param n {Array:HTMLElement}
     */
    constructor(n: Array<n | typeof window | HTMLElement | Node> | typeof window | n | NodeList | HTMLCollection);
    each(fn: (node: n, index?: number, c?: n[]) => void): this;
    map<T>(fn: (node: n, index?: number, c?: n[]) => T): T[];
    filter(fn: (node: n, index?: number, c?: n[]) => boolean): n[];
    eq(index: number): Dom;
    first(): Dom;
    last(): Dom;
    classNames(index?: number): string[];
    addClass(...names: string[]): this;
    removeClass(...names: string[]): this;
    toggleClass(...names: string[]): this;
    hasClass(name: string): boolean;
    parent(): Dom;
    parents(index?: number): Dom;
    children(): Dom;
    next(): Dom;
    prev(): Dom;
    find(selector: string): Dom;
    closest(selector: string): Dom;
    includes(node: HTMLElement): boolean;
    match(selector: string): boolean;
    val(): string;
    val(val: string): this;
    attr(name: string): string;
    attr(name: {
        [name: string]: string;
    }): this;
    attr(name: string, val: string): this;
    removeAttr(...names: string[]): this;
    html(): string;
    html(html: string): this;
    outerHtml(): string;
    outerHtml(string: any): this;
    text(): string;
    text(string: any): this;
    append(node: nodeConvertible): this;
    prepend(node: nodeConvertible): this;
    insertBefore(node: nodeConvertible): this;
    insertAfter(node: nodeConvertible): this;
    replace(node: nodeConvertible): this;
    remove(): this;
    style(name: {
        [name: string]: string;
    }): this;
    style(name: string, val: string): this;
    style(name: string): string;
    removeStyle(): this;
    removeStyle(...names: string[]): this;
    /**
     * @param [pseudoElt] 伪元素字符串
     * @returns {CSSStyleDeclaration}
     */
    computeStyle(pseudoElt?: string): CSSStyleDeclaration;
    isHidden(): boolean;
    isVisible(): boolean;
    maxScroll(index?: number): number;
    hide(): this;
    show(displayValue?: string): this;
    toggle(displayValue?: string): this;
    clone(deep?: boolean): Dom;
    /**
     * 距离文档左上角的left与top的值
     * @param [index]
     */
    offset(index?: number): {
        left: number;
        top: number;
    };
    /**
     * 返回距离某个父元素的偏移值。传入的root必须是当前元素的父元素，否则返回undefined
     * @param root
     * @param [index]
     */
    offsetRoot(root: any, index?: number): {
        left: number;
        top: number;
    } | undefined;
    trigger(type: string, eventInit: EventInit): this;
    on(type: string, fn: eventListener): this;
    off(type: string, fn: eventListener): this;
    onDelegate(type: string, selector: string, fn: eventListener): this;
    offDelegate(type: string, selector: string, fn: eventListener): this;
    dataset: (name: any, val?: any) => any;
    offsetHeight: positionFn;
    offsetWidth: positionFn;
    offsetTop: positionFn;
    offsetLeft: positionFn;
    clientHeight: positionFn;
    clientWidth: positionFn;
    clientTop: positionFn;
    clientLeft: positionFn;
    scrollHeight: positionFn;
    scrollWidth: positionFn;
    scrollTop: positionFn;
    scrollLeft: positionFn;
}
interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
declare type eventListener = (event?: any) => void | {
    handleEvent(event?: any): void;
};
declare type positionFn = (index?: any) => number;
declare function $(selector: any): Dom;
declare namespace $ {
    var fragment: (html: any) => DocumentFragment;
    var create: (html: any) => Dom;
}
export default $;
