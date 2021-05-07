import AbstractChartModel from '../abstract';

export default class ChartDataDatasetModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataDataset';
    }

    /**
     * @type {string}
     */
    label = undefined;
    /**
     * @type {ChartDataDatasetValueModel[]}
     */
    values = [];

    validate() {
        if (this.label === undefined) {
            throw new Error('label is required');
        }
    }
}