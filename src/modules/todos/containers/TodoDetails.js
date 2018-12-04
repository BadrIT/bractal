import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const TodoDetails = ({ todoInfo }) => {
  const fieldsNames = 'id title reminder_date description';
  const fields = fieldsNames.split(' ').filter(field => field && field.length > 0 && field !== 'id');

  return (
    <Container >
      {fields.map(field => (
        <div key={field}><b>{field} : </b>{ todoInfo[field] }</div>
      ))}
    </Container>
  );
};

TodoDetails.propTypes = PropTypes.shape({
  todoInfo: PropTypes.shape({}).isRequired,
}).isRequired;

export default createFragmentContainer(TodoDetails, graphql`
  fragment TodoDetails_todoInfo on Todo {    
    id title reminder_date description
  }
`);
