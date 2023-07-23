import { Box, Spinner, useColorMode, useColorStyle } from '@tonic-ui/react';
import PropTypes from 'prop-types';

const Loader = ({ hideOverlay, size, ...rest }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      zIndex="overlay"
      bg={hideOverlay ? undefined : colorStyle.spinner.overlay.bg}
      cursor="wait"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Spinner size={size} lineWidth={size === 'sm' ? 3 : undefined} />
    </Box>
  );
};

Loader.propTypes = {
  hideOverlay: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

Loader.defaultProps = {
  size: 'md',
};

export default Loader;
