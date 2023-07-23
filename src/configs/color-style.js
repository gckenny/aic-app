import { colorStyle as defaultColorStyle } from '@tonic-ui/react';

const colorStyle = {
  ...defaultColorStyle,
  dark: {
    ...defaultColorStyle.dark,
    scrollbar: {
      color: 'white:tertiary',
    },
    spinner: {
      overlay: {
        bg: 'black:secondary',
      },
    },
  },
  light: {
    ...defaultColorStyle.light,
    scrollbar: {
      color: 'black:tertiary',
    },
    spinner: {
      overlay: {
        bg: 'white:secondary',
      },
    },
  },
};

export default colorStyle;
