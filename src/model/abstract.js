export default class AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        throw new Error('not implemented');
    }

    validate() {
        // NOP
    }
}