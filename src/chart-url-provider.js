import ChartEnvironment from './environment';
import ChartModelParser from './model/parser';

export default class ChartUrlProvider {
  /**
   * @param {HTMLElement} element - The target element.
   * @param {ChartEnvironment} [environment=ChartEnvironment.CHART_JS] - The adapter to use.
   * @param {function({}): {}} [configPostProcessor=config=>config] - Post processor function for the configuration.
   */
  constructor(element, environment, configPostProcessor) {
    /**
     * @type {HTMLElement}
     * @private
     */
    this._element = this._validateElement(element);
    /**
     * @type {ChartEnvironment}
     * @private
     */
    this._environment = this._validateEnvironment(environment);
    /**
     * @type {function({}): {}}
     * @private
     */
    this._configPostProcessor = this._validateConfigPostProcessor(configPostProcessor);
    /**
     * @type {string}
     * @private
     */
    this._url = this._validateUrlProviderUrl(element);
    /**
     * @type {ChartDataModel|null}
     * @private
     */
    this._data = null;
    /**
     * @type {{}|null}
     * @private
     */
    this._rawData = null;
    /**
     * @type {*}
     * @private
     */
    this._config = null;
    /**
     * @type {*}
     * @private
     */
    this._chart = null;
  }

  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return this._element;
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
   * @param {{}} config
   * @returns {{}}
   */
  applyConfigPostProcessor(config) {
    const processedConfig = this._configPostProcessor(config);
    if (typeof processedConfig !== 'object') {
      throw new Error('config post processor returned invalid configuration');
    }
    return processedConfig;
  }

  /**
   * @returns {string}
   */
  getUrl() {
    return this._url;
  }

  /**
   * @returns {ChartDataModel|null}
   */
  getData() {
    return this._data;
  }

  /**
   * @returns {{}|null}
   */
  getRawData() {
    return this._rawData;
  }

  /**
   * @returns {*}
   */
  getConfig() {
    return this._config;
  }

  /**
   * @returns {*}
   */
  getChart() {
    return this._chart;
  }

  /**
   * @returns {Promise<any>}
   */
  fetchData() {
    const url = this.getUrl();
    const opts = {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    };
    return fetch(url, opts)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          const error = new Error('unable to fetch data from source');
          error.response = response;
          throw error;
        }
      })
      .then(data => {
        const parser = new ChartModelParser();
        this._rawData = data;
        this._data = parser.parse(data);
        const config = this.getEnvironment().adapter.handle(data);
        this._config = this.applyConfigPostProcessor(config);
        return new Promise(resolve => resolve(this._config));
      })
      .catch(error => console.error(error));
  }

  /**
   * @returns {Promise<any>}
   */
  render() {
    this.fetchData()
      .then(config => {
        this._chart = this.getEnvironment().renderer.render(this.getChart(), this.getElement(), config);
        return new Promise(resolve => resolve(this._chart));
      })
      .catch(error => console.error(error));
  }

  /**
   * @returns {ChartEnvironment}
   * @private
   */
  _getDefaultEnvironment() {
    return ChartEnvironment.CHART_JS;
  }

  /**
   * @param {*} element
   * @returns {HTMLElement}
   * @private
   */
  _validateElement(element) {
    if (!element) {
      throw new Error('element is mandatory');
    }
    if (element instanceof HTMLElement) {
      return element;
    }
    throw new Error('element must be a HTML element');
  }

  /**
   * @param {*} environment
   * @returns {ChartEnvironment}
   * @private
   */
  _validateEnvironment(environment) {
    if (!environment) {
      return this._getDefaultEnvironment();
    }
    if (environment instanceof ChartEnvironment) {
      return environment;
    }
    throw new Error('environment is not valid');
  }

  /**
   * @param {*} configPostProcessor
   * @returns {function({}): {}}
   * @private
   */
  _validateConfigPostProcessor(configPostProcessor) {
    if (configPostProcessor === undefined) {
      return config => config;
    }
    if (typeof configPostProcessor === 'function') {
      return configPostProcessor;
    }
    throw new Error('config post processor must be a lambda');
  }

  /**
   * @param {HTMLElement} element
   * @returns {string}
   * @private
   */
  _validateUrlProviderUrl(element) {
    const url = element.dataset.bsiUrl;
    if (!url) {
      throw new Error('url provider url not found on element');
    }
    return url;
  }
};
