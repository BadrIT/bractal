/* eslint-disable no-else-return, indent */
import React from 'react';
import ExternalLink from '~/modules/coreUI/components/basic/ExternalLink';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ValidateAndResolve from '~/modules/core/utils/jsHelpers/ValidateAndResolve';
import VerticalSeparator from '~/modules/coreUI/components/layouts/helpers/VerticalSeparator';
import { Spacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';

import DropdownContentTracker from './DropdownContentTracker';

const FlexLink = styled(ExternalLink)`
  display: flex;
`;

const renderMenuItem = (itemInfo) => {
  const {
    targetURL, linkLabelText, itemRenderer, iconImageSrc, dropdownContent,
  } = itemInfo;

  let content = null;

  if (linkLabelText) {
    content = <span>{linkLabelText}</span>;
  } else if (iconImageSrc) {
    content = <Image src={iconImageSrc} srcSet={iconImageSrc} />;
  } else if (itemRenderer) {
    content = itemRenderer;
  }

  let menuItem = null;

  if (targetURL) {
    menuItem = <FlexLink url={targetURL}> { content } </FlexLink>;
  } else {
    menuItem = content;
  }

  if (dropdownContent) {
    return (
      <DropdownContentTracker
        itemRenderer={menuItem}
        dropdownContent={dropdownContent}
      />
    );
  } else {
    return menuItem;
  }
};

const renderVerticalSeparator = itemInfo => (
  <VerticalSeparator
    spacerWidth={itemInfo.spacerWidth}
    separatorColorTone={itemInfo.separatorColorTone}
    separatorLength={itemInfo.separatorLength || 'large'}
    separatorWeight={itemInfo.separatorWeight}
  />
);

const renderHorizontalSpacer = itemInfo => (
  <Spacer spacerSize={itemInfo.spacerWidth || 'xxLarge'} >
    hello
  </Spacer>
);

const MenuItemRenderer = ({ itemInfo }) =>
  ValidateAndResolve
    .with(itemInfo)
      .if_hasAnyOf(['verticalSeparator', 'horizontalSpacer'])
        .thenProhibitAllOf([
          'linkLabelText', 'iconImageSrc', 'itemRenderer', 'targetURL', 'dropdownContent',
        ])
      .and_if_hasAnyOf(['linkLabelText', 'iconImageSrc', 'itemRenderer'])
        .andProhibitAllOf([
          'spacerSize', 'separatorWeight', 'separatorLength', 'separatorColorTone',
        ])
      .and_if_hasAnyOf(['horizontalSpacer'])
        .thenProhibitAllOf([
          'separatorWeight', 'separatorLength', 'separatorColorTone',
        ])
    .then()
      .if_has('verticalSeparator')
        .resolveWith(renderVerticalSeparator(itemInfo))

      .else_if_has('horizontalSpacer')
        .resolveWith(renderHorizontalSpacer(itemInfo))

      .else()
        .resolveWith(renderMenuItem(itemInfo))

      .end();

MenuItemRenderer.ItemInfoPropTypes = {
  linkLabelText: PropTypes.string,
  horizontalSpacer: PropTypes.bool,
  verticalSeparator: PropTypes.bool,
  iconImageSrc: PropTypes.string,
  itemRenderer: PropTypes.element,
  targetURL: PropTypes.string,
  dropdownContent: PropTypes.element,
  styleClass: PropTypes.string,
  spacerWidth: PropTypes.oneOf(['small', 'medium', 'large', 'xLarge', 'xxLarge']),
  separatorWeight: PropTypes.oneOf(['thin', 'normal', 'thick']),
  separatorLength: PropTypes.oneOf(['shorn', 'normal', 'full']),
  separatorColorTone: PropTypes.oneOf(['light', 'normal', 'dark']),
};

MenuItemRenderer.propTypes = PropTypes.shape({
  itemInfo: PropTypes.shape({
    ...MenuItemRenderer.ItemInfoPropTypes,
  }).isRequired,
}).isRequired;

export default MenuItemRenderer;
