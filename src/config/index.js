import ChartEnvironment from '../environment';
import ChartUrlProviderConfigColor from './color';

export default class ChartUrlProviderConfig {
  static DEFAULT = new ChartUrlProviderConfig();

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
     * @type {{border:ChartUrlProviderConfigColor,background:ChartUrlProviderConfigColor}[]}
     * @private
     */
    this._colors = [
      ChartUrlProviderConfigColor.of('#ff6384ff', '#ff638466'),
      ChartUrlProviderConfigColor.of('#36a2ebff', '#36a2eb66'),
      ChartUrlProviderConfigColor.of('#cc65feff', '#cc65fe66'),
      ChartUrlProviderConfigColor.of('#ffce56ff', '#ffce5666')
    ];
  }

  /**
   * @param {ChartEnvironment} environment
   * @returns {ChartUrlProviderConfig}
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
   * @returns {ChartUrlProviderConfig}
   */
  withConfigPostProcessor(configPostProcessor) {
    if (typeof configPostProcessor === 'function') {
      this._configPostProcessor = configPostProcessor;
      return this;
    }
    throw new Error('config post processor must be a lambda');
  }

  /**
   * @param {string} colors
   * @returns {ChartUrlProviderConfig}
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
   * @returns {{border: ChartUrlProviderConfigColor, background: ChartUrlProviderConfigColor}[]}
   */
  getColors() {
    return this._colors;
  }
}
