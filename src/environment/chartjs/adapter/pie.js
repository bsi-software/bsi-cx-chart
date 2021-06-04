import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsPieChartAdapter extends AbstractChartJsChartAdapter {
  /**
   * @returns {string}
   */
  static getType() {
    return 'pie';
  }
}
