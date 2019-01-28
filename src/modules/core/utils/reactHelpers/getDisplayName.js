export default (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
