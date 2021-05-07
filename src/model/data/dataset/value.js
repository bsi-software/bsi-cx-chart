import AbstractChartModel from '../../abstract';

export default class ChartDataDatasetValueModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataDatasetValue';
    }

    /**
     * @type {ChartDataDatasetValueTupleModel[]}
     */
    tuples = [];
}