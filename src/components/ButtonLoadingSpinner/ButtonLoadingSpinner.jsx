import { Spinner } from '@tonic-ui/react';
import PropTypes from 'prop-types';

const variantColorMap = {
  default: 'white:emphasis',
  primary: 'white:emphasis',
  emphasis: 'white:emphasis',
  secondary: 'blue:60',
  ghost: 'blue:60',
};

export default function ButtonLoadingSpinner({ variant, mr, ...rest }) {
  return <Spinner size="xs" lineColor={variantColorMap[variant]} mr={mr} {...rest} />;
}

ButtonLoadingSpinner.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'emphasis', 'secondary', 'ghost']),
  mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ButtonLoadingSpinner.defaultProps = {
  variant: 'default',
  mr: '2x',
};
