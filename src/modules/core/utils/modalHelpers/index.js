import { isOnInternetExplorerEdge } from '~/modules/core/utils/jsHelpers/userAgentDetector';

const modalMarker = '/__modal';

export const isLocationModal = (location) => {
  const modalMarkerIndex = location.pathname.search(modalMarker);
  if (modalMarkerIndex >= 0) {
    return true;
  }
  return false;
};

export const scrollCurrentModalToTop = () => {
  if (isOnInternetExplorerEdge()) {
    // scroll method isn't defined on Edge
    document.getElementsByClassName('ReactModal__Content')[0].scrollTop = 0;
  } else {
    document.getElementsByClassName('ReactModal__Content')[0].scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

export const extractModalPartFromLocation = (location) => {
  const currentPath = location.pathname;
  const modalMarkerIndex = currentPath.search(modalMarker);
  const modifiedCurrentPath = modalMarkerIndex >= 0
    ? currentPath.substring(modalMarkerIndex, currentPath.length)
    : currentPath;

  return {
    ...location,
    pathname: modifiedCurrentPath,
  };
};

export const removeModalPartFromLocation = (location) => {
  const currentPath = location.pathname;
  const modalMarkerIndex = currentPath.search(modalMarker);
  const modifiedCurrentPath = modalMarkerIndex >= 0
    ? currentPath.substring(0, modalMarkerIndex)
    : currentPath;

  return {
    ...location,
    pathname: modifiedCurrentPath,
  };
};

export const makeModalFullPath = (location, path) => {
  // TODO: Generalize more, by double checking on the path's
  //      format (removing extra '/' or adding missing ones)
  const cleanedLocation = removeModalPartFromLocation(location, path);
  let { pathname } = cleanedLocation;
  const lastChar = pathname.charAt(pathname.length - 1);
  if (lastChar === '/') {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  const res = `${pathname}${modalMarker}${path}`;
  return res;
};

export const navigateToModal = (location, history, path) => {
  // TODO: Generalize more, by double checking on the path's
  //      format (removing extra '/' or adding missing ones)
  const fullpath = makeModalFullPath(location, path);
  history.replace(fullpath);
};

export const closeCurrentModal = (location, history) => {
  const isModal = isLocationModal(location);
  if (!isModal) {
    return;
  }

  const cleanedLocation = removeModalPartFromLocation(location);

  history.replace(cleanedLocation.pathname);
};

export const makeModalPath = path => (
  // TODO: Generalize more, by double checking on the path's
  //      format (removing extra '/' or adding missing ones)
  `${modalMarker}${path}`
);
