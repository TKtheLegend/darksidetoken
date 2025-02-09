"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
      </button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              {session.user?.name?.[0] || "?"}
            </div>
          )}
          <span className="text-sm hidden sm:inline">{session.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300 text-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg backdrop-blur-sm transition-colors duration-300 font-bold tracking-wider relative hover:border-white/50"
    >
      Sign In
    </button>
  );
} 