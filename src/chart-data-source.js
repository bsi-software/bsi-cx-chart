import Environment from './environment';

export default class ChartDataSource {
    /**
     * @param {HTMLElement} element - The target element.
     * @param {Environment} [environment=Environment.CHART_JS] - The adapter to use.
     */
    constructor(element, environment) {
        this._element = this._validateElement(element);
        this._environment = this._validateEnvironment(environment);
        this._url = element.dataset.bsiDataSourceUrl || throw new Error('data source url not found on element');
        /**
         * @type {{}|null}
         * @private
         */
        this._data = null;
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
     * @returns {{}|null}
     */
    getData() {
        return this._data;
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
                this._data = data;
                this._config = this.getEnvironment().adapter.handle(data);
                return new Promise(resolve => resolve(this._config));
            })
            .catch(error => console.error(error));
    }

    render() {
        this.fetchData()
            .then(config => {
                this._chart = this.getEnvironment().render.render(this.getChart(), this.getElement(), config);
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
};
