import AbstractChartJsChartAdapter from './abstract';

export default class ChartJsBubbleChartAdapter extends AbstractChartJsChartAdapter {
    /**
     * @returns {string}
     */
    static getType() {
        return 'bubble';
    }

    hasLabels() {
        return false;
    }
}
