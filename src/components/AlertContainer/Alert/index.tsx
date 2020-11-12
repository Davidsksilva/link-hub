import React from 'react';
import { Alert as ChakraAlert, AlertIcon } from '@chakra-ui/core';
import { AlertMessage } from '../../../hooks/alert';

interface AlertProps {
  message: AlertMessage;
}

const Alert: React.FC<AlertProps> = ({ message }) => (
  <ChakraAlert>
    <AlertIcon>{message.title}</AlertIcon>
  </ChakraAlert>
);

export default Alert;
