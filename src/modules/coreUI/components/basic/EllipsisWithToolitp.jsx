import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Tooltip from './Tooltip';

const EllipsisContainer = styled.div`
  overflow: hidden;
  line-height: 1;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;

  &:hover .tooltip {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;

const PositionedParent = styled.div`
  position: relative;
`;

const StyledSpan = styled.div`
  ${props => props.customStyle}
  overflow: ${props => (props.textOverflow ? 'hidden' : '')};
  border-bottom: ${props => (props.overflow ? 'dotted 1px' : null)};
  line-height: 1.3;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

class EllipisWithTooltip extends React.Component {
  state = {
    hasOverflow: false,
  };

  componentDidMount = () => (
    this.setState({
      hasOverflow: this.checkOverflow(),
      innerText: this.getInnerText(),
    })
  )

  componentDidUpdate = () => {
    this.rootElement.firstChild.removeAttribute('style');
    if (this.state.hasOverflow !== this.checkOverflow()
        || this.state.innerText !== this.getInnerText()) {
      this.setState({
        hasOverflow: this.checkOverflow(),
        innerText: this.getInnerText(),
      });
    }
    this.addHiddenOverflow();
  };

  getInnerText = () => (
    this.rootElement
      ? this.rootElement.textContent
      : null
  );

  checkOverflow = () => (
    this.rootElement
      ? this.rootElement.scrollWidth > this.rootElement.clientWidth
      : false
  );

  addHiddenOverflow = () => {
    const addOverflow = this.checkOverflow();
    if (addOverflow) {
      this.rootElement.firstChild.style.overflow = 'hidden';
    }
  }

  render() {
    const {
      color, children, customTextStyle, textOverflow,
    } = this.props;
    const { hasOverflow, innerText } = this.state;

    return (
      <PositionedParent>
        <EllipsisContainer
          innerRef={(ref) => { this.rootElement = ref; }}
        >
          <StyledSpan
            overflow={hasOverflow}
            textOverflow={textOverflow}
            customStyle={customTextStyle}
          >
            {children}
          </StyledSpan>
          {innerText && innerText.trim().length > 0 &&
            <Tooltip hidden color={color}>
                {children}
            </Tooltip>
          }
        </EllipsisContainer>
      </PositionedParent>
    );
  }
}

EllipisWithTooltip.propTypes = PropTypes.shape({
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
}).isRequired;

EllipisWithTooltip.defaultTypes = {
  color: '#555',
};

export default EllipisWithTooltip;
