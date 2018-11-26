import deepmerge from 'deepmerge';
import _ from 'lodash';
import qs from 'qs';
import { applyPatchChain } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';

export const generateURLQueryStringFromGraphQLQueryInput = (
  key,
  graphQLUpdates,
  initialVariables,
) => {
  const updatesList = _.isArray(graphQLUpdates) ? graphQLUpdates : [graphQLUpdates];

  return qs.stringify({
    [key]: JSON.stringify(applyPatchChain(updatesList, initialVariables || {})),
  });
};

export const appendQueryStringInputToGraphQLQueryInput = (
  key,
  URLQueryString,
  currentVariables,
) => {
  const queryString = URLQueryString.length > 0 && URLQueryString[0] === '?'
    ? URLQueryString.substr(1)
    : URLQueryString;

  const params = qs.parse(queryString);
  if (!params || !params[key]) {
    return currentVariables || {};
  }

  return deepmerge(currentVariables, JSON.parse(params[key]));
};
