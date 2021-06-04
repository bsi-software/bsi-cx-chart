import AbstractChartModel from '../../abstract';

export default class ChartDataConfigLegendModel extends AbstractChartModel {
  /**
   * @returns {string}
   */
  static getType() {
    return 'studio.ChartDataConfigLegend';
  }

  /**
   * @type {boolean}
   */
  display = undefined;

  /**
   * @type {boolean}
   */
  clickable = undefined;

  /**
   * @type {string}
   */
  position = undefined;

  /**
   * @type {string}
   */
  alignment = undefined;

  /**
   * @type {string}
   */
  title = undefined;
}
