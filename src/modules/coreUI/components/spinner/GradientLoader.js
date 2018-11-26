import styled, { keyframes } from 'styled-components';

const PlaceHolderShimmer = keyframes`
  0%{
    background-position: -468px 0
  }
  100%{
    background-position: 468px 0
  }
`;

const AnimatedBackground = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${PlaceHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: ${props => props.height}
  width: ${props => props.width}
  position: relative;
`;

export default AnimatedBackground;
