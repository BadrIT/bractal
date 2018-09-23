import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import { applyPatchChain } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';

const getVariables = props => (lodash.isFunction(props.variables)
  ? props.variables(props)
  : props.variables
);

class RefetchContainer extends React.Component {
  state ={
    variables: getVariables(this.props),
  };
  refetchDebounce = lodash.debounce(this.props.relay.refetch, 500, { trailing: true });

  refetch = (updatesObject) => {
    const variables = applyPatchChain(updatesObject, this.state.variables);
    this.state.variables = variables;
    this.refetchDebounce(this.state.variables);
  }

  render = () => (
    <this.props.WrappedComponent
      {...this.props}
      queryResult={this.props.queryResult}
      refetchMethodChain={this.refetch}
    />
  );
}

RefetchContainer.propTypes = {
  relay: PropTypes.shape({}).isRequired,
}.isRequired;

export default RefetchContainer;
