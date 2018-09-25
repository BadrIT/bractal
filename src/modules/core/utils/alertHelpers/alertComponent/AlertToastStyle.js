import { keyframes, css } from 'styled-components';
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
export const defaultColor = css`
  background: ${props => props.backgroundColor || props.theme.new.alertTypes.colors.default};
`;
export const infoColor = css`
  background: ${props => props.backgroundColor || props.theme.new.alertTypes.colors.info};
`;
export const errorColor = css`
  background: ${props => props.backgroundColor || props.theme.new.alertTypes.colors.error};
`;
export const warningColor = css`
  background: ${props => props.backgroundColor || props.theme.new.alertTypes.colors.warning};
`;
export const successColor = css`
  background: ${props => props.backgroundColor || props.theme.new.alertTypes.colors.success};
`;
export const Wrapper = css`
  width: 100%;
    ${props => !props.topFullWidth && `
    display: flex;
    justify-content: flex-end;
    bottom: 0;
  `}
  color: ${props => props.color || props.theme.colors.named.white};
  opacity: ${props => props.opacity || '0.85'};
  animation-duration: 1s;
  .default {
    ${defaultColor}
  }
  .info {
    ${infoColor}
  }
  .success {
    ${successColor}
  }
  .warning {
    ${warningColor}
  }
  .error {
    ${errorColor}
  }
`;

export const Toast = css`
  display: flex;
  position: relative;
  padding: ${props => inferePaddingSize(props)}px;
  ${props => !props.topFullWidth && `
    margin: ${2 * props.theme.new.spacer}px;
  `}
  cursor: pointer; 
`;
export const ToastBody = css`
  margin-right: ${props => 3 * props.theme.new.spacer}px;
  margin-left: ${props => props.theme.new.spacer}px;
  flex: 1;
  font-size: ${props => infereFontSize(props)}px;
`;
export const ToastCloseButton = css`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  align-self: flex-start;
  color: ${props => props.theme.colors.named.white};
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  font-size: ${props => 1.2 * infereFontSize(props)}px;
  &:hover, &:focus {
    opacity: 1;
  }
`;
