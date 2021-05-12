import Environment from './environment';
import ChartModelParser from './model/parser';

export default class ChartDataSource {
    /**
     * @param {HTMLElement} element - The target element.
     * @param {Environment} [environment=Environment.CHART_JS] - The adapter to use.
     */
    constructor(element, environment) {
        /**
         * @type {HTMLElement}
         * @private
         */
        this._element = this._validateElement(element);
        /**
         * @type {Environment}
         * @private
         */
        this._environment = this._validateEnvironment(environment);
        /**
         * @type {string}
         * @private
         */
        this._url = this._validateDataSourceUrl(element);
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
     * @returns {Environment}
     */
    getEnvironment() {
        return this._environment;
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
                this._config = this.getEnvironment().adapter.handle(data);
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
     * @returns {Environment}
     * @private
     */
    _getDefaultEnvironment() {
        return Environment.CHART_JS;
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
     * @param environment
     * @returns {Environment}
     * @private
     */
    _validateEnvironment(environment) {
        if (!environment) {
            return this._getDefaultEnvironment();
        }
        if (environment instanceof Environment) {
            return environment;
        }
        throw new Error('environment is not valid');
    }

    /**
     * @param {HTMLElement} element
     * @returns {string}
     * @private
     */
    _validateDataSourceUrl(element) {
        const url = element.dataset.bsiDataSourceUrl;
        if (!url) {
            throw new Error('data source url not found on element');
        }
        return url;
    }
};
