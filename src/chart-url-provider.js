import ChartModelParser from './model/parser';
import ChartConfig from './config';

export default class ChartUrlProvider {
  /**
   * @param {HTMLElement} element - The target element.
   * @param {ChartConfig} [config=ChartConfig.DEFAULT] - The configuration to use.
   */
  constructor(element, config) {
    /**
     * @type {HTMLElement}
     * @private
     */
    this._element = this._validateElement(element);
    /**
     * @type {ChartConfig}
     * @private
     */
    this._config = this._validateConfig(config);
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
    this._chartConfig = null;
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
   * @returns {ChartConfig}
   */
  getConfig() {
    return this._config;
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
   * @returns {{}}
   */
  getChartConfig() {
    return this._chartConfig;
  }

  /**
   * @returns {*}
   */
  getChart() {
    return this._chart;
  }

  /**
   * @param {{}} config
   * @returns {{}}
   */
  _applyConfigPostProcessor(config) {
    const processedConfig = this.getConfig().getConfigPostProcessor()(config);
    if (typeof processedConfig !== 'object') {
      throw new Error('config post processor returned invalid configuration');
    }
    return processedConfig;
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
        const config = this.getConfig().getEnvironment().adapter.transform(this.getConfig(), this.getData());
        this._chartConfig = this._applyConfigPostProcessor(config);
        return new Promise(resolve => resolve(this._chartConfig));
      })
      .catch(error => console.error(error));
  }

  /**
   * @returns {Promise<any>}
   */
  render() {
    this.fetchData()
      .then(config => {
        this._chart = this.getConfig().getEnvironment().renderer.render(this.getChart(), this.getElement(), config);
        return new Promise(resolve => resolve(this._chart));
      })
      .catch(error => console.error(error));
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
   * @param config
   * @returns {ChartConfig}
   * @private
   */
  _validateConfig(config) {
    if (config instanceof ChartConfig) {
      return config;
    }
    return ChartConfig.DEFAULT;
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
