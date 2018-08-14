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

const itemDetailsLink = itemID => `/posts/${itemID}`;

const PostsListEntry = ({ postInfo }) => {
  const fieldsNames = 'title';
  const fields = fieldsNames.split(' ').filter(field => field && field.length > 0 && field !== 'id');

  return (
    <Segment >
      {fields.map(field => (
        <div key={field}><b>{field} : </b>{ postInfo[field] }</div>
      ))}
      <br />
      <Link
        // eslint-disable-next-line react/jsx-curly-spacing
        to={itemDetailsLink(postInfo.id)}
      >
        Show Details
      </Link>
    </Segment>
  );
};

PostsListEntry.propTypes = {
  postInfo: PropTypes.shape({}).isRequired,
};

export default createFragmentContainer(PostsListEntry, graphql`
  fragment PostsListEntry_postInfo on Post {
    title
  }
`);
