import AbstractChartModel from '../../abstract';

export default class ChartDataAxeLabelModel extends AbstractChartModel {
    /**
     * @returns {string}
     */
    static getType() {
        return 'studio.ChartDataAxeLabel';
    }

    /**
     * @type {string}
     */
    label = undefined;

    validate() {
        if (this.label === undefined) {
            throw new Error('label is required');
        }
    }
}