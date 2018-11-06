/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Label } from '~/modules/coreUI/components/basic/Labels';
import PropTypes from 'prop-types';

import { makeModalFullPath } from '~/modules/core/utils/modalHelpers';

const ModalLink = (props) => {
  const { to, location, children } = props;
  return (
    <Label>
      <Link to={makeModalFullPath(location, to)}>
        {children}
      </Link>
    </Label>
  );
};

ModalLink.propTypes = PropTypes.shape({
  to: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}).isRequired;

export default withRouter(ModalLink);
