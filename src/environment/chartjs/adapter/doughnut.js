import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsDoughnutChartAdapter extends AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        return 'doughnut';
    }
}
