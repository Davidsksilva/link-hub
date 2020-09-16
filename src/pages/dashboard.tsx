import React from 'react';
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
} from '@chakra-ui/core';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';

import { useRouter } from 'next/router';
import avatarImg from '../assets/27-ninja.svg';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

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
                      onClick={() => router.push('/')}
                    >
                      <Box as={FiLogOut} mr={theme.space[2]} />
                      Log out
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>

              <Text color={theme.colors.white}>
                Hello, <strong>David</strong>
              </Text>
            </Flex>
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
