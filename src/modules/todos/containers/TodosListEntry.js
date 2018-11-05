/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
} from 'semantic-ui-react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import PropTypes from 'prop-types';

const itemDetailsLink = itemID => `/todos/${itemID}`;

const TodosListEntry = ({ todoInfo }) => {
  const fieldsNames = 'id title';
  const fields = fieldsNames.split(' ').filter(field => field && field.length > 0 && field !== 'id');

  return (
    <Segment >
      {fields.map(field => (
        <div key={field}><b>{field} : </b>{todoInfo[field]}</div>
      ))}
      <br />
      <Link
        // eslint-disable-next-line react/jsx-curly-spacing
        to={itemDetailsLink(todoInfo.id)}
      >
        Show Details
      </Link>
    </Segment>
  );
};

TodosListEntry.propTypes = {
  todoInfo: PropTypes.shape({}).isRequired,
};

export default createFragmentContainer(TodosListEntry, graphql`
  fragment TodosListEntry_todoInfo on Todo {
    id,
    title,
  }
`);
