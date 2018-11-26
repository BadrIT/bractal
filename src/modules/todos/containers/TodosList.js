import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import TodosListEntry from './TodosListEntry';

const TodosList = ({ todos }) => (
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
        todos.map(entry => (
          // eslint-disable-next-line no-underscore-dangle
          <Segment key={entry.__id} >
            <TodosListEntry todoInfo={entry} />
          </Segment>
        ))
      }
    </Segment>
  </Container>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodosList;
