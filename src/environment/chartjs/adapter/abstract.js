export default class AbstractChartJsChartAdapter {
  /**
   * @returns {string}
   */
  static getType() {
    throw new Error('not implemented');
  }

  /**
   * @returns {boolean}
   */
  hasLabels() {
    return true;
  }

  /**
   * @param {ChartDataModel} model
   * @returns {string[]}
   */
  extractLabels(model) {
    /**
     * @type {ChartDataAxisModel[]}
     */
    const axes = model.axes || [];
    if (axes.length === 0) {
      throw new Error('no axes defined');
    }
    return axes.pop().labels.map(label => label.label);
  }

  /**
   * @param {ChartDataModel} model
   * @returns {{}[]}
   */
  extractDatasets(model) {
    /**
     * @type {ChartDataDatasetModel[]}
     */
    const datasets = model.data || [];
    return datasets.map(dataset => {
      return {
        label: dataset.label,
        data: dataset.values.map(value => this._extractValueFromValueModel(value))
      }
    });
  }

  /**
   * @param {ChartDataConfigLegendModel} model
   * @returns {{}|undefined}
   */
  extractLegend(model) {
    if (model === undefined) {
      return undefined;
    }
    return {
      display: model.display,
      onClick: model.clickable ? undefined : () => void (0),
      position: model.position,
      align: model.alignment,
      title: this._extractLegendTitle(model.title)
    };
  }

  /**
   * @param {string} title
   * @returns {{}|undefined}
   * @private
   */
  _extractLegendTitle(title) {
    if (title === undefined) {
      return undefined;
    }
    return {
      text: title,
      display: true
    };
  }

  /**
   * @param {ChartDataDatasetValueModel} value
   * @returns {number|{}}
   * @private
   */
  _extractValueFromValueModel(value) {
    if (value.tuples.length === 0) {
      throw new Error('value requires at least one tuple');
    }
    switch (value.tuples.length) {
      case 0:
        throw new Error('value requires at least one tuple');
      case 1:
        return value.tuples.pop().value;
      default:
        const data = {};
        value.tuples.forEach(tuple => data[tuple.dimension] = tuple.value);
        return data;
    }
  }
}