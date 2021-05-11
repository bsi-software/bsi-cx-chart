import 'whatwg-fetch';

import ChartDataSource from './chart-data-source';
import Environment from './environment';

window.ChartDataSource = ChartDataSource;
window.ChartEnvironment = Environment;

export {
    Environment,
    ChartDataSource
};
