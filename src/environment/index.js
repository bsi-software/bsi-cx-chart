import ChartJsAdapter from './chartjs/adapter';
import ChartJsRenderer from './chartjs/renderer';

export default class Environment {
    /**
     * The Chart.js environment.
     * @see https://www.chartjs.org/
     * @type Environment
     */
    static CHART_JS = new Environment('Chart.js', new ChartJsAdapter(), new ChartJsRenderer());

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
