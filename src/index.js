import 'whatwg-fetch';

import ChartUrlProvider from './chart-url-provider';
import ChartEnvironment from './environment';

window.ChartUrlProvider = ChartUrlProvider;
window.ChartEnvironment = ChartEnvironment;

export {
  ChartEnvironment,
  ChartUrlProvider
};
