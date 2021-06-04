import AbstractChartModel from '../../abstract';

export default class ChartDataAxisLabelModel extends AbstractChartModel {
  /**
   * @returns {string}
   */
  static getType() {
    return 'studio.ChartDataAxisLabel';
  }

  /**
   * @type {string}
   */
  label = undefined;

  validate() {
    if (this.label === undefined) {
      throw new Error('label is required');
    }
  }
}