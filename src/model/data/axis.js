import AbstractChartModel from '../abstract';

export default class ChartDataAxisModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataAxis';
    }

    /**
     * @type {ChartDataAxisLabelModel[]}
     */
    labels = [];
}