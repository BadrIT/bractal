const Theme = {
  new: {
    inputs: {
      focusBorderColor: {
        primary: '#0065b3',
        secondary: '#e28203',
      },
    },
    colors: {
      buttons: {
        primary: {
          background: '#33a8ff',
          backgroundinverted: '#FFFFFF',
          line: '#FFFFFF',
          lineInverted: '#33a8ff',
        },
        secondary: {
          background: '#fb9410',
          backgroundinverted: '#FFFFFF',
          line: '#FFFFFF',
          lineInverted: '#fb9410',
        },
        passive: {
          background: '#e5e5e5',
          backgroundinverted: '#FFFFFF',
          line: 'rgba(0, 0, 0, 0.7)',
          lineInverted: '#aaaaaa',
        },
        disabled: {
          background: '#aaaaaa',
          backgroundinverted: '#FFFFFF',
          line: '#FFFFFF',
          lineInverted: '#aaaaaa',
        },
      },
      labels: {
        normal: {
          primary: '#33a8ff',
          secondary: '#fb9410',
          important: '#000000',
          emphasized: 'rgba(0, 0, 0, 0.7)',
          normal: 'rgba(0, 0, 0, 0.5)',
          subtle: 'rgba(0, 0, 0, 0.35)',
          hint: 'rgba(0, 0, 0, 0.22)',
          error: '#d32f2f',
        },
        inverted: {
          primary: 'white',
          secondary: 'white',
          important: 'white',
          emphasized: 'rgba(255, 255, 255, 0.7)',
          normal: 'rgba(255, 255, 255, 0.5)',
          subtle: 'rgba(255, 255, 255, 0.4)',
          hint: 'rgba(255, 255, 255, 0.3)',
          error: 'red',
        },
      },
      panels: {
        background: '#f9f9f9',
      },
      named: {
        primary: '#33a8ff',
        secondary: '#fb9410',
        error: '#d32f2f',
        info: '#5c9ec0',
        success: '#7CB342',
        warning: '#FFB300',
        default: '#708090',
        inverted: '#FFFFFF',
      },
    },
    spacer: 10,
    fonts: {
      sizes: {
        header: 36,
        xxl: 25,
        xl: 20,
        lg: 18,
        md: 16,
        sm: 14,
        xs: 12,
      },
      weights: {
        extraBold: 900,
        bold: 700,
        semiBold: 600,
        regular: 400,
        normal: 'normal',
      },
    },
  },
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
      light: 'rgba(0,0,0,0.3)',
      normal: 'rgba(0,0,0,0.5)',
      dark: 'rgba(0,0,0,0.8)',
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
