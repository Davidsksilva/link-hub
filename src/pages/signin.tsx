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
  Text,
  useToast,
} from '@chakra-ui/core';
import { Formik, Field, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useAuth } from '../hooks/auth';

interface SignInData {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Email required'),
  password: Yup.string().required('Password required'),
});

const SignIn: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const toast = useToast();
  const { signIn } = useAuth();

  async function handleSignIn(
    { email, password }: SignInData,
    { setSubmitting }: FormikHelpers<SignInData>,
  ) {
    try {
      await signIn({ email, password });
      router.push('/dashboard');
    } catch (err) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
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
              Don&apos;t have an account?
              <Link href="/signup">
                <Button
                  variantColor="cyan"
                  variant="outline"
                  ml={theme.space[4]}
                >
                  Sign up
                </Button>
              </Link>
            </Box>
          </Flex>
          <Flex direction="row" align="center" justify="center" flex="1">
            <Flex direction="column" minW={320}>
              <Heading color={theme.colors.gray[600]}>Sign in</Heading>
              <Formik
                initialValues={{ email: '', password: '' }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={SignInSchema}
                onSubmit={handleSignIn}
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
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          mt={theme.space[4]}
                        >
                          <FormLabel
                            htmlFor="password"
                            color={theme.colors.gray[600]}
                          >
                            Password
                          </FormLabel>
                          <Input
                            focusBorderColor={theme.colors.cyan[500]}
                            {...field}
                            id="password"
                            type="password"
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

export default SignIn;
