import { Box } from '@tonic-ui/react';
import PropTypes from 'prop-types';

export default function Line({ orientation, length, color, variant, lineWidth, ...rest }) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <Box
      display="inline-block"
      h={isHorizontal ? 0 : length}
      w={!isHorizontal ? 0 : length}
      verticalAlign="middle"
      borderTop={isHorizontal && `${lineWidth} ${variant}`}
      borderLeft={!isHorizontal && `${lineWidth} ${variant}`}
      borderColor={color}
      {...rest}
    />
  );
}

Line.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  length: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
  lineWidth: PropTypes.string,
};

Line.defaultProps = {
  orientation: 'horizontal',
  length: '2x',
  color: 'gray:70',
  variant: 'solid',
  lineWidth: '1px',
};
