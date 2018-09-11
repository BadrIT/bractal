import PropTypes from 'prop-types';

const Wrapper = props => props.children;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func.isRequired,
};

export default Wrapper;
