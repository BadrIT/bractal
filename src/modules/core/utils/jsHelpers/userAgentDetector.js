/* eslint-disable import/prefer-default-export */
import UAParser from 'ua-parser-js';

export const isOnInternetExplorerEdge = () => {
  const parser = new UAParser();
  return parser.getBrowser() && parser.getBrowser().name === 'Edge';
};
