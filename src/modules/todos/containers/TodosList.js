import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import TodosListEntry from './TodosListEntry';

const TodosList = ({ query }) => (
  <Container >
    <Segment >
      <LinearLayout row spaceBetweenJustified>
        <Link
          to="/todos/create"
        >
          Create Todo
        </Link>
        <Link
          to="/todos/signin"
          onClick={() => localStorage.removeItem('userId')}
        >
          Log out
        </Link>
      </LinearLayout>
      {
        query ?
          query.todosByUser.map(entry => (
            // eslint-disable-next-line no-underscore-dangle
            <Segment key={entry.__id} >
              <TodosListEntry todoInfo={entry} />
            </Segment>
          ))
        :
          'Loading...'
      }
    </Segment>
  </Container>
);

TodosList.propTypes = {
  query: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default createFragmentContainer(TodosList, graphql`
  fragment TodosList_query on Query @argumentDefinitions(userId: {type: "ID!"}){    
    todosByUser(userId: $userId) {
      ...TodosListEntry_todoInfo
    }
  }
`);
