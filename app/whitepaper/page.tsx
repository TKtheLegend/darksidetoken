"use client";

import { useEffect, useState } from "react";

export default function Whitepaper() {
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-rows-[60px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      {/* Hamburger Menu Button */}
      <div className="absolute top-8 right-8 sm:right-20 z-20">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded transition-colors"
        >
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 z-10 flex items-start justify-end p-20">
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 sm:right-20 text-2xl text-white hover:text-gray-300"
          >
            ×
          </button>
          <nav className="pt-16">
            <a 
              href="/"
              className="text-xl text-white hover:text-gray-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </a>
          </nav>
        </div>
      )}

      <main className="flex flex-col gap-8 row-start-2 max-w-[800px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">$DARKSIDE</h1>
        
        <h2 className="text-3xl font-bold text-center mb-16">DARKSIDE: A New Era of Onchain Music & Tokenized Artistry</h2>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            The <strong>onchain music revolution</strong> isn't new. I've been experimenting in this space for years—launching over <strong>30 onchain records</strong>, creating <strong>multi-layered audiovisual projects</strong>, and building <strong>Eternal Garden</strong>, a universe where music, art, and technology merge into something greater.
          </p>

          <p>
            But through all of these experiments, I've encountered the <strong>same problem over and over again</strong>—one that <strong>every independent artist trying to build in Web3</strong> eventually runs into:
          </p>

          <p className="pl-6 border-l-4 border-white/20">
            👉 <strong>How do you create a tokenized music experience that actually works—for both artists and fans?</strong>
          </p>

          <p className="pl-6 border-l-4 border-white/20">
            👉 <strong>How do you bring real liquidity into a project without selling out its soul?</strong>
          </p>

          <p className="pl-6 border-l-4 border-white/20">
            👉 <strong>How do you prevent Web3's toxic cycle of speculation from destroying genuine artistic innovation?</strong>
          </p>

          <p>My research company Eternal Labs has been searching for answer.</p>

          <p>The answer to these questions is <strong>DARKSIDE</strong>.</p>

          <p>This isn't just an album. It's a <strong>new system</strong>, a <strong>new model</strong>, and a <strong>new experiment</strong> that could redefine how artists and fans interact in the Web3 space.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Where Onchain Music Started: NFTs</h2>

          <p>For a time, <strong>NFTs were the most successful form factor for onchain music.</strong> They allowed artists to sell digital collectibles, build new revenue streams, and give fans <strong>a stake in their success.</strong></p>

          <h3 className="text-xl font-bold mt-8 mb-4">The Problem: Why Onchain Music Has Struggled</h3>

          <p>But then the <strong>secondary market collapsed</strong>—and with it, the sustainability of NFTs as a long-term model for music.</p>

          <p>The <strong>core issue?</strong></p>

          <p className="text-red-500">🚨 <strong>Most NFT holders weren't actual fans—they were speculators.</strong></p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Many collectors <strong>bought NFTs hoping for price appreciation, not because they cared about the music.</strong></li>
            <li>Artists struggled to <strong>convert NFT holders into real supporters</strong>—many people who bought never streamed the songs or engaged with the artist outside of Web3.</li>
            <li>Utility became a <strong>trap</strong>—musicians felt pressured to <strong>overpromise</strong> just to keep NFT holders happy, leading to burnout and unsustainable commitments.</li>
          </ul>

          <p>At the end of the day, <strong>NFTs became more about trading than music.</strong></p>

          <p>Subsequently, the recent bear market crushed the <strong>art and music sectors of web3</strong>. The focus shifted back to <strong>pure trading and speculation</strong>, leaving real creators in the dust.</p>

          <p className="text-xl">🔑 <strong>DARKSIDE fixes this by flipping the model: you must be a fan first.</strong></p>

          <p>Instead of selling music NFTs upfront, <strong>our tokens are earned, not bought.</strong></p>

          <ul className="list-disc pl-6 space-y-2">
            <li>You have to <strong>stream the music</strong></li>
            <li>You have to <strong>engage with the rollout</strong></li>
            <li>You have to <strong>participate in the ecosystem</strong></li>
          </ul>

          <p>Only <strong>real fans</strong> who actively support the album <strong>get early access to the token.</strong></p>

          <p>This ensures that <strong>the people who hold $DARKSIDE (or $GORGEOUS) are actually engaged.</strong> It prevents <strong>a speculative bubble</strong> from forming before the project even has a chance to grow.</p>

          <p>Instead of <strong>chasing liquidity through hype</strong>, we <strong>build liquidity through fandom.</strong></p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Why Fan Incentivization Matters: The Role of Digital Street Teams</h2>

          <p>Artists have always relied on <strong>street teams</strong>—grassroots movements of passionate fans spreading the word, handing out flyers, requesting songs on the radio, and building hype. Some of the most <strong>successful artists of all time</strong> owe their rise to <strong>early supporters</strong> who championed their music before the mainstream caught on.</p>

          <p>The <strong>digital era didn't change the need for street teams—it just changed how they work.</strong></p>

          <p>Social media turned <strong>engagement into currency</strong>—but the problem is, platforms reap all the rewards while <strong>fans, the ones driving success, get nothing in return.</strong></p>

          <p>I've been a pioneer in <strong>digital street teams with onchain incentives</strong> because I believe:</p>

          <p className="pl-6 border-l-4 border-white/20">🔥 <strong>Curation is important</strong>—fans should be rewarded for their taste and influence.</p>

          <p className="pl-6 border-l-4 border-white/20">🔥 <strong>Support should be recognized</strong>—early believers deserve more than just bragging rights.</p>

          <p className="pl-6 border-l-4 border-white/20">🔥 <strong>Artists and fans should win together</strong>—not just platforms, labels, or middlemen.</p>

          <p>That's why I've spent the last few years <strong>testing different models</strong>:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Petal Power</strong>—a viral marketing experiment where fans <strong>earned social tokens and USD rewards</strong> for amplifying content.</li>
            <li><strong>Formless</strong>—a pay-for-access streaming experiment that <strong>turned fans into revenue participants</strong>.</li>
          </ul>

          <p>Each one <strong>pushed the boundaries</strong> of what's possible in Web3 music—but they also revealed the <strong>core issue</strong>:</p>

          <p className="text-xl">🔑 <strong>Liquidity is the lifeblood of any token experiment. Without it, the system collapses before it even begins.</strong></p>

          <p>So how do we solve this?</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">The Solution: DARKSIDE's New Token Economy</h2>

          <p>With <strong>DARKSIDE</strong>, I'm flipping the script. Instead of just dropping an album and hoping people show up, I'm launching a <strong>fully integrated onchain economy</strong> around it—where every song is <strong>paired with a corresponding token</strong> that exists on a <strong>bonding curve.</strong></p>

          <p><strong>Bonding curves aren't new</strong>—but what's different is <strong>how this will work</strong>:</p>

          <p>1️⃣ The <strong>first token</strong> will be <strong>$DARKSIDE.</strong></p>

          <p>2️⃣ This token <strong>can't be bought right away</strong>—instead, it must be <strong>mined</strong> through <strong>quests</strong>:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Streaming the music</strong></li>
            <li><strong>Reposting key social media content</strong></li>
            <li><strong>Engaging in the rollout</strong></li>
          </ul>

          <p>3️⃣ Completing these quests earns you <strong>"Insider" status</strong>, which gives you <strong>early allocations of the token</strong> before the <strong>contract address (CA) goes public.</strong></p>

          <p>4️⃣ Once the token is <strong>released to the open market</strong>, our Insiders—<strong>the real supporters</strong>—already have a stake, <strong>monetizing their efforts</strong> instead of just being spectators.</p>

          <p>This does <strong>three critical things</strong>:</p>

          <p className="pl-6 border-l-4 border-white/20">✅ <strong>Creates liquidity before the token launch</strong></p>

          <p className="pl-6 border-l-4 border-white/20">✅ <strong>Rewards supporters, not just speculators</strong></p>

          <p className="pl-6 border-l-4 border-white/20">✅ <strong>Builds a PVE (player vs. environment) economy around each song</strong></p>

          <p>Instead of just <strong>dropping an album</strong>, we're creating <strong>an ecosystem</strong>—where the <strong>music, the token, and the community fuel each other</strong> in a <strong>sustainable way</strong>.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">The Dangers of Creator Tokens</h2>

          <p>We've seen how <strong>crypto reacts to creators launching tokens</strong>—and it's almost always <strong>a disaster</strong>:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>If an artist launches a token, <strong>traders immediately snipe it, flip it, and drain liquidity.</strong></li>
            <li>If an artist does it "the right way"—slow, intentional, and community-driven—<strong>they make no money</strong> and end up putting in more effort than they do on their actual music.</li>
            <li>If they do make money, <strong>crypto people pressure them to pour every cent back in</strong>, turning them into unwilling fund managers instead of artists.</li>
          </ul>

          <p>This system is <strong>broken all around</strong>—but instead of complaining about it, we will build solutions.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6">No False Promises—Just Intentionality</h2>

          <p>Let's be real: <strong>most coins go to zero.</strong></p>

          <p>We're not here to sell dreams or make empty promises. What we <em>are</em> doing is designing <strong>a system that is built to last</strong> and actually benefits all participants.</p>

          <p>At its core, <strong>DARKSIDE is a PVE (Player vs. Environment) experience.</strong></p>

          <p>It's about <strong>rallying a community around something dope.</strong></p>

          <p className="pl-6 border-l-4 border-white/20">🔥 <strong>Building an ecosystem where fans and artists both benefit.</strong></p>

          <p className="pl-6 border-l-4 border-white/20">🔥 <strong>Creating a new model for music and tokenization that actually works.</strong></p>

          <p>We're closing the loop by <strong>building real, actionable utility into the token.</strong></p>

          <p>Here's how:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Utility that matters</strong> – DARKSIDE tokens will have <strong>redeemable use cases</strong>, ensuring that the token is more than just a speculative asset.</li>
            <li><strong>Deflationary mechanics</strong> – Strategic locks & <strong>burns of token supply</strong> to <strong>increase value over time.</strong></li>
            <li><strong>Sustained token value</strong> – As <strong>DARKSIDE expands</strong>, the token isn't just an afterthought—it's <strong>integrated into the project's long-term growth.</strong></li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">This is Just the Beginning</h2>

          <p>With DARKSIDE, we're <strong>laying down the foundation</strong>—but this is just the first step.</p>

          <p><strong>What we're building here isn't just an album release strategy. It's a model.</strong></p>

          <p>A model that could be <strong>scaled and replicated</strong> for other independent artists. A model that ensures <strong>liquidity, sustainability, and true fan engagement.</strong></p>

          <p>I don't expect to have <strong>all the answers</strong>—but I do know that if we keep <strong>pushing, testing, and iterating</strong>, we can figure this out together.</p>

          <p>This is DARKSIDE.</p>

          <p>This is the next evolution of onchain music.</p>

          <p>And this is <strong>just the beginning.</strong></p>

          <h2 className="text-2xl font-bold mt-12 mb-6">TOKENOMICS</h2>

          <h3 className="text-xl font-bold mt-8 mb-4">Why This Matters</h3>

          <p>Most creator tokens <strong>fail because of poor tokenomics</strong>—either the <strong>founder holds too much</strong>, early supporters <strong>dump everything</strong>, or there's <strong>no actual reason to hold the token.</strong></p>

          <p>DARKSIDE is <strong>different.</strong></p>

          <ul className="list-disc pl-6 space-y-2">
            <li>It <strong>incentivizes real fans first.</strong></li>
            <li>It <strong>locks out speculation until the ecosystem is healthy.</strong></li>
            <li>It <strong>creates sustainable incentives for both insiders & the broader Web3 music space.</strong></li>
          </ul>

          <p>This isn't about <strong>a one-time launch</strong>—this is about <strong>building an onchain economy that actually works for artists and fans alike.</strong></p>

          <p className="text-xl text-center mt-12">🔻 <strong>Welcome to the healthiest token in onchain music.</strong> 🔻</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          href="/"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          Back to Home
        </a>
      </footer>
    </div>
  );
} 