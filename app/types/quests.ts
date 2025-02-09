export type QuestType = 'social' | 'spotify' | 'youtube';

export type SocialPlatform = 'x' | 'instagram' | 'tiktok' | 'twitch';
export type SpotifyAction = 'listen' | 'follow';
export type YouTubeAction = 'watch' | 'subscribe';

export interface QuestProgress {
  completedCount: number;
  totalCount: number;
}

export interface Quest {
  id: string;
  userId: string;
  questType: QuestType;
  platform: string;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestVerificationResponse {
  success: boolean;
  quest: Quest;
  completedCount: number;
  totalCount: number;
  error?: string;
} 