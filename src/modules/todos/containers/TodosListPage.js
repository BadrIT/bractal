import React from 'react';
import PropTypes from 'prop-types';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import { Container } from 'semantic-ui-react';

import { withRelayEnvironment } from '~/modules/core/utils/relayHelpers/RelayInitializer';

import TodosList from './TodosList';

const TodosListPageQuery = graphql`
    query TodosListPageQuery ($userId: ID!) {
      ...TodosList_query @arguments(userId: $userId)
    }
`;

const TodosListPage = ({ environment }) => (
  <QueryRenderer
    environment={environment}
    // eslint-disable-next-line react/jsx-curly-spacing
    query={ TodosListPageQuery }
    variables={{
      userId: localStorage.getItem('userId'),
    }}
    render={({ error, props }) => {
      // eslint-disable-next-line react/prop-types
      const queryRoot = props;
      if (error) {
          return <Container>{error.message}</Container>;
      } else if (props) {
          return <TodosList query={queryRoot} />;
      }
      return <Container>Loading ...</Container>;
    }}
  />
);

TodosListPage.propTypes = {
  environment: PropTypes.shape({}).isRequired,
};

export default withRelayEnvironment(TodosListPage);
