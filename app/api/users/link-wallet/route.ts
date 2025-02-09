import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { address } = await req.json();
    
    if (!address) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // Check if wallet is already linked to another account
    const existingWallet = await prisma.user.findUnique({
      where: { walletAddress: address }
    });

    if (existingWallet && existingWallet.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Wallet already linked to another account' },
        { status: 400 }
      );
    }

    // Update user with wallet address
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { walletAddress: address },
    });

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        walletAddress: user.walletAddress,
      }
    });

  } catch (error) {
    console.error('Wallet linking error:', error);
    return NextResponse.json(
      { error: 'Failed to link wallet' },
      { status: 500 }
    );
  }
} 