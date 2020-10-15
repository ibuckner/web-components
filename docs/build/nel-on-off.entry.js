import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-8d43b2b1.js';

const nelOnOffCss = ":host{display:inline-block}:host([disabled]){cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}input{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:var(--bg-color, #eeeeee);border:1px solid var(--color, #999999);border-radius:2rem;cursor:pointer;outline:none;position:relative;transition:background 450ms ease}input:before,input:after{border-radius:100%;content:\"\";display:block;position:absolute;transform:translate(-1px, -1px);transition:background 450ms ease, -webkit-transform 450ms ease;transition:background 450ms ease, transform 450ms ease;transition:background 450ms ease, transform 450ms ease, -webkit-transform 450ms ease}input:before{background-color:var(--color, #999999)}:host([on])>span>input{background-color:var(--bg-color-on, #555555);border-color:var(--color-on, #000000)}:host([on])>span>input:before{background-color:var(--color-on, #000000);transform:translate(99%, -1px)}";

const OnOff = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loaded = createEvent(this, "loaded", 6);
    this.changed = createEvent(this, "changed", 7);
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * If true, element is in the 'on' state
     */
    this.on = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * Adjusts the size of the element, using CSS rem units of measurement
     */
    this.size = 4;
  }
  validateOpen() {
    this.changed.emit(this.host);
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onClick() {
    this.on = !this.on;
  }
  render() {
    const ht = `${this.size / 2}rem`;
    const w = `${this.size}rem`;
    const st = `input { height: ${ht}; width: ${w} }
    input:before { height: ${ht}; width: ${ht} }`;
    return (h(Host, { "aria-checked": this.on ? "true" : "false" }, h("span", null, h("style", null, st), h("input", { type: "checkbox", checked: this.on, value: "" }))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "on": ["validateOpen"]
  }; }
};
OnOff.style = nelOnOffCss;

export { OnOff as nel_on_off };
