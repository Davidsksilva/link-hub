import React, { useState } from 'react';
import Head from 'next/head';
import {
  useTheme,
  Flex,
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Link as ChakraLink,
  Divider,
  Heading,
  IconButton,
  Tooltip,
} from '@chakra-ui/core';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiLogOut, FiLink, FiPlus } from 'react-icons/fi';

import { useRouter } from 'next/router';
import avatarImg from '../assets/27-ninja.svg';
import { useAuth } from '../hooks/auth';
import AddLinkModal from '../components/AddLinkModal';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);

  function handleSignOut() {
    signOut();
    router.push('/');
  }

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
            bg={theme.colors.cyan[500]}
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

            <Flex dir="row" align="center">
              <Menu>
                <MenuButton as={Box}>
                  <Avatar
                    name="David Simon"
                    src={avatarImg}
                    size="md"
                    showBorder
                    bg={theme.colors.gray[300]}
                    borderColor={theme.colors.cyan[700]}
                    borderWidth={4}
                    mr={theme.space[2]}
                  />
                </MenuButton>
                <MenuList bg={theme.colors.white} boxShadow={theme.shadows.md}>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem
                      color={theme.colors.red[500]}
                      onClick={handleSignOut}
                    >
                      <Box as={FiLogOut} mr={theme.space[2]} />
                      Log out
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>

              <Text color={theme.colors.white}>
                Hello,
                <strong>
                  {' '}
                  {user.name}
                </strong>
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            mt={theme.space[10]}
          >
            <Flex
              maxW="sm"
              borderWidth="1px"
              rounded="lg"
              overflow="hidden"
              direction="row"
              align="center"
              padding={theme.space[4]}
              h={80}
              w={160}
            >
              <Box
                fontWeight={theme.fontWeights.semibold}
                mr={theme.space[2]}
                fontSize={theme.fontSizes['3xl']}
              >
                0
              </Box>
              links
            </Flex>

            <Flex
              ml={theme.space[6]}
              maxW="sm"
              borderWidth="1px"
              rounded="lg"
              overflow="hidden"
              direction="row"
              align="center"
              padding={theme.space[4]}
              h={80}
              w={160}
            >
              <Box
                fontWeight={theme.fontWeights.semibold}
                mr={theme.space[2]}
                fontSize={theme.fontSizes['3xl']}
              >
                0%
              </Box>
              visited
            </Flex>
          </Flex>

          <Flex direction="column" align="center" mt={theme.space[4]}>
            <Box maxWidth={800} width="100%" mb={theme.space[4]}>
              <Flex direction="row" align="center" justify="space-between">
                <Heading as="h3" size="lg" color={theme.colors.gray[600]}>
                  Listing all
                </Heading>
              </Flex>

              <Divider />
            </Box>

            <Flex
              bg={theme.colors.gray[100]}
              padding={theme.space[2]}
              direction="row"
              align="center"
              rounded="md"
            >
              <Box
                as={FiLink}
                mr={theme.space[2]}
                color={theme.colors.gray[400]}
              />
              <ChakraLink href="https://alexgolec.dev/google-interview-questions-deconstructed-the-knights-dialer/">
                https://alexgolec.dev/google-interview-questions-deconstructed-the-knights-dialer/
              </ChakraLink>
            </Flex>
          </Flex>
        </Box>

        <AddLinkModal isOpen={addLinkModalOpen} onClose={() => setAddLinkModalOpen(false)} />

        <Box
          position="absolute"
          right={theme.space[4]}
          bottom={theme.space[4]}
        >
          <Tooltip label="Add a link" aria-label="Add link">
            <IconButton
              size="lg"
              variantColor="cyan"
              aria-label="Add link"
              fontSize="32px"
              icon={FiPlus}
              onClick={() => setAddLinkModalOpen(true)}
            />
          </Tooltip>
        </Box>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), {
  ssr: false,
});
