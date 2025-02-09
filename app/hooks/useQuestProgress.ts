import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

export interface QuestStatus {
  social: {
    x: boolean;
    instagram: boolean;
    tiktok: boolean;
    twitch: boolean;
  };
  spotify: {
    listen: boolean;
    follow: boolean;
  };
  youtube: {
    watch: boolean;
    subscribe: boolean;
  };
}

export const useQuestProgress = () => {
  const { data: session } = useSession();
  const { address } = useAccount();
  const [questStatus, setQuestStatus] = useState<QuestStatus>({
    social: { x: false, instagram: false, tiktok: false, twitch: false },
    spotify: { listen: false, follow: false },
    youtube: { watch: false, subscribe: false }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [canClaim, setCanClaim] = useState(false);

  // Calculate total progress
  const totalQuests = 8; // 4 social + 2 spotify + 2 youtube
  const completedQuests = Object.values(questStatus).reduce((acc, category) => 
    acc + Object.values(category).filter(Boolean).length, 0
  );

  // Check if all quests are completed
  useEffect(() => {
    const allCompleted = completedQuests === totalQuests;
    setCanClaim(allCompleted);
  }, [completedQuests]);

  // Fetch quest status when session changes
  useEffect(() => {
    const fetchQuestStatus = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/quests/status');
        const data = await response.json();
        setQuestStatus(data.status);
      } catch (error) {
        console.error('Failed to fetch quest status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestStatus();
  }, [session?.user?.email]);

  return {
    questStatus,
    isLoading,
    canClaim,
    completedQuests,
    totalQuests,
    isAuthenticated: !!session?.user,
    isWalletConnected: !!address
  };
}; 