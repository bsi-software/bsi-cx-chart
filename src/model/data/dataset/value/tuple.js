import AbstractChartModel from '../../../abstract';

export default class ChartDataDatasetValueTupleModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataDatasetValueTuple';
    }

    /**
     * @type {string}
     */
    dimension = undefined;
    /**
     * @type {number}
     */
    value = undefined;

    validate() {
        if (this.dimension === undefined) {
            throw new Error('dimension is required');
        }
        if (this.value === undefined) {
            throw new Error('value is required');
        }
    }
}