import React from 'react';
import Head from 'next/head';
import { useTheme, Flex, Box, Button, Text } from '@chakra-ui/core';
import Link from 'next/link';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Link Hub</title>
      </Head>

      <main>
        <Box
          bg="gray.50"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
        >
          <Flex
            as="header"
            bg="cyan.600"
            height="60px"
            direction="row"
            align="center"
            justify="space-between"
            px="5"
          >
            <Link href="/">
              <Text
                color={theme.colors.white}
                userSelect="none"
                fontSize={theme.fontSizes['2xl']}
                cursor="pointer"
              >
                link-hub
              </Text>
            </Link>

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

              <Link href="/signup">
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{ bg: theme.colors.cyan[500] }}
                >
                  Sign up
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Home;
