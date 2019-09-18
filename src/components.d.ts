/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface NelExpandItem {
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled': boolean;
    /**
    * If true, main contents of element are visible
    */
    'open': boolean;
    /**
    * Adjusts the size of the marker, using CSS rem units of measurement
    */
    'size': number;
  }
  interface NelItemCollection {
    /**
    * Aligns child elements within collection. Defaults to vertical list.
    */
    'align': "horizontal" | "vertical";
    /**
    * Clears out all child elements from collection
    */
    'clear': () => Promise<boolean>;
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled': boolean;
    /**
    * Displays the element resize handle (bottom right corner) if true
    */
    'resizable': boolean;
    /**
    * Sorts child elements in collection based on text content
    * @param reverse - default is false (A-Z sort order)
    */
    'sort': (reverse?: boolean) => Promise<boolean>;
    /**
    * New elements added to the collection will cause all child elements to be sorted alphabetically
    */
    'sortable': boolean;
  }
  interface NelListItem {
    /**
    * Sets the bullet color of the element. Default is #eeeeee
    */
    'color': string;
    /**
    * If true, allows the element to be delete using keyboard
    */
    'deletable': boolean;
    /**
    * Removes element from DOM
    */
    'delete': () => Promise<boolean>;
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled': boolean;
    /**
    * If true, allows the element to receive focus
    */
    'selectable': boolean;
  }
  interface NelModalView {
    /**
    * Aligns child elements. Defaults to center of viewport.
    */
    'alignment': "bottom" | "center" | "top";
    /**
    * If true, displays the modal element
    */
    'open': boolean;
  }
  interface NelNetworkConnection {
    /**
    * If true, content within element remains hidden
    */
    'available': boolean;
  }
  interface NelTextInput {
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled': boolean;
    /**
    * Sets a regular expression to restrict data entry to allowed characters
    */
    'mask': string;
    /**
    * Maximum length of text entry
    */
    'maxlength': number;
    /**
    * Minimum length of text entry
    */
    'minlength': number;
    /**
    * Sets a regular expression to validate text
    */
    'pattern': string;
    /**
    * Sets a visual text prompt as a palceholder within text box
    */
    'placeholder': string;
    /**
    * Sets the value of the text box
    */
    'value': string;
  }
  interface NelTextTag {
    /**
    * Sets the background color of the element
    */
    'color': string;
    /**
    * If true, allows the element to be delete using keyboard
    */
    'deletable': boolean;
    /**
    * Removes element from DOM
    */
    'delete': () => Promise<boolean>;
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled': boolean;
    /**
    * Sets the text label  to be applied to the element
    */
    'label': string;
    /**
    * If true, allows the element to receive focus
    */
    'selectable': boolean;
  }
}

declare global {


  interface HTMLNelExpandItemElement extends Components.NelExpandItem, HTMLStencilElement {}
  var HTMLNelExpandItemElement: {
    prototype: HTMLNelExpandItemElement;
    new (): HTMLNelExpandItemElement;
  };

  interface HTMLNelItemCollectionElement extends Components.NelItemCollection, HTMLStencilElement {}
  var HTMLNelItemCollectionElement: {
    prototype: HTMLNelItemCollectionElement;
    new (): HTMLNelItemCollectionElement;
  };

  interface HTMLNelListItemElement extends Components.NelListItem, HTMLStencilElement {}
  var HTMLNelListItemElement: {
    prototype: HTMLNelListItemElement;
    new (): HTMLNelListItemElement;
  };

  interface HTMLNelModalViewElement extends Components.NelModalView, HTMLStencilElement {}
  var HTMLNelModalViewElement: {
    prototype: HTMLNelModalViewElement;
    new (): HTMLNelModalViewElement;
  };

  interface HTMLNelNetworkConnectionElement extends Components.NelNetworkConnection, HTMLStencilElement {}
  var HTMLNelNetworkConnectionElement: {
    prototype: HTMLNelNetworkConnectionElement;
    new (): HTMLNelNetworkConnectionElement;
  };

  interface HTMLNelTextInputElement extends Components.NelTextInput, HTMLStencilElement {}
  var HTMLNelTextInputElement: {
    prototype: HTMLNelTextInputElement;
    new (): HTMLNelTextInputElement;
  };

  interface HTMLNelTextTagElement extends Components.NelTextTag, HTMLStencilElement {}
  var HTMLNelTextTagElement: {
    prototype: HTMLNelTextTagElement;
    new (): HTMLNelTextTagElement;
  };
  interface HTMLElementTagNameMap {
    'nel-expand-item': HTMLNelExpandItemElement;
    'nel-item-collection': HTMLNelItemCollectionElement;
    'nel-list-item': HTMLNelListItemElement;
    'nel-modal-view': HTMLNelModalViewElement;
    'nel-network-connection': HTMLNelNetworkConnectionElement;
    'nel-text-input': HTMLNelTextInputElement;
    'nel-text-tag': HTMLNelTextTagElement;
  }
}

