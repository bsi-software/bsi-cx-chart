import AbstractAdapter from '../abstract/adapter';

export default class ChartJsAdapter extends AbstractAdapter {
    /**
     * @param {ChartDataModel} model
     */
    handle(model) {
        return {
            type: model.config.type,
            data: {
                labels: this._extractLabels(model.axes),
                datasets: this._extractDatasets(model.data)
            }
        };
    }

    /**
     * @param {ChartDataAxeModel[]} axes
     * @returns {string[]}
     * @private
     */
    _extractLabels(axes) {
        return axes.length === 1 ? axes[0].labels.map(obj => obj.label) : [];
    }

    /**
     * @param {ChartDataDatasetModel[]} data
     * @returns {{}[]}
     * @private
     */
    _extractDatasets(data) {
        data.map(dataset => {
            return {
                label: dataset.label,
                data: dataset.values.map(value => value.tuples[0].value)
            };
        })
    }

}
