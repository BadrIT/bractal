import { keyframes } from 'react-emotion';
import { css } from 'emotion';
import { infereFontSize, inferePaddingSize } from '~/modules/coreUI/utils/infereStyle';

export const trackProgress = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
`;

export const slidein = keyframes`
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

export const slideout = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
`;
export const defaultColor = props => css`
  background: ${props.backgroundColor || props.theme.new.colors.named.default};
`;
export const infoColor = props => css`
  background: ${props.backgroundColor || props.theme.new.colors.named.info};
`;
export const errorColor = props => css`
  background: ${props.backgroundColor || props.theme.new.colors.named.error};
`;
export const warningColor = props => css`
  background: ${props.backgroundColor || props.theme.new.colors.named.warning};
`;
export const successColor = props => css`
  background: ${props.backgroundColor || props.theme.new.colors.named.success};
`;

export const bottomRight = props => (css`
  right: ${2 * props.theme.new.spacer}px;
  bottom: ${props.theme.new.spacer}px;
  width: fit-content;
`);
export const Wrapper = props => css`
  ${(props.topFullWidth ? (
    css`
      width: 100%;
    `
  ) : (
    bottomRight(props)

  ))}
  color: ${props.color || props.theme.colors.named.white};
  opacity: ${props.opacity || '0.85'};
  animation-duration: 1s;
  .default {
    ${defaultColor(props)}
  }
  .info {
    ${infoColor(props)}
  }
  .success {
    ${successColor(props)}
  }
  .warning {
    ${warningColor(props)}
  }
  .error {
    ${errorColor(props)}
  }
`;

export const Toast = props => css`
  display: flex;
  padding: ${inferePaddingSize(props)}px;
  margin-bottom: ${props.theme.new.spacer}px;
  cursor: pointer; 
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
`;
export const ToastBody = props => css`
  margin-right: ${3 * props.theme.new.spacer}px;
  margin-left: ${props.theme.new.spacer}px;
  flex: 1;
  font-size: ${infereFontSize(props)}px;
`;
export const ToastCloseButton = props => css`
  display: flex;
  position: relative;
  align-self: flex-start;
  color: ${props.theme.colors.named.white};
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  font-size: ${infereFontSize(props)}px;
  &:hover, &:focus {
    opacity: 1;
  }
`;
