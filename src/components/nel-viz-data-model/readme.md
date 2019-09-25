# nel-viz-data-model



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                                                       | Type      | Default     |
| --------- | ---------- | ----------------------------------------------------------------- | --------- | ----------- |
| `dataSet` | `data-set` | JSON data for visualisation                                       | `any`     | `undefined` |
| `for`     | `for`      | Binds the data model to a container via container id              | `string`  | `undefined` |
| `valid`   | `valid`    | Displays true, if model is able to verify consistency in data set | `boolean` | `undefined` |


## Events

| Event        | Description                                                     | Type               |
| ------------ | --------------------------------------------------------------- | ------------------ |
| `bound`      | Fired when model can bind to visualisation container            | `CustomEvent<any>` |
| `validated`  | Fired when new data validated. Includes validation success flag | `CustomEvent<any>` |
| `validating` | Fired when new data applied to element                          | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
