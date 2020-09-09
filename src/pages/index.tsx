import React from 'react';
import Head from 'next/head';
import {
  Button,
  Box,
  Flex,
  useTheme,
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormErrorMessage,
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import AppHeader from '../components/AppHeader';

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
          <AppHeader />
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
