import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  extractModalPartFromLocation,
  makeModalPath,
} from '~/modules/core/utils/modalHelpers';

const ModalRoute = ({
  exact,
  path,
  component,
  location,
}) => (
  <Switch location={extractModalPartFromLocation(location)}>
    <Route
      exact={exact}
      path={makeModalPath(path)}
      component={component}
    />
  </Switch>
);

ModalRoute.propTypes = PropTypes.shape({
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
  onModalOpen: PropTypes.func.isRequired,
}).isRequired;

export default withRouter(ModalRoute);
