import 'whatwg-fetch';

import ChartUrlProviderConfigColor from './config/color';
import ChartUrlProviderConfig from './config';
import ChartUrlProvider from './chart-url-provider';
import ChartEnvironment from './environment';

window.ChartUrlProviderConfigColor = ChartUrlProviderConfigColor;
window.ChartUrlProviderConfig = ChartUrlProviderConfig;
window.ChartUrlProvider = ChartUrlProvider;
window.ChartEnvironment = ChartEnvironment;

export {
  ChartUrlProviderConfigColor,
  ChartUrlProviderConfig,
  ChartEnvironment,
  ChartUrlProvider
};
