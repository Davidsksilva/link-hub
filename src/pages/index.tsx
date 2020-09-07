import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  Box,
  Flex,
  Text,
  useTheme,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Heading,
  Stack,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Email required'),
  password: Yup.string().required('Password required'),
});

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
            <Text color={theme.colors.white} fontSize={theme.fontSizes['2xl']}>
              link-hub
            </Text>
            <Box>
              <Link href="/login">
                <Button
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
                  variant="ghost"
                  color="white"
                  _hover={{ bg: theme.colors.cyan[500] }}
                >
                  Register
                </Button>
              </Link>
            </Box>
          </Flex>

          <Flex direction="row" align="center" justify="center" flex="1">
            <Flex direction="column" minW={320}>
              <Heading>Sign in</Heading>
              <Formik
                initialValues={{ email: '', password: '' }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={SignInSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {(props) => (
                  <form
                    onSubmit={props.handleSubmit}
                    style={{ marginTop: theme.space[6] }}
                  >
                    <Field name="email" re>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email">Email address</FormLabel>
                          <Input
                            {...field}
                            focusBorderColor={theme.colors.cyan[500]}
                            id="email"
                            placeholder="Enter email address"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          mt={theme.space[4]}
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input
                            focusBorderColor={theme.colors.cyan[500]}
                            {...field}
                            id="password"
                            placeholder="Enter password"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      mt={theme.space[6]}
                      isFullWidth
                      variantColor="cyan"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </form>
                )}
              </Formik>
            </Flex>
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Home;
