import { r as registerInstance, e as createEvent, h, g as getElement } from './index-8d43b2b1.js';

const nelNetworkConnectionCss = ":host([hidden]){display:none !important}";

const NetworkConnection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loaded = createEvent(this, "loaded", 6);
    this.changed = createEvent(this, "changed", 6);
    /**
     * If true, content within element remains hidden
     */
    this.available = true;
    /**
     * True when element can correctly respond to external programmatic access
     */
    this.ready = false;
  }
  componentDidLoad() {
    this.loaded.emit(this.host);
    // this.ready = true;
  }
  componentWillLoad() {
    this.ready = true;
  }
  onOnline() {
    this.available = true;
    this.changed.emit(this.host);
  }
  onOffline() {
    this.available = false;
    this.changed.emit(this.host);
  }
  render() {
    return (h("div", { hidden: this.available }, h("slot", null)));
  }
  get host() { return getElement(this); }
};
NetworkConnection.style = nelNetworkConnectionCss;

export { NetworkConnection as nel_network_connection };
