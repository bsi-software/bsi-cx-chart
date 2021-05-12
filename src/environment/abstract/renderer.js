export default class AbstractRenderer {
    /**
     * @param {*} chart - The chart object.
     * @param {HTMLElement} element - The HTML element to display the rendered chart.
     * @param {*} config - The configuration to render.
     * @returns {*}
     */
    render(chart, element, config) {
        throw new Error('not implemented');
    }
}