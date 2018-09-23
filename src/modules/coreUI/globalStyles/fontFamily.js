import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    font-family: Panton;
    src: url("../../assets/fonts/Panton/Panton-Regular.otf");
  }
  @font-face {
    font-family: Frutiger;
    src: url("../../assets/fonts/FrutigerLTArabic/FrutigerLTArabic-55Roman.ttf");
  }
  @font-face {
    font-family: HelveticaNeue;
    src: url("../../assets/fonts/HelveticaNeue/HelveticaNeueLTPro-Roman-Edited.otf");
  }
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  html {
    font-size: 16px !important;
  }
  body,
  .ui.menu,
  .ui.header,
  button,
  input,
  optgroup,
  select,
  textarea,
  span {
    font-family: 'Open Sans', sans-serif;
  }
  .ar {
    font-family: Frutiger, sans-serif;
  }

  input {
    line-height: 1.3; /* Workaround for the vertical alignment of text on safari */
  }
`;
