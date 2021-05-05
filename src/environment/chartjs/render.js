import {Chart, ChartConfiguration} from 'chart.js';

import AbstractRender from '../abstract/render';

export default class ChartJsRender extends AbstractRender {
    /**
     * @param {Chart|null} chart
     * @param {HTMLElement} element
     * @param {ChartConfiguration} config
     * @returns {Chart}
     */
    render(chart, element, config) {
        if (!chart) {
            const canvas = this._replaceElementWithCanvas(element);
            return new Chart(canvas.getContext('2d'), config);
        }
        chart.options = config.options;
        chart.data = config.data;
        chart.update();
        return chart;
    }

    /**
     * @param {HTMLElement} element
     * @returns {HTMLCanvasElement}
     * @private
     */
    _replaceElementWithCanvas(element) {
        const canvas = document.createElement('canvas');
        element.replaceWith(canvas);
        return canvas;
    }
}
