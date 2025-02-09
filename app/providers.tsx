"use client";

import { SessionProvider } from 'next-auth/react';
import { QuestProvider } from './context/QuestContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QuestProvider>
        {children}
      </QuestProvider>
    </SessionProvider>
  );
} 