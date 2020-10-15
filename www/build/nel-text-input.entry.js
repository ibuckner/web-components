import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelTextInputCss = ":host([disabled]){cursor:not-allowed;opacity:0.5;pointer-events:none;user-select:none}:host([hidden]){display:none !important}input{border:2px solid #aaa;box-sizing:border-box;padding:4px;outline:transparent;transition:border-color 0.25s ease, color 0.25s ease;z-index:9}input:focus{border:2px solid #000}input::placeholder{color:#aaa}input::-webkit-search-cancel-button{cursor:pointer}";

const TextInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loaded = createEvent(this, "loaded", 6);
    this._mask = /.*/gi;
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.cleartext = true;
    /**
     * If false, element is partly greyed out and not responding to user input
     */
    this.disabled = false;
    /**
     * Sets a regular expression to restrict data entry to allowed characters
     */
    this.mask = "";
    /**
     * Maximum length of text entry
     */
    this.maxlength = -1;
    /**
     * Minimum length of text entry
     */
    this.minlength = -1;
    /**
     * Sets a regular expression to validate text
     */
    this.pattern = "";
    /**
     * Sets a visual text prompt as a palceholder within text box
     */
    this.placeholder = "";
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
    /**
     * Width of text entry
     */
    this.width = 20;
  }
  validateMask(newValue) {
    this._mask = new RegExp(newValue);
  }
  componentDidLoad() {
    this._input = this.host.shadowRoot.querySelector("input");
    this._mask = new RegExp(this.mask);
    this.loaded.emit(this.host);
  }
  componentWillLoad() {
    this.ready = true;
  }
  onInput() {
    this.value = this._input.value;
  }
  onKeyDown(ev) {
    if (this.disabled || ev.keyCode === 229) {
      return false;
    }
    if (!this._editKeyPressed(ev) && !this._mask.test(ev.key)) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    return true;
  }
  onPaste(ev) {
    if (!this.disabled && ev.clipboardData) {
      const paste = ev.clipboardData.getData("text/plain");
      if (!this._mask.test(paste)) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
      return true;
    }
    return false;
  }
  onSearch() {
    const input = new InputEvent("input", { bubbles: true, cancelable: true });
    this.host.dispatchEvent(input);
  }
  _editKeyPressed(ev) {
    return ev.code === "Delete" || ev.code === "Backspace" ||
      ev.code === "ArrowLeft" || ev.code === "ArrowRight";
  }
  render() {
    return (h("input", { type: this.cleartext ? "search" : "password", maxlength: this.maxlength, minlength: this.minlength, pattern: this.pattern, placeholder: this.placeholder, size: this.width, value: this.value }));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "mask": ["validateMask"]
  }; }
};
TextInput.style = nelTextInputCss;

export { TextInput as nel_text_input };
