import { Box, useColorMode, useColorStyle } from '@tonic-ui/react';
import { forwardRef, useCallback } from 'react';
import { Scrollbars as CustomScrollbars } from 'react-custom-scrollbars';

const Scrollbars = forwardRef(({ style, ...rest }, ref) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  const renderThumb = useCallback(
    ({ style, ...props }) => <Box borderRadius="lg" bg={colorStyle.scrollbar.color} {...props} />,
    [colorStyle]
  );

  return (
    <CustomScrollbars
      ref={ref}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      style={{ ...style, overflow: 'hidden' }}
      {...rest}
    />
  );
});

export default Scrollbars;
