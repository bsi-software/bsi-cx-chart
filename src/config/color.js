export default class ChartUrlProviderConfigColor {
  static _VALID_COLOR = /^#[0-9a-f]{6,8}$/;

  constructor(color) {
    /**
     * @type {string}
     */
    this._color = this._validateColor(color);
  }

  /**
   * @returns {string}
   */
  getHex() {
    return this._color;
  }

  _validateColor(color) {
    if (ChartUrlProviderConfigColor._VALID_COLOR.test(color)) {
      return color;
    }
    throw new Error(`color ${color} is invalid`);
  }

  /**
   * @param {string} border
   * @param {string} background
   * @returns {{border: ChartUrlProviderConfigColor, background: ChartUrlProviderConfigColor}}
   */
  static of(border, background) {
    return {
      border: new ChartUrlProviderConfigColor(border),
      background: new ChartUrlProviderConfigColor(background)
    };
  }
}
