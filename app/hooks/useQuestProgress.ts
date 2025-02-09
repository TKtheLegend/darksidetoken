"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

type QuestStatus = {
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
};

interface QuestStatusResponse {
  status: QuestStatus;
}

export const useQuestProgress = () => {
  const { data: session } = useSession();
  const [questStatus, setQuestStatus] = useState<QuestStatus>({
    social: { x: false, instagram: false, tiktok: false, twitch: false },
    spotify: { listen: false, follow: false },
    youtube: { watch: false, subscribe: false }
  });

  useEffect(() => {
    const fetchQuestStatus = async () => {
      if (session?.user) {
        try {
          const response = await axios.get<QuestStatusResponse>('/api/quests/status');
          setQuestStatus(response.data.status);
        } catch (error) {
          console.error('Failed to fetch quest status:', error);
        }
      }
    };

    fetchQuestStatus();
  }, [session]);

  // Calculate completion status
  const socialCompleted = Object.values(questStatus.social).filter(Boolean).length;
  const spotifyCompleted = Object.values(questStatus.spotify).filter(Boolean).length;
  const youtubeCompleted = Object.values(questStatus.youtube).filter(Boolean).length;

  const totalQuests = 8; // 4 social + 2 spotify + 2 youtube
  const completedQuests = socialCompleted + spotifyCompleted + youtubeCompleted;
  const canClaim = completedQuests === totalQuests;

  return {
    questStatus,
    isAuthenticated: !!session,
    canClaim,
    completedQuests,
    totalQuests
  };
}; 