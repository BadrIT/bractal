import styled from 'react-emotion';
import { Tab as InnerTab, Tabs as InnerTabs, TabList as InnerTabList, TabPanel as InnerTabPanel } from 'react-tabs';
import withOmitedProps from '~/modules/core/utils/cssHelpers/withOmitedProps';

export const Tab = styled(withOmitedProps(InnerTab, ['styles', 'activeStyles']))`
  display: inline-block;

  padding-right: ${props => props.theme.paddings.xLarge}px;
  padding-left: ${props => props.theme.paddings.xLarge}px;
  padding-top: ${props => props.theme.paddings.medium + 1}px;
  padding-bottom: ${props => props.theme.paddings.medium + 1}px;

  margin: 0px;
  margin-right: ${props => props.theme.new.spacer * 0.25}px;
  margin-left: ${props => props.theme.new.spacer * 0.25}px;

  background-color: ${props => props.theme.colors.named.grey};

  border-top-left-radius: ${props => props.theme.borders.radius.normal}px;
  border-top-right-radius: ${props => props.theme.borders.radius.normal}px;

  font-size: ${props => props.theme.fonts.sizes.xLarge}px;
  color: ${props => props.theme.colors.labels.emphasized};

  &:hover {
    cursor: pointer;
  }

  &.react-tabs__tab--selected {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fonts.weights.semiBold};
    background-color: ${props => props.theme.colors.named.extraLightGrey};
    ${props => props.activeStyles && props.activeStyles(props)};
  }

  ${props => props.styles && props.styles(props)};
`;
Tab.tabsRole = 'Tab';

export const TabList = styled(withOmitedProps(InnerTabList, ['styles']))`
  margin: 0px;
  
  text-align: center;
  
  list-style-type: none;
  
  ${props => props.styles && props.styles(props)};
`;
TabList.tabsRole = 'TabList';

export const TabPanel = styled(withOmitedProps(InnerTabPanel, ['styles', 'activeStyles']))`
  &.react-tabs__tab-panel--selected {
    background-color: ${props => props.theme.colors.named.extraLightGrey};
    ${props => props.activeStyles && props.activeStyles(props)};
  }
  margin-top: 0;

  ${props => props.styles && props.styles(props)};
`;
TabPanel.tabsRole = 'TabPanel';

export const Tabs = styled(withOmitedProps(InnerTabs, ['styles']))`
  ${props => props.styles && props.styles(props)};
`;
Tabs.tabsRole = 'Tabs';
