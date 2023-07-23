import { Global, css } from '@emotion/react';
import { Box, TonicProvider, useColorMode, useColorStyle, useTheme } from '@tonic-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import colorStyle from './configs/color-style';
import App from './containers/App';

import theme from './configs/theme';

const Layout = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const { fontSizes, lineHeights } = useTheme();

  return (
    <>
      <Global
        styles={css`
          :root {
            color-scheme: ${colorMode};
          }
          body {
            font-size: ${fontSizes.sm};
            line-height: ${lineHeights.sm};
          }
        `}
      />
      <Box
        backgroundColor={colorStyle.background.primary}
        color={colorStyle.text.primary}
        fontSize="sm"
        lineHeight="sm"
        height="100vh"
        {...props}
      />
    </>
  );
};

export const ThemedApp = (props) => (
  <TonicProvider
    colorMode={{
      defaultValue: 'dark',
    }}
    colorStyle={{ value: colorStyle }}
    theme={theme}
    useCSSBaseline
  >
    <Layout>
      <App {...props} />
    </Layout>
  </TonicProvider>
);

const container = document.querySelector('#viewport');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>
);
