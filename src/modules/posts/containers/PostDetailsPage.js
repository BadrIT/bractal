/* eslint-disable jsx-a11y/anchor-is-valid, react/jsx-boolean-value */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import { Container, Segment } from 'semantic-ui-react';

import { withRelayEnvironment } from '~/modules/core/utils/relayHelpers/RelayInitializer';

import PostDetails from './PostDetails';

const PostDetailsPageQuery = graphql`
    query PostDetailsPageQuery ($filter: PostWhereUniqueInput!) {  
      post(where: $filter) {
        ...PostDetails_postInfo
      }
    }
`;

const PostDetailsPage = ({ environment, match }) => {
  const postID = match && match.params && match.params.id;

  return (
    <Container>
      <Link to="/posts" >
        <h1> {'< Post List'} </h1>
      </Link>
      <br />
      <br />
      <QueryRenderer
        environment={environment}
        // eslint-disable-next-line react/jsx-curly-spacing
        query={ PostDetailsPageQuery }
        variables={{
          filter: {
            id: postID,
          },
        }}
        render={({ error, props }) => {
          if (error) {
              return <Container>{error.message}</Container>;
          // eslint-disable-next-line react/prop-types
          } else if (props && props.post) {
              return (
                <Segment>
                  <PostDetails
                    hideHeaderAndAuthor={false}
                    // eslint-disable-next-line react/jsx-curly-spacing
                    postInfo={props.post }
                  />
                </Segment>
              );
          }
          return <Container>Loading ...</Container>;
        }}
      />
    </Container>
  );
};

PostDetailsPage.propTypes = {
  environment: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default withRelayEnvironment(PostDetailsPage);
