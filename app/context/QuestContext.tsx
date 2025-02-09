"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { QuestProgress, QuestType } from '../types/quests';
import { useQuestVerification } from '../hooks/useQuestVerification';

interface QuestContextType {
  questProgress: {
    [key in QuestType]: QuestProgress;
  };
  loading: { [key: string]: boolean };
  error: string | null;
  updateQuestProgress: (type: QuestType, progress: QuestProgress) => void;
  verifySocialQuest: (platform: string) => Promise<void>;
  verifySpotifyQuest: (action: 'listen' | 'follow') => Promise<void>;
  verifyYouTubeQuest: (action: 'watch' | 'subscribe') => Promise<void>;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export function QuestProvider({ children }: { children: ReactNode }) {
  const [questProgress, setQuestProgress] = useState<{ [key in QuestType]: QuestProgress }>({
    social: { completedCount: 0, totalCount: 4 },
    spotify: { completedCount: 0, totalCount: 2 },
    youtube: { completedCount: 0, totalCount: 2 },
  });

  const {
    loading,
    error,
    verifySocialQuest: verifyS,
    verifySpotifyQuest: verifySpot,
    verifyYouTubeQuest: verifyYT,
  } = useQuestVerification();

  const updateQuestProgress = useCallback((type: QuestType, progress: QuestProgress) => {
    setQuestProgress(prev => ({
      ...prev,
      [type]: progress,
    }));
  }, []);

  const verifySocialQuest = useCallback(async (platform: string) => {
    const response = await verifyS(platform);
    updateQuestProgress('social', {
      completedCount: response.completedCount,
      totalCount: response.totalCount,
    });
  }, [verifyS, updateQuestProgress]);

  const verifySpotifyQuest = useCallback(async (action: 'listen' | 'follow') => {
    const response = await verifySpot(action);
    updateQuestProgress('spotify', {
      completedCount: response.completedCount,
      totalCount: response.totalCount,
    });
  }, [verifySpot, updateQuestProgress]);

  const verifyYouTubeQuest = useCallback(async (action: 'watch' | 'subscribe') => {
    const response = await verifyYT(action);
    updateQuestProgress('youtube', {
      completedCount: response.completedCount,
      totalCount: response.totalCount,
    });
  }, [verifyYT, updateQuestProgress]);

  return (
    <QuestContext.Provider
      value={{
        questProgress,
        loading,
        error,
        updateQuestProgress,
        verifySocialQuest,
        verifySpotifyQuest,
        verifyYouTubeQuest,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
}

export function useQuest() {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
} 