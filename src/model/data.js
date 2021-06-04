import AbstractChartModel from './abstract';

export default class ChartDataModel extends AbstractChartModel {
  /**
   * @returns {string}
   */
  static getType() {
    return 'studio.ChartData';
  }

  /**
   * @type {ChartDataAxisModel[]}
   */
  axes = [];
  /**
   * @type {ChartDataConfigModel}
   */
  config = undefined;
  /**
   * @type {ChartDataDatasetModel[]}
   */
  data = [];

  validate() {
    if (this.config === undefined) {
      throw new Error('config is required');
    }
  }
}