import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsLineChartAdapter extends AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        return 'line';
    }
}