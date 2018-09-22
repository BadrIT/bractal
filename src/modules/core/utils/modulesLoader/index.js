import React from 'react';
import CoreModule from '../../index';

const ModulesLoader = {
  loadModules: (modulesSpecs) => {
    if (!Array.isArray(modulesSpecs)) {
      throw new Error('ModuleSpecs must be of type Array');
    }

    // Adding the core module to the modules array (At the front)
    modulesSpecs.unshift(CoreModule);

    const modules = modulesSpecs.map((module) => {
      module.loadModule();
      return module;
    });

    ModulesLoader.Context = React.createContext(modules);

    return modules;
  },
  Context: React.createContext([]),
};

export default ModulesLoader;
export { default as withModules } from './withModules';
