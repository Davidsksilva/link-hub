import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import AlertContainer from '../components/AlertContainer';

export interface AlertMessage {
  id: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface AlertContextData {
  addAlert(message: Omit<AlertMessage, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<AlertMessage[]>([]);

  const addAlert = useCallback(
    ({ type, title, description }: Omit<AlertMessage, 'id'>) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((oldMessages) => [...oldMessages, toast]);
    },
    [],
  );

  const removeAlert = useCallback((id: string) => {
    setMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== id),
    );
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer messages={messages} />
    </AlertContext.Provider>
  );
};

export function useToast(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}
