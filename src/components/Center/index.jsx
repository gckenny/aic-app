import { Box } from '@tonic-ui/react';
import PropTypes from 'prop-types';

function Center({ className, horizontal, vertical, stretched, ...rest }) {
  return (
    <Box
      display={horizontal || vertical ? 'flex' : 'block'}
      alignItems={vertical && 'center'}
      justifyContent={horizontal && 'center'}
      position={stretched && 'absolute'}
      top={stretched && 0}
      left={stretched && 0}
      bottom={stretched && 0}
      right={stretched && 0}
      {...rest}
    />
  );
}

Center.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  stretched: PropTypes.bool,
};

export default Center;
