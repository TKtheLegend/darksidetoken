"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletLink } from "../hooks/useWalletLink";
import { useQuestProgress } from "../hooks/useQuestProgress";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export function WalletButton() {
  const { address } = useAccount();
  const { linkWallet, error } = useWalletLink();
  const { 
    isAuthenticated,
    isWalletConnected,
    canClaim,
    completedQuests,
    totalQuests,
    isLoading 
  } = useQuestProgress();

  // When wallet is connected and all quests are completed, link it to the user's account
  useEffect(() => {
    if (address && canClaim && isAuthenticated) {
      linkWallet().catch(console.error);
    }
  }, [address, canClaim, isAuthenticated, linkWallet]);

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <p className="text-white/60 mb-4">Sign in to start completing quests</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-center items-center gap-2">
        <div className="h-2 bg-white/10 rounded-full w-48">
          <div 
            className="h-full bg-white/30 rounded-full transition-all duration-500"
            style={{ width: `${(completedQuests / totalQuests) * 100}%` }}
          />
        </div>
        <span className="text-sm text-white/60">
          {completedQuests}/{totalQuests}
        </span>
      </div>

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      disabled={!canClaim}
                      className={`px-6 py-3 border rounded-lg backdrop-blur-sm transition-all duration-300 font-bold tracking-wider relative ${
                        canClaim 
                          ? "bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 [animation:pulse-glow_2s_ease-in-out_infinite]"
                          : "bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {canClaim ? "Connect Wallet to Claim" : "Complete All Quests to Claim"}
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg backdrop-blur-sm transition-colors duration-300 font-bold tracking-wider relative hover:border-red-500/50"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex gap-3">
                    <button
                      onClick={openChainModal}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button
                      onClick={openAccountModal}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      {account.ensAvatar && (
                        <Image
                          src={account.ensAvatar}
                          alt={account.ensName ?? account.displayName}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      {account.ensName ?? account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 