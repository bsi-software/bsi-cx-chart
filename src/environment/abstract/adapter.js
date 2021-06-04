export default class AbstractAdapter {
  /**
   * @param {ChartDataModel} model - The data to transform.
   * @returns {*}
   */
  handle(model) {
    throw new Error('not implemented');
  }
}