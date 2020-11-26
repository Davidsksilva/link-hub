import React, {
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import api from '../services/api';
import parseCookies from '../utils/parseCookies';
import { TOKEN_COOKIE_KEY, USER_COOKIE_KEY } from '../constants';

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps{
  initialUserValue: string;
  initialTokenValue: string;
}

const AuthProvider : NextPage<AuthProviderProps> = ({
  children,
  initialUserValue,
  initialTokenValue,
}) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = JSON.parse(initialTokenValue);
    const user = JSON.parse(initialUserValue);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set(TOKEN_COOKIE_KEY, token);
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove(TOKEN_COOKIE_KEY);
    Cookies.remove(USER_COOKIE_KEY);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.remove(USER_COOKIE_KEY);
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        token: data.token,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialTokenValue: cookies[TOKEN_COOKIE_KEY],
    initialUserValue: cookies[USER_COOKIE_KEY],
  };
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
