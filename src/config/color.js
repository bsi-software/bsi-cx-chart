export default class ChartConfigColor {
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
    if (ChartConfigColor._VALID_COLOR.test(color)) {
      return color;
    }
    throw new Error(`color ${color} is invalid`);
  }

  /**
   * @param {string} border
   * @param {string} background
   * @returns {{border: ChartConfigColor, background: ChartConfigColor}}
   */
  static of(border, background) {
    return {
      border: new ChartConfigColor(border),
      background: new ChartConfigColor(background)
    };
  }
}
