import 'whatwg-fetch';

import ChartDataSource from './chart-data-source';
import ChartEnvironment from './environment';

window.ChartDataSource = ChartDataSource;
window.ChartEnvironment = ChartEnvironment;

export {
    ChartEnvironment,
    ChartDataSource
};
