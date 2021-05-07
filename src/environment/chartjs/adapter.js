import AbstractAdapter from '../abstract/adapter';
import ChartJsBarChartAdapter from './adapter/bar';
import ChartJsLineChartAdapter from './adapter/line';
import ChartJsRadarChartAdapter from './adapter/radar';
import ChartJsDoughnutChartAdapter from './adapter/doughnut';

export default class ChartJsAdapter extends AbstractAdapter {
    /**
     * @type {Map<string, AbstractChartJsChartAdapter>}
     */
    CHART_ADAPTERS = new Map([
        [ChartJsBarChartAdapter.getType(), ChartJsBarChartAdapter],
        [ChartJsLineChartAdapter.getType(), ChartJsLineChartAdapter],
        [ChartJsRadarChartAdapter.getType(), ChartJsRadarChartAdapter],
        [ChartJsDoughnutChartAdapter.getType(), ChartJsDoughnutChartAdapter]
    ]);

    /**
     * @param {ChartDataModel} model
     */
    handle(model) {
        const adapter = this._resolveAdapter(model.config.type);
        return {
            type: model.config.type,
            data: {
                labels: adapter.extractLabels(model),
                datasets: adapter.extractDatasets(model)
            }
        };
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
        return adapter();
    }
}
