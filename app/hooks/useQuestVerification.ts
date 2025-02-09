"use client";

import { useState } from 'react';
import axios from 'axios';
import { QuestVerificationResponse } from '../types/quests';

export const useQuestVerification = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, defaultMessage: string) => {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || defaultMessage);
    } else {
      setError(defaultMessage);
    }
  };

  const verifySocialQuest = async (platform: string): Promise<QuestVerificationResponse> => {
    setLoading(prev => ({ ...prev, [platform]: true }));
    setError(null);
    
    try {
      const { data } = await axios.post<QuestVerificationResponse>('/api/quests/verify/social', { platform });
      return data;
    } catch (err) {
      handleError(err, 'Failed to verify social quest');
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const verifySpotifyQuest = async (action: 'listen' | 'follow'): Promise<QuestVerificationResponse> => {
    setLoading(prev => ({ ...prev, [`spotify_${action}`]: true }));
    setError(null);
    
    try {
      const { data } = await axios.post<QuestVerificationResponse>('/api/quests/verify/spotify', { action });
      return data;
    } catch (err) {
      handleError(err, 'Failed to verify Spotify quest');
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [`spotify_${action}`]: false }));
    }
  };

  const verifyYouTubeQuest = async (action: 'watch' | 'subscribe'): Promise<QuestVerificationResponse> => {
    setLoading(prev => ({ ...prev, [`youtube_${action}`]: true }));
    setError(null);
    
    try {
      const { data } = await axios.post<QuestVerificationResponse>('/api/quests/verify/youtube', { action });
      return data;
    } catch (err) {
      handleError(err, 'Failed to verify YouTube quest');
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [`youtube_${action}`]: false }));
    }
  };

  return {
    loading,
    error,
    verifySocialQuest,
    verifySpotifyQuest,
    verifyYouTubeQuest,
  };
}; 