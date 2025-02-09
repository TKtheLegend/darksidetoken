"use client";

import { SessionProvider } from 'next-auth/react';
import { QuestProvider } from './context/QuestContext';
import { Web3Provider } from './providers/Web3Provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <SessionProvider>
        <QuestProvider>
          {children}
        </QuestProvider>
      </SessionProvider>
    </Web3Provider>
  );
} 