# nel-modal-view



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                             | Type                            | Default    |
| -------- | --------- | ----------------------------------------------------------------------- | ------------------------------- | ---------- |
| `align`  | `align`   | Aligns child elements. Defaults to center of viewport.                  | `"bottom" or "center" or "top"` | `"center"` |
| `open`   | `open`    | If true, displays the modal element                                     | `boolean`                       | `false`    |
| `ready`  | `ready`   | True when element can correctly respond to external programmatic access | `boolean`                       | `false`    |


## Events

| Event    | Description                                                                   | Type               |
| -------- | ----------------------------------------------------------------------------- | ------------------ |
| `closed` | Fired when element's open property is false either via UI or programmatically | `CustomEvent<any>` |
| `loaded` | Fired when element can correctly respond to external programmatic access      | `CustomEvent<any>` |
| `opened` | Fired when element's open property is true either via UI or programmatically  | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
