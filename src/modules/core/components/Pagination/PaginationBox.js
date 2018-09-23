import React from 'react';
import PropTypes from 'prop-types';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import Media from 'react-media';
import { mediaQueryMax } from '~/modules/core/utils/cssHelpers/cssMedia';
import PaginationWrapper from './PaginationWrapper';
import PaginationBoxMobile from './PaginationBoxMobile';
import PaginationBoxDesktop from './PaginationBoxDesktop';

const PaginationBox = ({ refetchMethod, pageInfo, subscribe }) => {
  const paginator = new PaginationWrapper(refetchMethod, subscribe, pageInfo.limit);
  return (
    <React.Fragment>
      {pageInfo.items_count > pageInfo.limit &&
        <Media query={mediaQueryMax('mobile')}>
          {matches => (
            matches
              ? <PaginationBoxMobile paginator={paginator} pageInfo={pageInfo} />
              : <PaginationBoxDesktop paginator={paginator} pageInfo={pageInfo} />
          )}
        </Media>
      }
    </React.Fragment>
  );
};

PaginationBox.propTypes = {
  pageInfo: PropTypes.shape({}).isRequired,
  refetchMethod: PropTypes.func.isRequired,
}.isRequired;

export default PaginationBox;
