/* eslint-disable no-param-reassign */
export const LAYOUT_HEADER = 'LayoutHeader';
export const LAYOUT_PAGE_CONTENT = 'LayoutPageContent';
export const LAYOUT_SIDE_MENU = 'LayoutSideMenu';

export const setRoleAsLayoutHeader = (Type) => { Type.layoutRole = LAYOUT_HEADER; };
export const setRoleAsLayoutPageContent = (Type) => { Type.layoutRole = LAYOUT_PAGE_CONTENT; };
export const setRoleAsLayoutSideMenu = (Type) => { Type.layoutRole = LAYOUT_SIDE_MENU; };

const getElementWithRole = (elements, Role) =>
  elements.find(element => element.type && element.type.layoutRole === Role);

export const getLayoutHeader = elements => getElementWithRole(elements, LAYOUT_HEADER);
export const getLayoutPageContent = elements => getElementWithRole(elements, LAYOUT_PAGE_CONTENT);
export const getLayoutSideMenu = elements => getElementWithRole(elements, LAYOUT_SIDE_MENU);
