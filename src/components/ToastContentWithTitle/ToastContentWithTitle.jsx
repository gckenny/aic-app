import { Box, Text } from '@tonic-ui/react';
import PropTypes from 'prop-types';

function ToastContentWithTitle({ title, text, ...rest }) {
  if (title && text) {
    return (
      <Box {...rest}>
        <Text display="block" fontWeight="bold" mt="1px" mb="2x">
          {title}
        </Text>
        <Text display="block" wordBreak="break-word" whiteSpace="normal" mr={-36}>
          {text}
        </Text>
      </Box>
    );
  }

  return (
    <Box {...rest}>
      <Text display="block" wordBreak="break-word" whiteSpace="normal" mt="1px">
        {title}
      </Text>
    </Box>
  );
}

ToastContentWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ToastContentWithTitle;
