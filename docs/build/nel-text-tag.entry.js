import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

class RGB {
    constructor(value) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        value = value.toLowerCase().replace("#", "");
        let n;
        if (RGB.CSS[value] === undefined) {
            if (value.length === 3) {
                const r = value.substr(0, 1);
                this.r = this._n(parseInt(`${r}${r}`, 16));
                const g = value.substr(1, 1);
                this.g = this._n(parseInt(`${g}${g}`, 16));
                const b = value.substr(2, 1);
                this.b = this._n(parseInt(`${b}${b}`, 16));
            }
            else if (value.length === 6) {
                n = parseInt(value, 16);
                this.r = this._n(this._rshift(n));
                this.g = this._n(this._gshift(n));
                this.b = this._n(this._bshift(n));
            }
        }
        else {
            n = RGB.CSS[value];
            this.r = this._n(this._rshift(n));
            this.g = this._n(this._gshift(n));
            this.b = this._n(this._bshift(n));
        }
    }
    get brightness() {
        return (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    }
    colorDifference(compare) {
        return (Math.max(this.r, compare.r) - Math.min(this.r, compare.r)) +
            (Math.max(this.g, compare.g) - Math.min(this.g, compare.g)) +
            (Math.max(this.b, compare.b) - Math.min(this.b, compare.b));
    }
    toCSSString() {
        const value = parseInt(this.toHex(), 16);
        return Object.keys(RGB.CSS).find(key => RGB.CSS[key] === value);
    }
    toHex() {
        return this._hex(this.r) + this._hex(this.g) + this._hex(this.b);
    }
    toString() {
        return "#" + this.toHex();
    }
    _rshift(n) {
        return n >> 16 & 0xff;
    }
    _gshift(n) {
        return n >> 8 & 0xff;
    }
    _bshift(n) {
        return n >> 0 & 0xff;
    }
    _hex(value) {
        return (value < 16 ? "0" : "") + value.toString(16);
    }
    _n(n) {
        return n > 255 ? 255 : n < 0 ? 0 : n;
    }
}
RGB.brightnessThreshold = 125;
RGB.CSS = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
};
RGB.differenceThreshold = 500;

const nelTextTagCss = ":host([disabled]),:host([disabled])>mark{cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}.selectable{cursor:pointer}.text-tag:focus{box-shadow:0 0 0 4px #ffcd60;outline:none}mark{-webkit-box-decoration-break:clone;border-radius:0.35em;box-decoration-break:clone;line-height:1.3rem;margin:auto 0.25rem;padding:0.2em;user-select:none}mark>span{font-size:0.7em;font-weight:bold;text-transform:uppercase}";

const TextTag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deleting = createEvent(this, "deleting", 7);
    this.deleted = createEvent(this, "deleted", 7);
    this.loaded = createEvent(this, "loaded", 6);
    this.selected = createEvent(this, "selected", 7);
    /**
     * Sets the background color of the element
     */
    this.color = "#eeeeee";
    /**
     * If true, allows the element to be delete using keyboard
     */
    this.deletable = false;
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * Sets the text label  to be applied to the element
     */
    this.label = "";
    /**
     * If true, allows the element to receive focus
     */
    this.selectable = false;
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onClick(ev) {
    if (this.disabled || !this.selectable) {
      ev.preventDefault();
      return;
    }
    if (this.host.classList.contains("selected")) {
      this.host.classList.remove("selected");
    }
    else {
      this.host.classList.add("selected");
    }
    this.selected.emit(this.host);
  }
  onKeyDown(ev) {
    if (this.disabled || !this.selectable || ev.keyCode === 229) {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      return;
    }
    if (this.deletable && (ev.code === "Backspace" || ev.code === "Delete")) {
      this.deleting.emit(this.host);
    }
  }
  /**
   * Removes element from DOM
   */
  async delete() {
    this.deleted.emit(this.host);
    const parent = this.host.parentNode;
    this.host.insertAdjacentText("beforebegin", this.host.textContent || "");
    parent.removeChild(this.host);
    parent.normalize();
    return Promise.resolve(true);
  }
  render() {
    const cls = this.selectable ? "selectable" : "";
    const tab = this.selectable ? 0 : undefined;
    const _foreColor = (new RGB(this.color)).brightness > RGB.brightnessThreshold
      ? "#000000"
      : "#ffffff";
    const styles = {
      "background-color": this.color,
      color: _foreColor
    };
    return (h("mark", { class: cls, tabindex: tab, style: styles }, h("slot", null), h("span", null, this.label ? " " + this.label : "")));
  }
  get host() { return getElement(this); }
};
TextTag.style = nelTextTagCss;

export { TextTag as nel_text_tag };
