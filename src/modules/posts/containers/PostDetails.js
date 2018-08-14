import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const PostDetails = ({ postInfo }) => {
  const fieldsNames = 'id title description';
  const fields = fieldsNames.split(' ').filter(field => field && field.length > 0 && field !== 'id');

  return (
    <Container >
      {fields.map(field => (
        <div key={field}><b>{field} : </b>{ postInfo[field] }</div>
      ))}
    </Container>
  );
};

PostDetails.propTypes = PropTypes.shape({
  postInfo: PropTypes.shape({}).isRequired,
}).isRequired;

export default createFragmentContainer(PostDetails, graphql`
  fragment PostDetails_postInfo on Post {    
    id title description
  }
`);
