import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsPolarChartAdapter extends AbstractChartJsChartAdapter {
  /**
   * @returns {string}
   */
  static getType() {
    return 'polar';
  }
}
