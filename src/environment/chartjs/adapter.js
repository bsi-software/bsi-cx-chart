import AbstractAdapter from '../abstract/adapter';
import ChartJsBarChartAdapter from './adapter/bar';
import ChartJsLineChartAdapter from './adapter/line';
import ChartJsRadarChartAdapter from './adapter/radar';
import ChartJsDoughnutChartAdapter from './adapter/doughnut';
import ChartJsPieChartAdapter from './adapter/pie';
import ChartJsPolarChartAdapter from './adapter/polar';
import ChartJsBubbleChartAdapter from './adapter/bubble';
import ChartJsScatterChartAdapter from './adapter/scatter';

export default class ChartJsAdapter extends AbstractAdapter {
    /**
     * @type {Map<string, AbstractChartJsChartAdapter>}
     */
    CHART_ADAPTERS = new Map([
        [ChartJsBarChartAdapter.getType(), ChartJsBarChartAdapter],
        [ChartJsLineChartAdapter.getType(), ChartJsLineChartAdapter],
        [ChartJsRadarChartAdapter.getType(), ChartJsRadarChartAdapter],
        [ChartJsDoughnutChartAdapter.getType(), ChartJsDoughnutChartAdapter],
        [ChartJsPieChartAdapter.getType(), ChartJsPieChartAdapter],
        [ChartJsPolarChartAdapter.getType(), ChartJsPolarChartAdapter],
        [ChartJsBubbleChartAdapter.getType(), ChartJsBubbleChartAdapter],
        [ChartJsScatterChartAdapter.getType(), ChartJsScatterChartAdapter]
    ]);

    /**
     * @param {ChartDataModel} model
     */
    handle(model) {
        const adapter = this._resolveAdapter(model.config.type);
        const config = {
            type: model.config.type,
            data: {
                datasets: adapter.extractDatasets(model)
            }
        };
        if (adapter.hasLabels()) {
            config.data.labels = adapter.extractLabels(model);
        }
        return config;
    }

    /**
     * @param type
     * @returns {AbstractChartJsChartAdapter}
     * @private
     */
    _resolveAdapter(type) {
        const adapter = this.CHART_ADAPTERS.get(type);
        if (adapter === undefined) {
            throw new Error(`adapter ${adapter} is unknown`);
        }
        return new adapter();
    }
}
