import React from 'react';
import Head from 'next/head';
import {
  useTheme,
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Stack,
  useToast,
} from '@chakra-ui/core';
import { Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import api from '../services/api';

interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  username: string;
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required('Email required'),
  password: Yup.string()
    .min(6, 'Password should have at least 6 characters')
    .required('Password required'),
  passwordConfirmation: Yup.string()
    .required('Password confirmation required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  name: Yup.string().required('Name required'),
  username: Yup.string().required('Username required'),
});

const SignUp: React.FC = () => {
  const toast = useToast();
  const theme = useTheme();

  const initialValues: SignUpData = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    username: '',
  };

  async function handleSignUp(
    { email, password, name }: SignUpData,
    { setSubmitting }: FormikHelpers<SignUpData>,
  ) {
    try {
      await api.post('/users', { email, password, name });
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    } catch (err) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
            bg={theme.colors.transparent}
            height="60px"
            direction="row"
            align="center"
            justify="space-between"
            px="5"
          >
            <Link href="/">
              <Text
                cursor="pointer"
                userSelect="none"
                color={theme.colors.cyan[500]}
                fontSize={theme.fontSizes['2xl']}
              >
                link-hub
              </Text>
            </Link>

            <Box>
              Already have an account?
              <Link href="/signin">
                <Button
                  variantColor="cyan"
                  variant="outline"
                  ml={theme.space[4]}
                >
                  Sign in
                </Button>
              </Link>
            </Box>
          </Flex>
          <Flex direction="row" align="center" justify="center" flex="1">
            <Flex direction="column" minW={380}>
              <Heading color={theme.colors.gray[600]}>Sign up</Heading>
              <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={SignUpSchema}
                onSubmit={handleSignUp}
              >
                {(props) => (
                  <form
                    onSubmit={props.handleSubmit}
                    style={{ marginTop: theme.space[6] }}
                  >
                    <Stack spacing={theme.space[4]}>
                      <Box>
                        <Stack isInline spacing={theme.space[4]}>
                          <Box>
                            <Field name="name" re>
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.name && form.touched.name
                                  }
                                >
                                  <FormLabel
                                    htmlFor="name"
                                    color={theme.colors.gray[600]}
                                  >
                                    Name
                                  </FormLabel>
                                  <Input
                                    {...field}
                                    focusBorderColor={theme.colors.cyan[500]}
                                    id="name"
                                    placeholder="Enter name"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Box>
                          <Box>
                            <Field name="username" re>
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.username &&
                                    form.touched.username
                                  }
                                >
                                  <FormLabel
                                    htmlFor="username"
                                    color={theme.colors.gray[600]}
                                  >
                                    Username
                                  </FormLabel>
                                  <Input
                                    {...field}
                                    focusBorderColor={theme.colors.cyan[500]}
                                    id="username"
                                    placeholder="Enter username"
                                  />
                                  <FormErrorMessage>
                                    {form.errors.username}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Box>
                        </Stack>
                      </Box>

                      <Box>
                        <Field name="email" re>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <FormLabel
                                htmlFor="email"
                                color={theme.colors.gray[600]}
                              >
                                Email address
                              </FormLabel>
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
                      </Box>
                      <Box>
                        <Field name="password">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <FormLabel
                                htmlFor="password"
                                color={theme.colors.gray[600]}
                              >
                                Password
                              </FormLabel>
                              <Input
                                type="password"
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
                      </Box>
                      <Box>
                        <Field name="passwordConfirmation">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.passwordConfirmation &&
                                form.touched.passwordConfirmation
                              }
                            >
                              <FormLabel
                                htmlFor="passwordConfirmation"
                                color={theme.colors.gray[600]}
                              >
                                Password confirmation
                              </FormLabel>
                              <Input
                                type="password"
                                focusBorderColor={theme.colors.cyan[500]}
                                {...field}
                                id="passwordConfirmation"
                                placeholder="Enter password confirmation"
                              />
                              <FormErrorMessage>
                                {form.errors.passwordConfirmation}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>

                      <Button
                        isFullWidth
                        variantColor="cyan"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Sign up
                      </Button>
                    </Stack>
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

export default SignUp;
