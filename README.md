# Readme

The aim of this java script library is to render a dynamic chart using data from the BSI CX chart step.
The default implementation uses [Chart.js](https://www.chartjs.org/) to render the charts.
But any other java script chart library can be integrated.
To use any other chart library, one has to implement a chart environment.

A chart environment consists of an adapter and a renderer class.
The adapter transforms the data to the library specific format, and the renderer renders the data as a chart.
More information about integrating a custom chart java script library can be found in the [corresponding chapter](#integrate-a-custom-chart-library). 

## Usage and Configuration

The following lines of code represent the live view of a website or landingpage with a URL provider content element part:

```html
<div id="chart" data-bsi-url="http://localhost:8082/c/a1Z22bmUSE6zGwcoJBXunALr?up=Q3VyYWJpdHVy"></div>
```

To render a chart at the element's position, this java script library has to be included.
The following code snippet should explain how the library can be initialized:

```javascript
const element = document.getElementById('chart');
const chart = new ChartUrlProvider(element);
chart.render();
```

### Using Custom Colors

It is possible to configure custom colors per dataset.
The following example illustrates such a use case:

```javascript
const config = new ChartConfig()
.withColors(
  ChartConfigColor.of('#ff6384ff', '#ff638466'),
  ChartConfigColor.of('#36a2ebff', '#36a2eb66'),
  ChartConfigColor.of('#cc65feff', '#cc65fe66'),
  ChartConfigColor.of('#ffce56ff', '#ffce5666')
);
const element = document.getElementById('chart');
const chart = new ChartUrlProvider(element, config);
chart.render();
```

Each color consists of two values: One for the border and the other one for the background.
The colors must be specified in the hexadecimal format.
It can either be RGB or RGBA.

### Post Processing the Configuration

To give the programmer the ability of having full control over the chart's configuration, it is possible to post process the generated configuration.
The following code snippet should illustrate how this can be done:

```javascript
const element = document.getElementById('line-chart');
const config = new ChartConfig()
  .withConfigPostProcessor(config => {
    config.data.datasets = config.data.datasets.map(dataset => {
      dataset.fill = true
      return dataset;
    });
    return config;
  });
new ChartUrlProvider(element, config).render();
```

The config post processor is nothing more than a simple lambda, which accepts an object and returns an object.
This enables the programmer to adjust the configuration of the chart to its needs.

## Integrate a Custom Chart Library

To use any other chart library than [Chart.js](https://www.chartjs.org/) it is necessary to implement a new `ChartEnvironment`.
A `ChartEnvironment` consists of a name, adapter and renderer class.
The _name_ should be unique for the used library.
The _adapter_ class cares about converting the internal chart data to the format expected by the custom chart library.
While the _renderer_ class invokes the custom chart library and places the chart in the DOM.
