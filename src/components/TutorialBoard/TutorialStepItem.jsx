import { Box, Flex, Tooltip } from '@tonic-ui/react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { Text } from './components/tonicUI';
import i18n from 'app/libs/i18n';

const TutorialStepItem = ({
  children,
  isPreviousStepActive,
  stepNumber,
  cursor,
  label,
  isActive,
  icon,
  isHoverChangeColor,
  onClick,
  ...rest
}) => {
  const stepItem = useMemo(
    () => (
      <Flex
        align="center"
        pl="7x"
        pr="3x"
        py={14}
        fontSize="sm"
        borderTop={isActive || isPreviousStepActive ? 0 : 1}
        borderBottom={isActive ? 0 : 1}
        borderColor="gray:20"
        mb={isActive ? 0 : -1}
        height={50}
        color={isActive ? 'white:emphasis' : 'black:emphasis'}
        background={isActive ? 'linear-gradient(89.91deg, #8F41E9, #578AEF)' : 'white'}
        _hover={!isActive && isHoverChangeColor && { color: 'blue:60' }}
        cursor={cursor}
        onClick={onClick}
        {...rest}
      >
        {!!stepNumber && (
          <Text mr="2x">{i18n._('{{STEP_NUMBER}}. ', { STEP_NUMBER: stepNumber })}</Text>
        )}
        <Box display="inline-block" verticalAlign="middle">
          {children}
        </Box>
        {!!icon && (
          <Box verticalAlign="middle" ml="auto">
            {icon}
          </Box>
        )}
      </Flex>
    ),
    [
      children,
      cursor,
      isActive,
      isHoverChangeColor,
      isPreviousStepActive,
      icon,
      onClick,
      rest,
      stepNumber,
    ]
  );

  if (label) {
    return (
      <Tooltip label={label} placement="right" color="black:primary">
        {stepItem}
      </Tooltip>
    );
  } else {
    return stepItem;
  }
};

TutorialStepItem.propTypes = {
  children: PropTypes.node.isRequired,
  isPreviousStepActive: PropTypes.bool,
  stepNumber: PropTypes.number,
  cursor: PropTypes.string,
  label: PropTypes.node,
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  isHoverChangeColor: PropTypes.bool,
  onClick: PropTypes.func,
};

export default TutorialStepItem;
