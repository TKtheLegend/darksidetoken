"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WalletButton } from "./components/WalletButton";
import { AuthButton } from "./components/AuthButton";
import { QuestItem } from "./components/QuestItem";
import { useQuestProgress } from "./hooks/useQuestProgress";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { questStatus } = useQuestProgress();

  useEffect(() => {
    setIsClient(true);
    const launchDate = new Date('2025-03-21T17:00:00-07:00'); // 5pm PST on March 21, 2025

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollPosition / windowHeight));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  const scrollToVault = () => {
    const vaultSection = document.getElementById('vault-section');
    vaultSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate quest completion
  const socialCompleted = Object.values(questStatus.social).filter(Boolean).length;
  const spotifyCompleted = Object.values(questStatus.spotify).filter(Boolean).length;
  const youtubeCompleted = Object.values(questStatus.youtube).filter(Boolean).length;

  const isSocialComplete = socialCompleted === 4;
  const isSpotifyComplete = spotifyCompleted === 2;
  const isYoutubeComplete = youtubeCompleted === 2;

  return (
    <div className="relative">
      {/* Add keyframes at the top level of the component */}
      <style jsx>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
                        0 0 30px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4),
                        0 0 60px rgba(255, 255, 255, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
                        0 0 30px rgba(255, 255, 255, 0.1);
          }
        }
        @keyframes pulse-glow-spotify {
          0% {
            box-shadow: 0 0 20px rgba(29, 185, 84, 0.2),
                        0 0 30px rgba(29, 185, 84, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(29, 185, 84, 0.4),
                        0 0 60px rgba(29, 185, 84, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(29, 185, 84, 0.2),
                        0 0 30px rgba(29, 185, 84, 0.1);
          }
        }
        @keyframes pulse-glow-youtube {
          0% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.2),
                        0 0 30px rgba(255, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 0.4),
                        0 0 60px rgba(255, 0, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.2),
                        0 0 30px rgba(255, 0, 0, 0.1);
          }
        }
        @keyframes pulse-glow-box {
          0% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.15),
                        0 0 50px rgba(255, 255, 255, 0.1),
                        0 0 70px rgba(255, 255, 255, 0.05);
            transform: translateY(0px);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.2),
                        0 0 80px rgba(255, 255, 255, 0.15),
                        0 0 120px rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
          }
          100% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.15),
                        0 0 50px rgba(255, 255, 255, 0.1),
                        0 0 70px rgba(255, 255, 255, 0.05);
            transform: translateY(0px);
          }
        }
        @keyframes pulse-glow-twitch {
          0% {
            box-shadow: 0 0 20px rgba(145, 70, 255, 0.2),
                        0 0 30px rgba(145, 70, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(145, 70, 255, 0.4),
                        0 0 60px rgba(145, 70, 255, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(145, 70, 255, 0.2),
                        0 0 30px rgba(145, 70, 255, 0.1);
          }
        }
      `}</style>

      {/* First Section - Hero */}
      <section className="relative min-h-screen">
        {/* Background Video with Overlay */}
        <div className="fixed inset-0 z-0" style={{ opacity: scrollOpacity }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" /> {/* Base overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/40 to-transparent" /> {/* Gradient overlay */}
        </div>

        {/* Top Navigation */}
        <div className="fixed top-8 right-8 z-20 flex items-center gap-4">
          <AuthButton />
        </div>

        {/* Whitepaper Button */}
        <div className="fixed bottom-8 right-8 z-20">
          <a 
            href="/whitepaper" 
            className="px-6 py-3 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-wider [animation:pulse-glow_3s_ease-in-out_infinite] hover:[animation:pulse-glow_2s_ease-in-out_infinite]"
          >
            READ THE WHITEPAPER
          </a>
        </div>

        {/* Content */}
        <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-12 row-start-2 items-center text-center">
            <div className="w-[400px] sm:w-[600px]">
              <Image
                src="/$darkside.png"
                alt="DARKSIDE"
                width={600}
                height={150}
                priority
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[800px] text-base">
              <p className="w-[100%]">
                A new path. A new order. A system built to survive.
              </p>
              <p className="w-[95%] mx-auto">
                Not just music. Not just a token.
              </p>
              <p className="w-[85%] mx-auto">
                You earn it. You shape it.
              </p>
              <p className="w-[80%] mx-auto">
                You become it.
              </p>
              <div className="h-8"></div>
              <p className="w-[70%] mx-auto font-bold text-lg">
                Welcome to $DARKSIDE.
              </p>
              <div className="h-6"></div>
              <div className="flex justify-center w-full">
                <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm inline-flex gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{timeLeft.days}</span>
                    <span className="text-xs opacity-70">DAYS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{timeLeft.hours}</span>
                    <span className="text-xs opacity-70">HOURS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                    <span className="text-xs opacity-70">MINUTES</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                    <span className="text-xs opacity-70">SECONDS</span>
                  </div>
                </div>
              </div>
              <div className="h-6"></div>
              <button 
                onClick={() => document.getElementById('quests-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg backdrop-blur-sm transition-colors duration-300 font-bold tracking-wider relative hover:border-white/50 [animation:pulse-glow_2s_ease-in-out_infinite] hover:[animation:pulse-glow_1.5s_ease-in-out_infinite] hover:scale-[1.02]"
              >
                EARN $DARKSIDE
              </button>
            </div>
          </main>
          <footer className="row-start-3 flex flex-col items-center gap-6">
            <button 
              onClick={() => document.getElementById('quests-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white hover:text-gray-300 transition-colors flex flex-col items-center gap-2"
            >
              <span>Begin Your Journey</span>
              <svg 
                className="w-6 h-6 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          </footer>
        </div>
      </section>

      {/* Second Section - Quests */}
      <section id="quests-section" className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-8">Earn $DARKSIDE</h2>
          <p className="text-lg text-center text-white/80 max-w-2xl mx-auto mb-16">
            Complete the following quests to earn your allocation of $DARKSIDE tokens before they become available to the public.
          </p>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Quest 1 - Follow */}
            <QuestItem
              number={1}
              title="Follow TK on Socials"
              description="Follow and engage with TK across social platforms"
              completedCount={socialCompleted}
              totalCount={4}
              isCompleted={isSocialComplete}
            >
              <a href="https://x.com/tkthelegend" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all [animation:pulse-glow_2s_ease-in-out_infinite] hover:[animation:pulse-glow_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </a>
              <a href="https://www.instagram.com/tkthelegend" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all [animation:pulse-glow_2s_ease-in-out_infinite] hover:[animation:pulse-glow_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.tiktok.com/@tkthelegend" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all [animation:pulse-glow_2s_ease-in-out_infinite] hover:[animation:pulse-glow_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </a>
              <a href="https://twitch.tv/tkthelegendx" className="flex items-center gap-2 px-4 py-2 bg-[#9146FF]/10 hover:bg-[#9146FF]/20 rounded-lg border border-[#9146FF]/20 hover:border-[#9146FF]/30 transition-all text-[#9146FF] [animation:pulse-glow-twitch_2s_ease-in-out_infinite] hover:[animation:pulse-glow-twitch_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                Twitch
              </a>
            </QuestItem>

            {/* Quest 2 - Spotify */}
            <QuestItem
              number={2}
              title="Stream DARKSIDE on Spotify"
              description="Listen to the full track on Spotify"
              completedCount={spotifyCompleted}
              totalCount={2}
              isCompleted={isSpotifyComplete}
            >
              <a href="https://open.spotify.com/track/7L8k9OBBHOzB5PhoRWz4Xy?si=af91f9f326a54bd1" className="flex items-center gap-2 px-4 py-2 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 rounded-lg border border-[#1DB954]/20 hover:border-[#1DB954]/30 transition-all text-[#1DB954] [animation:pulse-glow-spotify_2s_ease-in-out_infinite] hover:[animation:pulse-glow-spotify_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Listen on Spotify
              </a>
              <a href="https://open.spotify.com/artist/4eYRKCNmvZlQlDThvkgwP1?si=VZvyRM89Q4iL8--fTR89ig" className="flex items-center gap-2 px-4 py-2 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 rounded-lg border border-[#1DB954]/20 hover:border-[#1DB954]/30 transition-all text-[#1DB954] [animation:pulse-glow-spotify_2s_ease-in-out_infinite] hover:[animation:pulse-glow-spotify_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Follow TK
              </a>
            </QuestItem>

            {/* Quest 3 - Watch Trailer */}
            <QuestItem
              number={3}
              title="Watch the DARKSIDE Trailer"
              description="Experience the visual journey of DARKSIDE"
              completedCount={youtubeCompleted}
              totalCount={2}
              isCompleted={isYoutubeComplete}
            >
              <a href="https://www.youtube.com/@TKtheLegendx/streams" className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all text-red-500 [animation:pulse-glow-youtube_2s_ease-in-out_infinite] hover:[animation:pulse-glow-youtube_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Trailer
              </a>
              <a href="https://www.youtube.com/@TKtheLegendx/streams" className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all text-red-500 [animation:pulse-glow-youtube_2s_ease-in-out_infinite] hover:[animation:pulse-glow-youtube_1.5s_ease-in-out_infinite]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe
              </a>
            </QuestItem>

            {/* Claim Section */}
            <div className="mt-12 text-center">
              <p className="text-white/60 mb-6">Complete all quests to unlock your $DARKSIDE token allocation</p>
              <WalletButton />
              <p className="text-white/40 text-sm mt-4">Connect wallet only when ready to claim tokens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Vault */}
      <section id="vault-section" className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 opacity-90">The Vault</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="aspect-square bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:border-white/30 [animation:pulse-glow-box_3s_ease-in-out_infinite] hover:[animation:pulse-glow-box_2s_ease-in-out_infinite] hover:bg-white/[0.05] transform transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <span className="text-xl font-bold opacity-50 group-hover:opacity-70 transition-opacity">?</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
