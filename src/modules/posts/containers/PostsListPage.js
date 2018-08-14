import React from 'react';
import PropTypes from 'prop-types';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import { Container } from 'semantic-ui-react';

import { withRelayEnvironment } from '~/modules/core/utils/relayHelpers/RelayInitializer';

import PostsList from './PostsList';

const PostsListPageQuery = graphql`
    query PostsListPageQuery {  
      ...PostsList_query
    }
`;

const PostsListPage = ({ environment }) => (
  <QueryRenderer
    environment={environment}
    // eslint-disable-next-line react/jsx-curly-spacing
    query={ PostsListPageQuery }
    render={({ error, props }) => {
      // eslint-disable-next-line react/prop-types
      const queryRoot = props;
      if (error) {
          return <Container>{error.message}</Container>;
      } else if (props) {
          return <PostsList query={queryRoot} />;
      }
      return <Container>Loading ...</Container>;
    }}
  />
);

PostsListPage.propTypes = {
  environment: PropTypes.shape({}).isRequired,
};

export default withRelayEnvironment(PostsListPage);
