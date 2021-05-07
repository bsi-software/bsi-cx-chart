import ChartDataModel from './data';
import ChartDataAxeModel from './data/axe';
import ChartDataAxeLabelModel from './data/axe/label';
import ChartDataConfigModel from './data/config';
import ChartDataDatasetModel from './data/dataset';
import ChartDataDatasetValueModel from './data/dataset/value';
import ChartDataDatasetValueTupleModel from './data/dataset/value/tuple';

export default class ChartModelParser {
    /**
     * @type {Map<string, AbstractChartModel>}
     */
    MODEL_CLASSES = new Map([
        [ChartDataModel.getType(), ChartDataModel],
        [ChartDataAxeModel.getType(), ChartDataAxeModel],
        [ChartDataAxeLabelModel.getType(), ChartDataAxeLabelModel],
        [ChartDataConfigModel.getType(), ChartDataConfigModel],
        [ChartDataDatasetModel.getType(), ChartDataDatasetModel],
        [ChartDataDatasetValueModel.getType(), ChartDataDatasetValueModel],
        [ChartDataDatasetValueTupleModel.getType(), ChartDataDatasetValueTupleModel]
    ]);

    /**
     * @param {{}} data
     * @returns {AbstractChartModel|AbstractChartModel[]|*}
     */
    parse(data) {
        if (Array.isArray(data)) {
            return data.map(value => this.parse(value));
        }
        if (typeof data === 'object' && data.hasOwnProperty('_type')) {
            return this._init(data);
        }
        return data;
    }

    /**
     * @param {{}} data
     * @private
     */
    _init(data) {
        const model = this._resolveType(data._type);
        for (const [key, value] of Object.entries(data)) {
            if (model.hasOwnProperty(key)) {
                model[key] = this.parse(value);
            }
        }
        model.validate();
        return model;
    }

    /**
     * @param {string} type
     * @returns {AbstractChartModel}
     * @private
     */
    _resolveType(type) {
        const model = this.MODEL_CLASSES.get(type);
        if (model === undefined) {
            throw new Error(`type ${type} is unknown`);
        }
        return new model();
    }
}