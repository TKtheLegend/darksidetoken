import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { platform } = await req.json();
    
    // Validate platform
    const validPlatforms = ['x', 'instagram', 'tiktok', 'twitch'];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }

    // Get or create user
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {},
      create: {
        email: session.user.email,
        name: session.user.name || null,
      },
    });

    // Record quest completion
    const quest = await prisma.quest.upsert({
      where: {
        userId_platform: {
          userId: user.id,
          platform: platform,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        platform: platform,
        questType: 'social',
        completed: true,
        completedAt: new Date(),
      },
    });

    // Get all completed social quests for this user
    const completedQuests = await prisma.quest.count({
      where: {
        userId: user.id,
        questType: 'social',
        completed: true,
      },
    });

    return NextResponse.json({
      success: true,
      quest,
      completedCount: completedQuests,
      totalCount: validPlatforms.length,
    });

  } catch (error) {
    console.error('Quest verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify quest' },
      { status: 500 }
    );
  }
} 