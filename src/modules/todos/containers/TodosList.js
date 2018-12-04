import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import TodosListEntry from './TodosListEntry';

const TodosList = ({ query }) => (
  <Container >
    <Segment >
      <Link
        to="/todos/create"
      >
        Create Todo
      </Link>
      {
        query ?
          query.todoes.map(entry => (
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
    todoes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default createFragmentContainer(TodosList, graphql`
  fragment TodosList_query on Query {    
    todoes {
      ...TodosListEntry_todoInfo
    }
  }
`);
