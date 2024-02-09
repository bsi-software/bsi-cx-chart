export default class AbstractAdapter {
  /**
   * @param {ChartConfig} config - The chart url provider configuration.
   * @param {ChartDataModel} model - The data to transform.
   * @returns {*}
   */
  transform(config, model) {
    throw new Error('not implemented');
  }
}