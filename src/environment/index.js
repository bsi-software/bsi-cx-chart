import ChartJsAdapter from './chartjs/adapter';
import ChartJsRender from './chartjs/render';

export default class Environment {
    /**
     * The Chart.js environment.
     * @see https://www.chartjs.org/
     * @type Environment
     */
    static CHART_JS = new Environment('Chart.js', new ChartJsAdapter(), new ChartJsRender());

    /**
     * @param {string} name
     * @param {AbstractAdapter} adapter
     * @param {AbstractRender} render
     */
    constructor(name, adapter, render) {
        this.name = name;
        this.adapter = adapter;
        this.render = render;
    }
};
