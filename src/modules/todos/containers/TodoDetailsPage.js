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

import TodoDetails from './TodoDetails';

const TodoDetailsPageQuery = graphql`
    query TodoDetailsPageQuery ($todoId: ID!) {
      todo(todoId: $todoId) {
        ...TodoDetails_todoInfo
      }
    }
`;

const TodoDetailsPage = ({ environment, match }) => {
  const todoID = match && match.params && match.params.id;

  return (
    <Container>
      <Link to="/todos/list" >
        <h1> {'< Todo List'} </h1>
      </Link>
      <br />
      <br />
      <QueryRenderer
        environment={environment}
        // eslint-disable-next-line react/jsx-curly-spacing
        query={ TodoDetailsPageQuery }
        variables={{
            todoId: todoID,
        }}
        render={({ error, props }) => {
          if (error) {
              return <Container>{error.message}</Container>;
          // eslint-disable-next-line react/prop-types
          } else if (props && props.todo) {
              return (
                <Segment>
                  <TodoDetails
                    hideHeaderAndAuthor={false}
                    // eslint-disable-next-line react/jsx-curly-spacing
                    todoInfo={props.todo }
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

TodoDetailsPage.propTypes = {
  environment: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default withRelayEnvironment(TodoDetailsPage);
