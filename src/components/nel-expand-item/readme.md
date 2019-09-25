# nel-expand-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                             | Type      | Default |
| ---------- | ---------- | ----------------------------------------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | If false, element is partly greyed out and not responding to user input | `boolean` | `false` |
| `open`     | `open`     | If true, main contents of element are visible                           | `boolean` | `false` |
| `ready`    | `ready`    | True when element can correctly respond to external programmatic access | `boolean` | `false` |
| `size`     | `size`     | Adjusts the size of the marker, using CSS rem units of measurement      | `number`  | `2`     |


## Events

| Event    | Description                                                                   | Type               |
| -------- | ----------------------------------------------------------------------------- | ------------------ |
| `closed` | Fired when element's open property is false either via UI or programmatically | `CustomEvent<any>` |
| `loaded` | Fired when element can correctly respond to external programmatic access      | `CustomEvent<any>` |
| `opened` | Fired when element's open property is true either via UI or programmatically  | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
