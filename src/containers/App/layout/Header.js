import { Box, Flex, Icon, Text, useColorMode } from '@tonic-ui/react';
import { forwardRef } from 'react';

const Header = forwardRef((props, ref) => {
  const { selectedNavItem } = { ...props };
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:70',
  }[colorMode];
  const enterLocationName = {
    'ai-contest': 'AI Contest',
  }[selectedNavItem];

  return (
    <Box
      height="12x"
      width="100%"
      zIndex="fixed"
      backgroundColor={backgroundColor}
      borderBottom={1}
      borderBottomColor={borderColor}
      {...props}
    >
      <Flex position="relative" height="100%" alignItems="center">
        <Box flex="auto" fontSize="2xl" maxWidth="100%" px="4x">
          Bring Best Talents : Your Recruit Partner{' '}
          <Text size="sm" display="inline">
            {enterLocationName}
          </Text>
        </Box>
        <Flex flex="none" width="auto" align="center" px="4x">
          <Box
            as="a"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' && <Icon icon="moon" size="6x" />}
            {colorMode === 'dark' && <Icon icon="sun" size="6x" />}
          </Box>
          <Box display="inline-block" width="5x" />
        </Flex>
      </Flex>
    </Box>
  );
});

export default Header;
