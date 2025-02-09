import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

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

type QuestCategory = keyof QuestStatus;
type SocialPlatform = keyof QuestStatus['social'];
type SpotifyAction = keyof QuestStatus['spotify'];
type YoutubeAction = keyof QuestStatus['youtube'];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's quests
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quests: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Transform quests array into status object
    const status: QuestStatus = {
      social: {
        x: false,
        instagram: false,
        tiktok: false,
        twitch: false
      },
      spotify: {
        listen: false,
        follow: false
      },
      youtube: {
        watch: false,
        subscribe: false
      }
    };

    // Update status based on completed quests
    user.quests.forEach(quest => {
      if (quest.completed) {
        const [category, action] = quest.platform.split('_');
        if (category === 'spotify') {
          status.spotify[action as SpotifyAction] = true;
        } else if (category === 'youtube') {
          status.youtube[action as YoutubeAction] = true;
        } else {
          status.social[quest.platform as SocialPlatform] = true;
        }
      }
    });

    return NextResponse.json({ status });

  } catch (error) {
    console.error('Quest status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quest status' },
      { status: 500 }
    );
  }
} 