# nel-slicer



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                             | Type      | Default |
| ----------- | ----------- | ----------------------------------------------------------------------- | --------- | ------- |
| `disabled`  | `disabled`  | If false, element is partly greyed out and not responding to user input | `boolean` | `false` |
| `ready`     | `ready`     | True when element can correctly respond to external programmatic access | `boolean` | `false` |
| `resizable` | `resizable` | Displays the element resize handle (bottom right corner) if true        | `boolean` | `false` |


## Events

| Event      | Description                                                              | Type               |
| ---------- | ------------------------------------------------------------------------ | ------------------ |
| `cleared`  | Fired after child elements are removed via clear() method                | `CustomEvent<any>` |
| `loaded`   | Fired when element can correctly respond to external programmatic access | `CustomEvent<any>` |
| `selected` | Fired when slicer item state changes occur                               | `CustomEvent<any>` |


## Methods

### `clear() => Promise<boolean>`

Clears out slicer selections

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
