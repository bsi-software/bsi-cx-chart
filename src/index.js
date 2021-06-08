import 'whatwg-fetch';

import ChartConfigColor from './config/color';
import ChartConfig from './config';
import ChartUrlProvider from './chart-url-provider';
import ChartEnvironment from './environment';

window.ChartConfigColor = ChartConfigColor;
window.ChartConfig = ChartConfig;
window.ChartUrlProvider = ChartUrlProvider;
window.ChartEnvironment = ChartEnvironment;

export {
  ChartConfigColor,
  ChartConfig,
  ChartEnvironment,
  ChartUrlProvider
};
