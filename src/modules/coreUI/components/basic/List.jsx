import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ListElm = styled.ul`
  width:90%;
`;
const List = props => (
  <ListElm {...props}>
    { props.TxtList.map(Txt => (
      <li>
        { Txt }
      </li>
 )) }
  </ListElm>
);


export default List;

List.propTypes = PropTypes.shape({
  TxtList: PropTypes.array,
}).isRequired;
