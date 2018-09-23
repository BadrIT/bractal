import { keyframes, css } from 'styled-components';

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
  background: ${props => props.color || props.theme.new.alertTypes.colors.default};
`;
export const infoColor = css`
  background: ${props => props.color || props.theme.new.alertTypes.colors.info};
`;
export const errorColor = css`
  background: ${props => props.color || props.theme.new.alertTypes.colors.error};
`;
export const warningColor = css`
  background: ${props => props.color || props.theme.new.alertTypes.colors.warning};
`;
export const successColor = css`
  background: ${props => props.color || props.theme.new.alertTypes.colors.success};
`;
export const Wrapper = css`
  width: 100%;
  ${props => !props.topFullWidth && `
    display: flex;
    justify-content: flex-end;
    bottom: 0;
  `}
  color: ${props => props.theme.colors.named.white};
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
  position: relative;
  padding: ${props => 0.2 * props.theme.new.spacer}px;
  ${props => !props.topFullWidth && `
    margin: ${2 * props.theme.new.spacer}px;
  `}
  display: flex;
  cursor: pointer; 
`;
export const ToastBody = css`
  flex: 1;
  font-size: ${props => props.fontSize || props.theme.new.fonts.sizes.md}px; 
  margin-right: 10px;
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
  font-size: ${props => 1.2 * props.fontSize || 18}px;
  &:hover, &:focus {
    opacity: 1;
  }
`;
