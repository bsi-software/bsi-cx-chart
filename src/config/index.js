import ChartEnvironment from '../environment';
import ChartConfigColor from './color';

export default class ChartConfig {
  static DEFAULT = new ChartConfig();

  constructor() {
    /**
     * @type {ChartEnvironment}
     * @private
     */
    this._environment = ChartEnvironment.CHART_JS;
    /**
     * @type {function({}): {}}
     * @private
     */
    this._configPostProcessor = config => config;
    /**
     * @type {{border:ChartConfigColor,background:ChartConfigColor}[]}
     * @private
     */
    this._colors = [
      ChartConfigColor.of('#ff6384ff', '#ff638466'),
      ChartConfigColor.of('#36a2ebff', '#36a2eb66'),
      ChartConfigColor.of('#cc65feff', '#cc65fe66'),
      ChartConfigColor.of('#ffce56ff', '#ffce5666')
    ];
  }

  /**
   * @param {ChartEnvironment} environment
   * @returns {ChartConfig}
   */
  withEnvironment(environment) {
    if (environment instanceof ChartEnvironment) {
      this._environment = environment;
      return this;
    }
    throw new Error('environment is not valid');
  }

  /**
   * @param {function({}): {}} configPostProcessor
   * @returns {ChartConfig}
   */
  withConfigPostProcessor(configPostProcessor) {
    if (typeof configPostProcessor === 'function') {
      this._configPostProcessor = configPostProcessor;
      return this;
    }
    throw new Error('config post processor must be a lambda');
  }

  /**
   * @param {{border:ChartConfigColor,background:ChartConfigColor}} colors
   * @returns {ChartConfig}
   */
  withColors(...colors) {
    if (colors.length > 0) {
      this._colors = colors;
      return this;
    }
    throw new Error('at least one color is required');
  }

  /**
   * @returns {ChartEnvironment}
   */
  getEnvironment() {
    return this._environment;
  }

  /**
   * @returns {function({}): {}}
   */
  getConfigPostProcessor() {
    return this._configPostProcessor;
  }

  /**
   * @returns {{border: ChartConfigColor, background: ChartConfigColor}[]}
   */
  getColors() {
    return this._colors;
  }
}
