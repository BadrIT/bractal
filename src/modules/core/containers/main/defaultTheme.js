const Theme = {
  colors: {
    primary: '#33a8ff',
    primaryHover: '#63b8ff',
    primaryClicked: '#73c8ff',
    primaryDark: '#2c8bd2',
    secondary: '#fb9410',
    secondaryHover: '#fba420',
    secondaryClicked: '#fc9430',
    secondaryDark: '#cc790e',
    error: '#D32f2f',
    cellHoverColor: 'rgba(48, 157, 224, 0.1)',
    cellHoverColorAlt: 'rgba(48, 157, 224, 0.2)',
    link: '#fb9410',
    labels: {
      important: '#000000',
      normal: 'rgba(0, 0, 0, 0.5)',
      subtle: 'rgba(0, 0, 0, 0.35)',
      hint: 'rgba(0, 0, 0, 0.22)',
    },
    invertedLabels: {
      important: 'white',
      normal: 'rgba(255, 255, 255, 0.7)',
      subtle: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.3)',
    },
    named: {
      white: '#FFFFFF',
    },
  },
  fonts: {
    sizes: {
      xxxLarge: 48,
      xxLarge: 36,
      xLarge: 25,
      large: 18,
      medium: 16,
      small: 14,
      xSmall: 12,
      xxSmall: 11,
      xxxSmall: 9.5,
    },
  },
  paddings: {
    xxSmall: 1,
    xSmall: 2,
    small: 5,
    medium: 10,
    large: 15,
    xLarge: 20,
    xxLarge: 25,
    xxxLarge: 30,
    xxxxLarge: 35,
    xxxxxLarge: 40,
  },
  borders: {
    size: {
      thin: 1,
      normal: 2,
      bold: 3,
    },
    color: {
      light: 'rgba(0,0,0,0.1)',
      normal: 'rgba(0,0,0,0.3)',
      dark: 'rgba(0,0,0,0.5)',
    },
    radius: {
      small: 2,
      normal: 5,
      large: 10,
    },
  },
  inputs: {
    radius: 25,
    fontSize: 14,
    placeholderColor: 'rgba(0,0,0,0.22)',
    borderColor: 'rgba(0,0,0,0.22)',
    borderColorActive: '#33a8ff',
    color: 'rgba(0, 0, 0)',
    padding: {
      top: 12,
      bottom: 12,
      left: 15,
      right: 15,
    },
    borderWidth: 1,
  },
  buttons: {
    radius: 5,
    fontSize: 16,
    padding: 12,
    border: 1, // Only applicable in the inverted state
    disabled: {
      backgroundColor: {
        normal: '#999999',
        inverted: '#cccccc',
      },
    },
  },
};

module.exports = Theme;
