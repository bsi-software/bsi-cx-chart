import AbstractChartModel from '../abstract';

export default class ChartDataConfigModel extends AbstractChartModel {
  /**
   * @returns {string}
   */
  static getType() {
    return 'studio.ChartDataConfig';
  }

  /**
   * @type {string}
   */
  type = undefined;

  /**
   * @type {boolean}
   */
  tooltips = undefined;

  /**
   * @type {ChartDataConfigLegendModel}
   */
  legend = undefined;

  validate() {
    if (this.type === undefined) {
      throw new Error('type is required');
    }
  }
}
