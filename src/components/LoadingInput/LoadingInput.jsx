import { Flex, Input, Spinner } from '@tonic-ui/react';

export default function LoadingInput(props) {
  return (
    <Flex position="relative" alignItems="center">
      <Flex
        align="center"
        position="absolute"
        left={0}
        px="2x"
        // The z-index value should be at least 3 for the prepeneded input adornment
        zIndex={3}
      >
        <Spinner size="xs" />
      </Flex>
      <Input px="8x" readOnly {...props} />
    </Flex>
  );
}
