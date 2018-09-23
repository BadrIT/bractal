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

const recursiveArray = (pathObject, current, variables) => {
  let returnedObject = applyPatch(
    pathObject[current].path,
    variables,
    pathObject[current].update,
  );
  if (pathObject[current + 1]) {
    returnedObject = recursiveArray(
      pathObject,
      current + 1,
      returnedObject,
    );
  }
  return returnedObject;
};

export const applyPatchChain = (pathObject, variables) =>
  recursiveArray(pathObject, 0, variables);
