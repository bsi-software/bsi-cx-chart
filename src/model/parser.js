import ChartDataModel from './data';
import ChartDataAxisModel from './data/axis';
import ChartDataAxisLabelModel from './data/axis/label';
import ChartDataConfigModel from './data/config';
import ChartDataConfigLegendModel from './data/config/legend';
import ChartDataDatasetModel from './data/dataset';
import ChartDataDatasetValueModel from './data/dataset/value';
import ChartDataDatasetValueTupleModel from './data/dataset/value/tuple';

export default class ChartModelParser {
  /**
   * @type {Map<string, AbstractChartModel>}
   */
  static MODEL_CLASSES = new Map([
    [ChartDataModel.getType(), ChartDataModel],
    [ChartDataAxisModel.getType(), ChartDataAxisModel],
    [ChartDataAxisLabelModel.getType(), ChartDataAxisLabelModel],
    [ChartDataConfigModel.getType(), ChartDataConfigModel],
    [ChartDataConfigLegendModel.getType(), ChartDataConfigLegendModel],
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
    const model = ChartModelParser.MODEL_CLASSES.get(type);
    if (model === undefined) {
      throw new Error(`type ${type} is unknown`);
    }
    return new model();
  }
}