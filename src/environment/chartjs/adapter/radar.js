import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsRadarChartAdapter extends AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        return 'radar';
    }
}