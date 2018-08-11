import BractalCore from './modules/core/containers/main';

import './styles/css/App.css';
// import theme from './Theme';
// import modulesConfig from './modulesConfig';
import APIMonitoring from './modules/apiMonitoring/containers/Home';

// import Layout from './modules/core/layouts/simple/Layout';
// import Layout from './modules/AykLayout/layouts/AykLayout';
// import Layout from './modules/BADRLibLayout/layouts/Layout';
// import Layout from './modules/ecommerceCore/layouts/Layout';


export const { renderApp } = BractalCore;
BractalCore.renderApp(APIMonitoring);

export default BractalCore;
