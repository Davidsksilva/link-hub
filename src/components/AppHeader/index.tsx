import React from 'react';
import { Flex, Box, Button, useTheme, Text } from '@chakra-ui/core';
import Link from 'next/link';

const AppHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <Flex
      as="header"
      bg="cyan.600"
      height="60px"
      direction="row"
      align="center"
      justify="space-between"
      px="5"
    >
      <Text color={theme.colors.white} fontSize={theme.fontSizes['2xl']}>
        link-hub
      </Text>
      <Box>
        <Link href="/signin">
          <Button
            variant="ghost"
            color="white"
            mr={theme.space[4]}
            _hover={{ bg: theme.colors.cyan[500] }}
          >
            Sign in
          </Button>
        </Link>

        <Link href="/register">
          <Button
            variant="ghost"
            color="white"
            _hover={{ bg: theme.colors.cyan[500] }}
          >
            Register
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default AppHeader;
