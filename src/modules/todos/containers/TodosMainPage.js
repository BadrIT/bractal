import React from 'react';
import PropTypes from 'prop-types';
import TodosListPage from './TodosListPage';

const TodosPage = props => (
  <React.Fragment>
    {localStorage.getItem('userId') ? (
      <TodosListPage />
    ) : (
      props.history.push('/todos/signin')
    )}
  </React.Fragment>
);

TodosPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default TodosPage;
