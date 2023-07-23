import { Box, ButtonBase, Collapse, Flex, Icon } from '@tonic-ui/react';
import PropTypes from 'prop-types';

import { Text } from './components/tonicUI';
import { GradientRocketIcon } from 'app/containers/EndpointPolicy/components/CustomIcons';
import useDisclosure from 'app/hooks/useDisclosure';

import TutorialStepItem from './TutorialStepItem';

export default function TutorialBoard({
  title,
  steps,
  additionalInfo,
  additionalInfoWithoutIcon,
  isHideToggleButton,
}) {
  const { isOpen: isCollapsed, onToggle: toggleCollapse } = useDisclosure();

  return (
    <Box width={400} borderRadius="md" bg="gray:10" overflow="hidden">
      <Box px="4x" py="4x" color="black:primary">
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <GradientRocketIcon />
            <Text fontSize="md" ml="2x">
              {title}
            </Text>
          </Flex>
          <ButtonBase onClick={toggleCollapse}>
            {!isHideToggleButton && (
              <Icon icon={isCollapsed ? 'chevron-down' : 'chevron-up'} size="4x" />
            )}
          </ButtonBase>
        </Flex>
      </Box>

      <Box>
        {steps.map((step, index) => {
          const { content, id, ...restStepProps } = step;
          const isFirstStep = index === 0;
          return (
            <Collapse key={id} in={!isCollapsed}>
              <TutorialStepItem
                stepNumber={index + 1}
                isPreviousStepActive={!isFirstStep && !!steps[index - 1]?.isActive}
                {...restStepProps}
              >
                {content}
              </TutorialStepItem>
            </Collapse>
          );
        })}
      </Box>

      {additionalInfo && (
        <Collapse in={!isCollapsed}>
          <Box bg="white:secondary" borderTop={1} borderColor="gray:20" px="4x" py="2x">
            <Flex>
              {!additionalInfoWithoutIcon && (
                <Icon icon="light2-o" my="1x" mr="2x" color="black:primary" />
              )}
              {additionalInfo}
            </Flex>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

TutorialBoard.propTypes = {
  title: PropTypes.node.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      cursor: PropTypes.string,
      label: PropTypes.node,
      isActive: PropTypes.bool,
      icon: PropTypes.node,
      isHoverChangeColor: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ).isRequired,
  additionalInfo: PropTypes.node,
  isHideToggleButton: PropTypes.bool,
};
