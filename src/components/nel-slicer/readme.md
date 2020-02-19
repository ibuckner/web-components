# nel-slicer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                             | Type      | Default |
| ---------- | ---------- | ----------------------------------------------------------------------- | --------- | ------- |
| `clear`    | `clear`    | If false, element is partly greyed out and not responding to user input | `boolean` | `false` |
| `disabled` | `disabled` | If false, element is partly greyed out and not responding to user input | `boolean` | `false` |
| `ready`    | `ready`    | True when element can correctly respond to external programmatic access | `boolean` | `false` |


## Events

| Event      | Description                                                              | Type               |
| ---------- | ------------------------------------------------------------------------ | ------------------ |
| `cleared`  | Fired after child elements are removed via clear() method                | `CustomEvent<any>` |
| `errored`  | Fired when error occurs                                                  | `CustomEvent<any>` |
| `loaded`   | Fired when element can correctly respond to external programmatic access | `CustomEvent<any>` |
| `selected` | Fired when slicer item state changes occur                               | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
