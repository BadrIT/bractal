import _ from 'lodash';

const recursiveUpdate = (pathElements, current, targetObject, updatesObject) => {
  if (pathElements.length === current) {
    return {
      ...targetObject,
      ...updatesObject,
    };
  }

  const key = pathElements[current];
  const found = targetObject[key];

  if (found) {
    return {
      ...targetObject,
      [key]: recursiveUpdate(pathElements, current + 1, targetObject[key], updatesObject),
    };
  }
  return {
    ...targetObject,
    [key]: recursiveUpdate(pathElements, current + 1, targetObject, updatesObject),
  };
};

export const applyPatch = (path, variables, updatesObject) => {
  const pathElements = path.split('.');
  // skipping first elemet in array ^ and starting from index 1
  return recursiveUpdate(pathElements, 1, variables, updatesObject);
};

export const applyPatchChain = (patchList, initialVariables) => (
  !patchList || !_.isArray(patchList) || patchList.length === 0
    ? initialVariables
    : _.reduce(
      patchList,
      (resultVariables, patch) => applyPatch(
        patch.path,
        resultVariables,
        patch.update,
      ),
      initialVariables,
    )
);
