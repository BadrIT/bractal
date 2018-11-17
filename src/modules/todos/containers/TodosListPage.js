/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import { Container } from 'semantic-ui-react';

import { withRelayEnvironment } from '~/modules/core/utils/relayHelpers/RelayInitializer';
import withRefetchQuery from '~/modules/core/utils/relayHelpers/withRefetchQuery';
import TodosList from './TodosList';

import {
  ITEMS_LIST_VIEW_PAGINATION_KEY,
  buildPaginationQueryInput,
} from '~/modules/coreUI/components/pagination';
// import { ITEMS_LIST_VIEW_FILTER_KEY } from '~/modules/ecommerceCoreUI/components/listViewLayout/ItemsListFilter';
import {
  generateURLQueryStringFromGraphQLQueryInput,
  appendQueryStringInputToGraphQLQueryInput,
} from '~/modules/core/utils/relayHelpers/refetchUtils';
import { applyPatchChain } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';

const TodosListPageQuery = graphql`
    query TodosListPageQuery ($userId: ID!) {
      ...TodosList_query @arguments(userId: $userId)
    }
`;

const fragment = graphql`
  fragment TodosList_query on Query @argumentDefinitions(userId: {type: "ID!"}){    
    todosByUser(userId: $userId) {
      ...TodosListEntry_todoInfo
    }
  }
`;

const loader = () => <Container>Loading ...</Container>;

const TodosListPage = props => (
  // <QueryRenderer
  //   environment={environment}
  //   // eslint-disable-next-line react/jsx-curly-spacing
  //   query={ TodosListPageQuery }
  //   variables={{
  //     userId: localStorage.getItem('userId'),
  //   }}
  //   render={({ error, props }) => {
  //     // eslint-disable-next-line react/prop-types
  //     const queryRoot = props;
  //     if (error) {
  //         return <Container>{error.message}</Container>;
  //     } else if (props) {
  //         return <TodosList query={queryRoot} />;
  //     }
  //     return <Container>Loading ...</Container>;
  //   }}
  // />
  <TodosList query={queryRoot} blah={console.log(props)} />
);

TodosListPage.propTypes = {
  environment: PropTypes.shape({}).isRequired,
};

export default withRefetchQuery(
  TodosListPage,
  TodosListPageQuery,
  fragment,
  TodosListPage,
  props=> ({
    userId: localStorage.getItem('userId'),
  }), // variables
  // {
  //   [ITEMS_LIST_VIEW_FILTER_KEY]: {
  //     reset: [ITEMS_LIST_VIEW_PAGINATION_KEY],
  //   },
  // },
  // null,
  // {
  //   pageInfo: queryResult => _.cloneDeep(queryResult.variants_search.page_info),
  //   filters: queryResult => _.cloneDeep(queryResult.variants_search.related_filters),
  // },
  // false,
  // (variables, props) => { // callback
  //   // update url with filters, sort and pagination
  //   props.history.push({
  //     search: generateURLQueryStringFromGraphQLQueryInput(
  //       'products_list_query_input',
  //       [],
  //       variables,
  //     ),
  //   });
  // },
);