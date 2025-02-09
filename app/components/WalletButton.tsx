"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletLink } from "../hooks/useWalletLink";
import { useQuestProgress } from "../hooks/useQuestProgress";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export function WalletButton() {
  return (
    <button 
      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg backdrop-blur-sm transition-colors duration-300 font-bold tracking-wider"
      onClick={() => alert('Wallet functionality coming soon!')}
    >
      CONNECT WALLET
    </button>
  );
} 