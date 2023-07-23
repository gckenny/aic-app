import { theme } from '@tonic-ui/react';

const customizedTheme = {
  ...theme,
  zIndices: {
    ...theme.zIndices,
    overPendoGuide: 300001, // XXX: Pendo guide's z-index is 300000.
  },
};

export default customizedTheme;
