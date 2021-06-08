import ChartEnvironment from './environment';

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
     * @type {[string]}
     * @private
     */
    this._colors = [
      '#ff6384',
      '#36a2eb',
      '#cc65fe',
      '#ffce56'
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
   * @returns {string[]}
   */
  getColors() {
    return this._colors;
  }
}
