import { Box, useTheme } from '@chakra-ui/core';
import React from 'react';
import { useTransition } from 'react-spring';

import { AlertMessage } from '../../hooks/alert';
import Alert from './Alert';

interface AlertContainerProps {
  messages: AlertMessage[];
}

const AlertContainer: React.FC<AlertContainerProps> = ({ messages }) => {
  const theme = useTheme();

  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  return (
    <Box
      padding={theme.space[32]}
      overflow="hidden"
      right={0}
      top={0}
      position="absolute"
    >
      {messagesWithTransitions.map(({ item, key }) => (
        <Alert key={key} message={item} />
      ))}
    </Box>
  );
};

export default AlertContainer;
