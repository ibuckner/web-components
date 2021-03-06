/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface NelExpandItem {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * If true, main contents of element are visible
         */
        "open": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * Adjusts the size of the marker, using CSS rem units of measurement
         */
        "size": number;
    }
    interface NelItemCollection {
        /**
          * Aligns child elements within collection. Defaults to vertical list.
         */
        "align": "horizontal" | "vertical";
        /**
          * Clears out all child elements from collection
         */
        "clear": boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * Displays the element resize handle (bottom right corner) if true
         */
        "resizable": boolean;
        /**
          * Sorts child elements in collection based on text content
         */
        "sort": "ASC" | "DESC";
    }
    interface NelListItem {
        /**
          * Removes element from DOM
         */
        "clear": boolean;
        /**
          * Sets the bullet color of the element. Default is #eeeeee
         */
        "color": string;
        /**
          * If true, allows the element to be delete using keyboard
         */
        "deletable": boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * If true, allows the element to receive focus
         */
        "selectable": boolean;
    }
    interface NelModalView {
        /**
          * Aligns child elements. Defaults to center of viewport.
         */
        "align": "bottom" | "center" | "top";
        /**
          * If true, displays the modal element
         */
        "open": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
    }
    interface NelNetworkConnection {
        /**
          * If true, content within element remains hidden
         */
        "available": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
    }
    interface NelOnOff {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * If true, element is in the 'on' state
         */
        "on": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * Adjusts the size of the element, using CSS rem units of measurement
         */
        "size": number;
    }
    interface NelSlicer {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "clear": boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
    }
    interface NelStatusBadge {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * Sets the text label to be applied to the element
         */
        "label": string;
        /**
          * Sets the prefix label to be applied to the element
         */
        "pre": string;
        /**
          * Sets the Red-Amber-Green icon to be applied to the element
         */
        "rag": number;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * Sets the suffix label to be applied to the element
         */
        "suf": string;
    }
    interface NelTextInput {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "cleartext": boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * Sets a regular expression to restrict data entry to allowed characters
         */
        "mask": string;
        /**
          * Maximum length of text entry
         */
        "maxlength": number;
        /**
          * Minimum length of text entry
         */
        "minlength": number;
        /**
          * Sets a regular expression to validate text
         */
        "pattern": string;
        /**
          * Sets a visual text prompt as a palceholder within text box
         */
        "placeholder": string;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * Sets the value of the text box
         */
        "value": string;
        /**
          * Width of text entry
         */
        "width": number;
    }
    interface NelTextTag {
        /**
          * Sets the background color of the element
         */
        "color": string;
        /**
          * If true, allows the element to be delete using keyboard
         */
        "deletable": boolean;
        /**
          * Removes element from DOM
         */
        "delete": () => Promise<boolean>;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled": boolean;
        /**
          * Sets the text label  to be applied to the element
         */
        "label": string;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * If true, allows the element to receive focus
         */
        "selectable": boolean;
    }
    interface NelTip {
        /**
          * Hides the visible tip after n milliseconds. 0 (disabled) is default
         */
        "expires": number;
        /**
          * If true, element is visible
         */
        "for": string;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready": boolean;
        /**
          * If true, element is visible
         */
        "show": boolean;
    }
}
declare global {
    interface HTMLNelExpandItemElement extends Components.NelExpandItem, HTMLStencilElement {
    }
    var HTMLNelExpandItemElement: {
        prototype: HTMLNelExpandItemElement;
        new (): HTMLNelExpandItemElement;
    };
    interface HTMLNelItemCollectionElement extends Components.NelItemCollection, HTMLStencilElement {
    }
    var HTMLNelItemCollectionElement: {
        prototype: HTMLNelItemCollectionElement;
        new (): HTMLNelItemCollectionElement;
    };
    interface HTMLNelListItemElement extends Components.NelListItem, HTMLStencilElement {
    }
    var HTMLNelListItemElement: {
        prototype: HTMLNelListItemElement;
        new (): HTMLNelListItemElement;
    };
    interface HTMLNelModalViewElement extends Components.NelModalView, HTMLStencilElement {
    }
    var HTMLNelModalViewElement: {
        prototype: HTMLNelModalViewElement;
        new (): HTMLNelModalViewElement;
    };
    interface HTMLNelNetworkConnectionElement extends Components.NelNetworkConnection, HTMLStencilElement {
    }
    var HTMLNelNetworkConnectionElement: {
        prototype: HTMLNelNetworkConnectionElement;
        new (): HTMLNelNetworkConnectionElement;
    };
    interface HTMLNelOnOffElement extends Components.NelOnOff, HTMLStencilElement {
    }
    var HTMLNelOnOffElement: {
        prototype: HTMLNelOnOffElement;
        new (): HTMLNelOnOffElement;
    };
    interface HTMLNelSlicerElement extends Components.NelSlicer, HTMLStencilElement {
    }
    var HTMLNelSlicerElement: {
        prototype: HTMLNelSlicerElement;
        new (): HTMLNelSlicerElement;
    };
    interface HTMLNelStatusBadgeElement extends Components.NelStatusBadge, HTMLStencilElement {
    }
    var HTMLNelStatusBadgeElement: {
        prototype: HTMLNelStatusBadgeElement;
        new (): HTMLNelStatusBadgeElement;
    };
    interface HTMLNelTextInputElement extends Components.NelTextInput, HTMLStencilElement {
    }
    var HTMLNelTextInputElement: {
        prototype: HTMLNelTextInputElement;
        new (): HTMLNelTextInputElement;
    };
    interface HTMLNelTextTagElement extends Components.NelTextTag, HTMLStencilElement {
    }
    var HTMLNelTextTagElement: {
        prototype: HTMLNelTextTagElement;
        new (): HTMLNelTextTagElement;
    };
    interface HTMLNelTipElement extends Components.NelTip, HTMLStencilElement {
    }
    var HTMLNelTipElement: {
        prototype: HTMLNelTipElement;
        new (): HTMLNelTipElement;
    };
    interface HTMLElementTagNameMap {
        "nel-expand-item": HTMLNelExpandItemElement;
        "nel-item-collection": HTMLNelItemCollectionElement;
        "nel-list-item": HTMLNelListItemElement;
        "nel-modal-view": HTMLNelModalViewElement;
        "nel-network-connection": HTMLNelNetworkConnectionElement;
        "nel-on-off": HTMLNelOnOffElement;
        "nel-slicer": HTMLNelSlicerElement;
        "nel-status-badge": HTMLNelStatusBadgeElement;
        "nel-text-input": HTMLNelTextInputElement;
        "nel-text-tag": HTMLNelTextTagElement;
        "nel-tip": HTMLNelTipElement;
    }
}
declare namespace LocalJSX {
    interface NelExpandItem {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Fired when element's open property is false either via UI or programmatically
         */
        "onClosed"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element's open property is true either via UI or programmatically
         */
        "onOpened"?: (event: CustomEvent<any>) => void;
        /**
          * If true, main contents of element are visible
         */
        "open"?: boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * Adjusts the size of the marker, using CSS rem units of measurement
         */
        "size"?: number;
    }
    interface NelItemCollection {
        /**
          * Aligns child elements within collection. Defaults to vertical list.
         */
        "align"?: "horizontal" | "vertical";
        /**
          * Clears out all child elements from collection
         */
        "clear"?: boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Fired after child elements are removed via clear() method
         */
        "onCleared"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired after child elements are sorted
         */
        "onSorted"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * Displays the element resize handle (bottom right corner) if true
         */
        "resizable"?: boolean;
        /**
          * Sorts child elements in collection based on text content
         */
        "sort"?: "ASC" | "DESC";
    }
    interface NelListItem {
        /**
          * Removes element from DOM
         */
        "clear"?: boolean;
        /**
          * Sets the bullet color of the element. Default is #eeeeee
         */
        "color"?: string;
        /**
          * If true, allows the element to be delete using keyboard
         */
        "deletable"?: boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Fired after element is removed from DOM
         */
        "onDeleted"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when delete key pressed on selected element
         */
        "onDeleting"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired after element receives focus
         */
        "onSelected"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * If true, allows the element to receive focus
         */
        "selectable"?: boolean;
    }
    interface NelModalView {
        /**
          * Aligns child elements. Defaults to center of viewport.
         */
        "align"?: "bottom" | "center" | "top";
        /**
          * Fired when element's open property is false either via UI or programmatically
         */
        "onClosed"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element's open property is true either via UI or programmatically
         */
        "onOpened"?: (event: CustomEvent<any>) => void;
        /**
          * If true, displays the modal element
         */
        "open"?: boolean;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
    }
    interface NelNetworkConnection {
        /**
          * If true, content within element remains hidden
         */
        "available"?: boolean;
        /**
          * Fired after network status change
         */
        "onChanged"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
    }
    interface NelOnOff {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * If true, element is in the 'on' state
         */
        "on"?: boolean;
        /**
          * Fired after element is toggled
         */
        "onChanged"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * Adjusts the size of the element, using CSS rem units of measurement
         */
        "size"?: number;
    }
    interface NelSlicer {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "clear"?: boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Fired after child elements are removed via clear() method
         */
        "onCleared"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when error occurs
         */
        "onErrored"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when slicer item state changes occur
         */
        "onSelected"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
    }
    interface NelStatusBadge {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Sets the text label to be applied to the element
         */
        "label"?: string;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Sets the prefix label to be applied to the element
         */
        "pre"?: string;
        /**
          * Sets the Red-Amber-Green icon to be applied to the element
         */
        "rag"?: number;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * Sets the suffix label to be applied to the element
         */
        "suf"?: string;
    }
    interface NelTextInput {
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "cleartext"?: boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Sets a regular expression to restrict data entry to allowed characters
         */
        "mask"?: string;
        /**
          * Maximum length of text entry
         */
        "maxlength"?: number;
        /**
          * Minimum length of text entry
         */
        "minlength"?: number;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Sets a regular expression to validate text
         */
        "pattern"?: string;
        /**
          * Sets a visual text prompt as a palceholder within text box
         */
        "placeholder"?: string;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * Sets the value of the text box
         */
        "value"?: string;
        /**
          * Width of text entry
         */
        "width"?: number;
    }
    interface NelTextTag {
        /**
          * Sets the background color of the element
         */
        "color"?: string;
        /**
          * If true, allows the element to be delete using keyboard
         */
        "deletable"?: boolean;
        /**
          * If false, element is partly greyed out and not responding to user input
         */
        "disabled"?: boolean;
        /**
          * Sets the text label  to be applied to the element
         */
        "label"?: string;
        /**
          * Fired after element is removed from DOM
         */
        "onDeleted"?: (event: CustomEvent<any>) => void;
        /**
          * Fired before element is removed from DOM
         */
        "onDeleting"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * Fired after element receives focus
         */
        "onSelected"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * If true, allows the element to receive focus
         */
        "selectable"?: boolean;
    }
    interface NelTip {
        /**
          * Hides the visible tip after n milliseconds. 0 (disabled) is default
         */
        "expires"?: number;
        /**
          * If true, element is visible
         */
        "for"?: string;
        /**
          * Fired after element is activated
         */
        "onChanged"?: (event: CustomEvent<any>) => void;
        /**
          * Fired when element can correctly respond to external programmatic access
         */
        "onLoaded"?: (event: CustomEvent<any>) => void;
        /**
          * True when element can correctly respond to external programmatic access
         */
        "ready"?: boolean;
        /**
          * If true, element is visible
         */
        "show"?: boolean;
    }
    interface IntrinsicElements {
        "nel-expand-item": NelExpandItem;
        "nel-item-collection": NelItemCollection;
        "nel-list-item": NelListItem;
        "nel-modal-view": NelModalView;
        "nel-network-connection": NelNetworkConnection;
        "nel-on-off": NelOnOff;
        "nel-slicer": NelSlicer;
        "nel-status-badge": NelStatusBadge;
        "nel-text-input": NelTextInput;
        "nel-text-tag": NelTextTag;
        "nel-tip": NelTip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "nel-expand-item": LocalJSX.NelExpandItem & JSXBase.HTMLAttributes<HTMLNelExpandItemElement>;
            "nel-item-collection": LocalJSX.NelItemCollection & JSXBase.HTMLAttributes<HTMLNelItemCollectionElement>;
            "nel-list-item": LocalJSX.NelListItem & JSXBase.HTMLAttributes<HTMLNelListItemElement>;
            "nel-modal-view": LocalJSX.NelModalView & JSXBase.HTMLAttributes<HTMLNelModalViewElement>;
            "nel-network-connection": LocalJSX.NelNetworkConnection & JSXBase.HTMLAttributes<HTMLNelNetworkConnectionElement>;
            "nel-on-off": LocalJSX.NelOnOff & JSXBase.HTMLAttributes<HTMLNelOnOffElement>;
            "nel-slicer": LocalJSX.NelSlicer & JSXBase.HTMLAttributes<HTMLNelSlicerElement>;
            "nel-status-badge": LocalJSX.NelStatusBadge & JSXBase.HTMLAttributes<HTMLNelStatusBadgeElement>;
            "nel-text-input": LocalJSX.NelTextInput & JSXBase.HTMLAttributes<HTMLNelTextInputElement>;
            "nel-text-tag": LocalJSX.NelTextTag & JSXBase.HTMLAttributes<HTMLNelTextTagElement>;
            "nel-tip": LocalJSX.NelTip & JSXBase.HTMLAttributes<HTMLNelTipElement>;
        }
    }
}
