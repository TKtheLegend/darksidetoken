"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface WalletLinkResponse {
  success: boolean;
  user: {
    email: string;
    walletAddress: string;
  };
}

export const useWalletLink = () => {
  const { address } = useAccount();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, defaultMessage: string) => {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || defaultMessage);
    } else {
      setError(defaultMessage);
    }
  };

  const linkWallet = async () => {
    if (!address || !session?.user?.email) {
      setError('Please connect your wallet and sign in first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<WalletLinkResponse>('/api/users/link-wallet', {
        address,
        email: session.user.email
      });

      return response.data;
    } catch (err) {
      handleError(err, 'Failed to link wallet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    linkWallet,
    loading,
    error,
    isReady: Boolean(address && session?.user?.email)
  };
}; 