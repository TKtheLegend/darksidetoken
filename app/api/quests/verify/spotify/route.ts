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

    const { action } = await req.json();
    
    // Validate action
    const validActions = ['listen', 'follow'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const platform = `spotify_${action}`;

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
        questType: 'spotify',
        completed: true,
        completedAt: new Date(),
      },
    });

    // Get all completed Spotify quests for this user
    const completedQuests = await prisma.quest.count({
      where: {
        userId: user.id,
        questType: 'spotify',
        completed: true,
      },
    });

    return NextResponse.json({
      success: true,
      quest,
      completedCount: completedQuests,
      totalCount: validActions.length,
    });

  } catch (error) {
    console.error('Spotify quest verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify Spotify quest' },
      { status: 500 }
    );
  }
} 