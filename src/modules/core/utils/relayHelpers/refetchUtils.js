import deepmerge from 'deepmerge';
import _ from 'lodash';
import queryString from 'query-string';
import { applyPatchChain } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';

export const generateURLQueryStringFromGraphQLQueryInput = (
  key,
  graphQLUpdates,
  initialVariables,
) => {
  const updatesList = _.isArray(graphQLUpdates) ? graphQLUpdates : [graphQLUpdates];

  return queryString.stringify({
    [key]: JSON.stringify(applyPatchChain(updatesList, initialVariables || {})),
  });
};

export const appendQueryStringInputToGraphQLQueryInput = (
  key,
  URLQueryString,
  currentVariables,
) => {
  const params = queryString.parse(URLQueryString);
  if (!params || !params[key]) {
    return currentVariables || {};
  }

  return deepmerge(JSON.parse(params[key]), currentVariables);
};
