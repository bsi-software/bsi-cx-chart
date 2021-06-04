import ChartJsAdapter from './chartjs/adapter';
import ChartJsRenderer from './chartjs/renderer';

export default class ChartEnvironment {
  /**
   * The Chart.js environment.
   * @see https://www.chartjs.org/
   * @type ChartEnvironment
   */
  static CHART_JS = new ChartEnvironment('Chart.js', new ChartJsAdapter(), new ChartJsRenderer());

  /**
   * @param {string} name
   * @param {AbstractAdapter} adapter
   * @param {AbstractRenderer} renderer
   */
  constructor(name, adapter, renderer) {
    this.name = name;
    this.adapter = adapter;
    this.renderer = renderer;
  }
};
