import React from 'react';
import { Link } from 'react-router-dom';

import { login } from '~/modules/todos/Auth';

const TodosPage = () => {
  login();
  return (
    <Link to="/todos/list">
      Click if you are not redirected automatically
    </Link>
  );
};

export default TodosPage;
