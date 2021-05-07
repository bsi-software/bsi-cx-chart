export default class AbstractAdapter {
    /**
     * @param {ChartDataModel} model - The data to transform.
     * @returns {*}
     */
    handle(model) {
        return model;
    }
}