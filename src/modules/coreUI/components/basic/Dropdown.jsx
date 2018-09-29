import React from 'react';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { SmallLabel } from '~/modules/coreUI/components/basic/Labels';

const DropdownImage = styled.img`
  width: ${props => props.theme.fonts.sizes.large}px;
  height: ${props => props.theme.fonts.sizes.large}px;
`;

const TriggerLabel = styled(SmallLabel)`
  ${props => props.customStyles && props.customStyles(props)};
`;

const StyledSemanticDropdown = styled(SemanticDropdown)`
  &&&{
    display: flex;
    align-items: center;
    .chevron {
      display: flex;
      align-items: center;
    }
  }
`;

class Dropdown extends React.Component {
  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.selectedValue !== state.selectedValueExternal) {
      return {
        selectedValueInternal: nextProps.selectedValue,
        selectedValueExternal: nextProps.selectedValue,
      };
    }
    return null;
  }

  state = {
    selectedValueInternal: null,
    // eslint-disable-next-line react/no-unused-state
    selectedValueExternal: null,
  };

  getSelectedOption = (options) => {
    const { selectedValueInternal } = this.state;
    if (options && options.length > 0) {
      if (!selectedValueInternal) {
        // eslint-disable-next-line prefer-destructuring
        return options[0];
      }

      return options.find(option => option.value === selectedValueInternal);
    }

    return { text: '', image: '' };
  }

  triggerInternal = (trigger, options, customTriggerLabelStyles) => {
    const selectedOption = this.getSelectedOption(options);

    if (trigger) {
      return trigger(selectedOption);
    }

    return (
      <Row centerAligned>
        {selectedOption.image &&
          <React.Fragment>
            <DropdownImage
              src={selectedOption.image && selectedOption.image.src}
            />
            <Spacer />
          </React.Fragment>
        }
        <TriggerLabel customStyles={customTriggerLabelStyles}>
          {selectedOption.text}
        </TriggerLabel>
      </Row>
    );
  }

  handleChange = (value, onChange) => {
    this.setState({
      selectedValueInternal: value,
    });

    if (onChange) {
      onChange(value);
    }
  }

  render = () => {
    const { selectedValueInternal } = this.state;
    const {
      trigger,
      pointing,
      icon,
      options,
      onChange,
      customTriggerLabelStyles,
    } = this.props;

    return (
      <div>
        <StyledSemanticDropdown
          trigger={this.triggerInternal(trigger, options, customTriggerLabelStyles)}
          pointing={pointing || 'top center'}
          icon={{ className: 'icon-down-open' } || icon}
          options={options}
          value={selectedValueInternal}
          onChange={(e, { value }) => this.handleChange(value, onChange)}
        />
      </div>
    );
  };
}

Dropdown.propTypes = PropTypes.shape({
  optoins: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  }).isRequired,
  trigger: PropTypes.element,
  pointing: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  customTriggerLabelStyles: PropTypes.shape({}),
}).isRequired;

export default Dropdown;
