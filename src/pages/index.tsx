import React from 'react';
import Head from 'next/head';

import Link from 'next/link';
import {
  Button,
  useColorMode,
  Box,
  Flex,
  Text,
  useTheme,
} from '@chakra-ui/core';
import linkhubLogo from '../assets/link-hub-logo.png';
import { Header, Navigation } from '../styles/pages/Home';

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Link Hub</title>
      </Head>

      <main>
        <Box bg="gray.50" minHeight="100vh">
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
              <Link href="/login">
                <Button
                  variantColor={theme.colors.transparent}
                  variant="ghost"
                  color="white"
                  mr={theme.space[4]}
                  _hover={{ bg: theme.colors.cyan[500] }}
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variantColor={theme.colors.transparent}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: theme.colors.cyan[500] }}
                >
                  Register
                </Button>
              </Link>

              {/* <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button> */}
            </Box>
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Home;
