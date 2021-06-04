import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsScatterChartAdapter extends AbstractChartJsChartAdapter {
  /**
   * @returns {string}
   */
  static getType() {
    return 'scatter';
  }

  hasLabels() {
    return false;
  }
}
