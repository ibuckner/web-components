import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelModalViewCss = ":host{pointer-events:none}.modal-view{opacity:0;transition:opacity 500ms}:host([open]){pointer-events:auto}:host([open])>.modal-view{background-color:rgba(0, 0, 0, 0.5);bottom:0;display:block;left:0;opacity:1;position:fixed;right:0;top:0;transition:opacity 500ms;z-index:10000}.modal-content{position:absolute}.bottom{bottom:0%;left:50%;transform:translate(-50%, 0%)}.center{left:50%;top:50%;transform:translate(-50%, -50%)}.top{left:50%;top:0%;transform:translate(-50%, 0%)}";

const ModalView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closed = createEvent(this, "closed", 7);
    this.loaded = createEvent(this, "loaded", 6);
    this.opened = createEvent(this, "opened", 7);
    /**
     * Aligns child elements. Defaults to center of viewport.
     */
    this.align = "center";
    /**
     * If true, displays the modal element
     */
    this.open = false;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
  }
  validateOpen(newValue) {
    if (Boolean(newValue)) {
      this.opened.emit(this.host);
    }
    else {
      this.closed.emit(this.host);
    }
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
  }
  componentWillRender() {
    this.ready = true;
  }
  render() {
    const cls = `modal-content ${this.align}`;
    return (h("div", { class: "modal-view" }, h("div", { class: cls }, h("slot", null))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["validateOpen"]
  }; }
};
ModalView.style = nelModalViewCss;

export { ModalView as nel_modal_view };
