/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import _ from 'lodash';
import { Container } from 'semantic-ui-react';

import withRefetchQuery from '~/modules/core/utils/relayHelpers/withRefetchQuery';
import PaginationBox from '~/modules/coreUI/components/pagination/PaginationBox';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import TodosList from './TodosList';

const TodosListPageQuery = graphql`
  query TodosListPageQuery ($input: TodosUserInput!) {
    ...TodosListPage_queryResult @arguments(input: $input)
  }
`;

const fragment = {
  queryResult: graphql`
  fragment TodosListPage_queryResult on Query @argumentDefinitions(input: {type: "TodosUserInput!"}) {    
    todosByUser(input: $input) {
      todos {
        id,
        title,
      }
      pageInfo {
        ...PaginationData_pageInfo
      }
    }
  }`,
};

const loader = () => <Container>Loading ...</Container>;

const TodosListPage = props => (
  <React.Fragment>
    <TodosList todos={props.queryResult.todosByUser.todos} />
    <Spacer />
    <PaginationBox />
    <Spacer />
  </React.Fragment>
);

TodosListPage.propTypes = {
  queryResult: PropTypes.shape({}).isRequired,
};

export default withRefetchQuery(
  TodosListPage,
  TodosListPageQuery,
  fragment,
  loader,
  () => ({
    input: {
      userId: localStorage.getItem('userId'),
      page: {
        limit: 3,
        offset: 0,
      },
    },
  }),
  null,
  {
    pageInfo: queryResult => _.cloneDeep(queryResult.todosByUser.pageInfo),
  },
);
