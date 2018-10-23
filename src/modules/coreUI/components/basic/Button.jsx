/* eslint-disable import/prefer-default-export */
import React from 'react';
import _ from 'lodash';
import { withTheme } from 'emotion-theming';
import styled from 'react-emotion';
import { css } from 'emotion';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';
import PropTypes from 'prop-types';
import PulseLoader from 'react-spinners/PulseLoader';

import assert from '~/modules/core/utils/jsHelpers/assert';

import { darken, infereButtonColors, responsiveStyle, infereIntraSpacingSize, infereFontWeight, propsForPrefix, infereFontSize, inferePaddingSize, infereBorderRadius, colorStyles, disabledColorStyles } from '~/modules/coreUI/utils/infereStyle';
import spaceStyles from '~/modules/coreUI/utils/styleSystem';


import Icon from '~/modules/coreUI/components/basic/Icon';
import { Row, Box } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

const ButtonContent = styled(Row)`
  white-space: nowrap;
`;

// Must be of relative position for the loading icon to be drawn correctly
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;    

  ${props => responsiveStyle(props, 'size', size => css`
    padding-top: ${inferePaddingSize(props, size)}px;
    padding-bottom: ${inferePaddingSize(props, size)}px;
    padding-left: ${(props.pxRatio || 2) * inferePaddingSize(props, size)}px;
    padding-right: ${(props.pxRatio || 2) * inferePaddingSize(props, size)}px; 
  `)};
  
  ${props => responsiveStyle(props, 'size', size => css`
    font-size: ${infereFontSize(props, size)};
  `)};
  font-weight: ${props => infereFontWeight(props)};  
  
  border: ${props => (props.borderLess ? 0 : (props.theme.buttons.border || 1))}px solid;
  ${props => responsiveStyle(props, 'size', size => css`
    border-radius: ${infereBorderRadius(props, size)}px;
  `)};

  outline-style: none;
  
  cursor: pointer;

  ${props => spaceStyles(props)}
  ${props => (props.disabled ? disabledColorStyles(props) : colorStyles(props))}
`;

const LoaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);

  ${props => responsiveStyle(props, 'size', size => css`
    border-radius: ${infereBorderRadius(props, size)}px;
  `)};

  & .buttonLoader > * {
    background-color: ${props => darken(props.color || infereButtonColors(props).lineColor, 0)};
  }

  & .buttonLoader {
    position: absolute;
    line-height: 14px;
    height: 11px;
    ${props => responsiveStyle(props, 'size', size => css`
      bottom: ${inferePaddingSize(props, size) / 2}px;
    `)};
    opacity: 0.6;
  }
`;

const ButtonContainer = styled(Box)`
  position: relative;
  width: ${props => (props.block ? '100%' : props.width)};
`;

class InnerButton extends React.Component {
  componentDidMount = () => {
    // FIXME : The reason for the following work around, is that onClick would be called on the
    //         External component first, and thus causes the onClick being called twice
    assert(!this.props.onClick, "onClick shouldn't be used on BasicButton, use onClicked instead");
  }

  onClick = (e) => {
    if (this.props.onClicked) {
      this.props.onClicked(e);
    }
  };

  render = () => (
    <ButtonContainer block={this.props.block}>
      <StyledButton
        {..._.omit(this.props, ['onClicked'])}
        onClick={e => this.onClick(e)}
      >
        <ButtonContent
          centerJustified
          centerAligned
          spaceBetween={infereIntraSpacingSize(this.props) / this.props.theme.new.spacer}
          {...propsForPrefix(this.props, 'buttonContent_')}
        >
          {this.props.iconName &&
            <Icon
              className={this.props.iconName}
              {...propsForPrefix(this.props, 'iconBefore_')}
            />
          }
          {this.props.icon &&
            this.props.icon
          }
          {this.props.children}
          {this.props.iconAfterName &&
            <Icon
              className={this.props.iconAfterName}
              {...propsForPrefix(this.props, 'iconAfter_')}
            />
          }
          {this.props.iconAfter &&
            this.props.iconAfter
          }
        </ButtonContent>
      </StyledButton>
      {this.props.loading &&
        <LoaderContainer {..._.omit(this.props, ['onClicked'])}>
          <Box fullWidth fullHeight>
            <PulseLoader size={2} className="buttonLoader" />
          </Box>
        </LoaderContainer>
      }
    </ButtonContainer>
  );
}

InnerButton.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
}).isRequired;


const Button = withMedia(withTheme(props => (process.isStyleguidistActive ? (
  <InnerButton
    {...props}
    title={
      responsiveStyle(props, 'size', size => infereFontSize(props, size))
    }
  />
) : (
  <InnerButton {...props} />
))));

export default Button;
