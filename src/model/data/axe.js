import AbstractChartModel from '../abstract';

export default class ChartDataAxeModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataAxe';
    }

    /**
     * @type {ChartDataAxeLabelModel[]}
     */
    labels = [];
}