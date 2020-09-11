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
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

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
  const theme = useTheme();

  const initialValues: SignUpData = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    username: '',
  };

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
                color={theme.colors.blue[600]}
                fontSize={theme.fontSizes['2xl']}
              >
                link-hub
              </Text>
            </Link>

            <Box>
              Already have an account?
              <Link href="/signin">
                <Button
                  variantColor="blue"
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
              <Heading>Sign up</Heading>
              <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 400);
                }}
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
                                  <FormLabel htmlFor="name">Name</FormLabel>
                                  <Input
                                    {...field}
                                    focusBorderColor={theme.colors.blue[500]}
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
                                  <FormLabel htmlFor="username">
                                    Username
                                  </FormLabel>
                                  <Input
                                    {...field}
                                    focusBorderColor={theme.colors.blue[500]}
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
                              <FormLabel htmlFor="email">
                                Email address
                              </FormLabel>
                              <Input
                                {...field}
                                focusBorderColor={theme.colors.blue[500]}
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
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <Input
                                focusBorderColor={theme.colors.blue[500]}
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
                              <FormLabel htmlFor="passwordConfirmation">
                                Password confirmation
                              </FormLabel>
                              <Input
                                focusBorderColor={theme.colors.blue[500]}
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
                        variantColor="blue"
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
