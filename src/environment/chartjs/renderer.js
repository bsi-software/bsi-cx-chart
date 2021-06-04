import Chart from 'chart.js/auto';

import AbstractRenderer from '../abstract/renderer';

export default class ChartJsRenderer extends AbstractRenderer {
  /**
   * @param {Chart|null} chart
   * @param {HTMLElement} element
   * @param {{}} config
   * @returns {Chart}
   */
  render(chart, element, config) {
    if (!chart) {
      const canvas = this._replaceElementWithCanvas(element);
      return new Chart(canvas.getContext('2d'), config);
    }
    chart.options = config.options || chart.options;
    chart.data = config.data || chart.data;
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
