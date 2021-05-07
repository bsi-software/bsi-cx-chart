import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsBarChartAdapter extends AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        return 'bar';
    }
}