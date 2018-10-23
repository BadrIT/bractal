import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import styled from 'react-emotion';
import assert from '~/modules/core/utils/jsHelpers/assert';

const ScrollButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background: white;
  padding: 14px;
  opacity: 1;
  left: 0;
  z-index: 1;
`;

function elementInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let element = el;
  const width = el.offsetWidth;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }
  return (
    top + 48 >= (window.pageYOffset + window.innerHeight) &&
    left >= window.pageXOffset &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    showOverlay: true,
  };

  componentDidMount = () => {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const el = ReactDOM.findDOMNode(this.contentRef);
    this.setState({
      showOverlay: elementInViewport(el),
    });
  }

  render = () => {
    assert(
      !_.isArray(this.props.children) && React.isValidElement(this.props.children),
      'Children of the StickyBottom, has to be one-and-only-one valid React element',
    );
    const element = React.cloneElement(
      this.props.children,
      {
        onRef: (ref) => { this.contentRef = ref; },
      },
    );

    return (
      <React.Fragment>
        {this.state.showOverlay &&
          <ScrollButtonWrapper>
            {this.props.children}
          </ScrollButtonWrapper>
        }
        {element}
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