declare namespace LocalJSX {
  interface NelExpandItem extends JSXBase.HTMLAttributes<HTMLNelExpandItemElement> {
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled'?: boolean;
    /**
    * If true, main contents of element are visible
    */
    'open'?: boolean;
    /**
    * Adjusts the size of the marker, using CSS rem units of measurement
    */
    'size'?: number;
  }
  interface NelItemCollection extends JSXBase.HTMLAttributes<HTMLNelItemCollectionElement> {
    /**
    * Aligns child elements within collection. Defaults to vertical list.
    */
    'align'?: "horizontal" | "vertical";
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled'?: boolean;
    /**
    * Raised after child elements are removed via clear() method
    */
    'onErased'?: (event: CustomEvent<any>) => void;
    /**
    * Raised after child elements are sorted
    */
    'onSorted'?: (event: CustomEvent<any>) => void;
    /**
    * Displays the element resize handle (bottom right corner) if true
    */
    'resizable'?: boolean;
    /**
    * New elements added to the collection will cause all child elements to be sorted alphabetically
    */
    'sortable'?: boolean;
  }
  interface NelListItem extends JSXBase.HTMLAttributes<HTMLNelListItemElement> {
    /**
    * Sets the bullet color of the element. Default is #eeeeee
    */
    'color'?: string;
    /**
    * If true, allows the element to be delete using keyboard
    */
    'deletable'?: boolean;
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled'?: boolean;
    /**
    * Raised after element is removed from DOM
    */
    'onDeleted'?: (event: CustomEvent<any>) => void;
    /**
    * Raised before element is removed from DOM
    */
    'onDeleting'?: (event: CustomEvent<any>) => void;
    /**
    * Raised after element receives focus
    */
    'onSelected'?: (event: CustomEvent<any>) => void;
    /**
    * If true, allows the element to receive focus
    */
    'selectable'?: boolean;
  }
  interface NelModalView extends JSXBase.HTMLAttributes<HTMLNelModalViewElement> {
    /**
    * Aligns child elements. Defaults to center of viewport.
    */
    'alignment'?: "bottom" | "center" | "top";
    /**
    * If true, displays the modal element
    */
    'open'?: boolean;
  }
  interface NelNetworkConnection extends JSXBase.HTMLAttributes<HTMLNelNetworkConnectionElement> {
    /**
    * If true, content within element remains hidden
    */
    'available'?: boolean;
  }
  interface NelTextInput extends JSXBase.HTMLAttributes<HTMLNelTextInputElement> {
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled'?: boolean;
    /**
    * Sets a regular expression to restrict data entry to allowed characters
    */
    'mask'?: string;
    /**
    * Maximum length of text entry
    */
    'maxlength'?: number;
    /**
    * Minimum length of text entry
    */
    'minlength'?: number;
    /**
    * Sets a regular expression to validate text
    */
    'pattern'?: string;
    /**
    * Sets a visual text prompt as a palceholder within text box
    */
    'placeholder'?: string;
    /**
    * Sets the value of the text box
    */
    'value'?: string;
  }
  interface NelTextTag extends JSXBase.HTMLAttributes<HTMLNelTextTagElement> {
    /**
    * Sets the background color of the element
    */
    'color'?: string;
    /**
    * If true, allows the element to be delete using keyboard
    */
    'deletable'?: boolean;
    /**
    * If false, element is partly greyed out and not responding to user input
    */
    'disabled'?: boolean;
    /**
    * Sets the text label  to be applied to the element
    */
    'label'?: string;
    /**
    * Raised after element is removed from DOM
    */
    'onDeleted'?: (event: CustomEvent<any>) => void;
    /**
    * Raised before element is removed from DOM
    */
    'onDeleting'?: (event: CustomEvent<any>) => void;
    /**
    * Raised after element receives focus
    */
    'onSelected'?: (event: CustomEvent<any>) => void;
    /**
    * If true, allows the element to receive focus
    */
    'selectable'?: boolean;
  }

  interface IntrinsicElements {
    'nel-expand-item': NelExpandItem;
    'nel-item-collection': NelItemCollection;
    'nel-list-item': NelListItem;
    'nel-modal-view': NelModalView;
    'nel-network-connection': NelNetworkConnection;
    'nel-text-input': NelTextInput;
    'nel-text-tag': NelTextTag;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


