import assert from '~/modules/core/utils/jsHelpers/assert';
import _ from 'lodash';

class RefetchDependencyResolver {
  constructor(refetchMethod, refetchDependencies) {
    // NOTE : Workaround to resolve the binding issue upon calling the method
    this.refetchMethod = (...params) => refetchMethod(...params);
    this.refetchDependencies = refetchDependencies;
    this.subscribers = {};
  }

  subscribe = (key, actions) => {
    this.subscribers[key] = actions;
  }

  getDependenciesUpdates = (key) => {
    if (!this.refetchDependencies || !this.refetchDependencies[key]) {
      return [];
    }

    const actionsExecutionResult =
      _.mapValues(
        this.refetchDependencies[key],
        (dependencies, action) =>
          dependencies.map((dependencyName) => {
            assert(this.subscribers[dependencyName], `The subscriber with name '${dependencyName}', is required by the dependency '${key}#${action}', but not found`);
            assert(this.subscribers[dependencyName][action], `The action '${action}' isn't supported by the subscriber with key '${key}'`);
            return this.subscribers[dependencyName][action]();
          }),
      );

    return _.concat(_.flatten(_.values(actionsExecutionResult)));
  }

  refetch = (key, update, path) => {
    let updateArray = update;
    if (!_.isArray(updateArray)) {
      updateArray = [{ path, update }];
    }
    return this.refetchMethod([
      ...updateArray,
      ...this.getDependenciesUpdates(key),
    ]);
  }
}

export default RefetchDependencyResolver;
