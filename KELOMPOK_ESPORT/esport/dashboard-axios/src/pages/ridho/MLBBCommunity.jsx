import React, { useState, useEffect } from 'react';
import { Trophy, Users, Swords, Gamepad2, ChevronRight, PlayCircle, Star, Crosshair, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
  
const MLBBCommunity = () => {
  useEffect(() => {
    console.log("MLBB Community Loaded");
  }, []);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const players = [
    { id: 1, name: 'LEMON', role: 'MIDLANER', winRate: '78%', favHero: 'Kagura', kda: '5.2', image: '/src/assets/hafizh.jpeg', signature: 'Alien' },
    { id: 2, name: 'TUTURU', role: 'GOLD LANER', winRate: '82%', favHero: 'Claude', kda: '6.1', image: '/src/assets/ridho.jpeg', signature: 'Aggressive' },
    { id: 3, name: 'XINNN', role: 'JUNGLER', winRate: '85%', favHero: 'Ling', kda: '7.4', image: '/src/assets/satria.jpeg', signature: 'Baby Alien' },
    { id: 4, name: 'VYN', role: 'ROAMER', winRate: '75%', favHero: 'Franco', kda: '4.8', image: '/src/assets/dani.jpeg', signature: 'Captain' },
    { id: 5, name: 'R7', role: 'EXP LANER', winRate: '83%', favHero: 'YuZhong', kda: '6.0', image: '/src/assets/mirza.jpeg', signature: 'Maniak' }
  ];

  const matches = [
    { id: 1, teamA: 'RRQ HOSHI', teamB: 'ONIC ESPORTS', score: '3 - 1', status: 'VICTORY', date: 'Oct 24, 2026', tournament: 'MPL ID S18 - Grand Final' },
    { id: 2, teamA: 'RRQ HOSHI', teamB: 'EVOS LEGENDS', score: '2 - 0', status: 'VICTORY', date: 'Oct 18, 2026', tournament: 'MPL ID S18 - Playoffs' },
    { id: 3, teamA: 'RRQ HOSHI', teamB: 'ECHO', score: '1 - 3', status: 'DEFEAT', date: 'Oct 12, 2026', tournament: 'M6 World Championship' },
  ];

  const stats = [
    { label: 'Global Rank', value: '#1', icon: <Trophy className="w-10 h-10" />, color: 'from-yellow-400 to-yellow-600' },
    { label: 'Active Members', value: '150K+', icon: <Users className="w-10 h-10" />, color: 'from-blue-400 to-blue-600' },
    { label: 'Tournaments Won', value: '42', icon: <Swords className="w-10 h-10" />, color: 'from-red-400 to-red-600' },
    { label: 'Total Matches', value: '1M+', icon: <Gamepad2 className="w-10 h-10" />, color: 'from-purple-400 to-purple-600' },
  ];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#030303] text-white min-h-screen overflow-x-hidden selection:bg-[#F3B229] selection:text-black font-sans">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pb-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303] z-10" />
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920&h=1080')] bg-cover bg-center bg-no-repeat mix-blend-luminosity"
          />
          {/* Animated glowing orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F3B229]/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#F3B229] animate-pulse" />
              <span className="text-[#F3B229] font-bold tracking-widest text-xs md:text-sm uppercase">Official MLBB Division</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter mb-6 text-white drop-shadow-2xl leading-none">
              Dominate <br />
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-[#F3B229] blur-2xl opacity-20 z-0"></span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F3B229] via-yellow-400 to-orange-500">The Arena</span>
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Join the most aggressive and elite <strong className="text-white">Mobile Legends: Bang Bang</strong> community. We play to win, we play to dominate.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4"
            >
              <motion.a
                href="https://discord.com/invite/mobilelegendsbangbang"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(243, 178, 41, 0.5)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-[#F3B229] text-black font-black py-4 px-10 uppercase tracking-widest overflow-hidden skew-x-[-10deg] transition-all duration-300 flex items-center justify-center gap-3 no-underline"
                style={{ textDecoration: "none" }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="block skew-x-[10deg] flex items-center justify-center gap-3">
                  <Swords size={22} className="group-hover:rotate-12 transition-transform" /> Join The Squad
                </span>
              </motion.a>

              <motion.a
                href="http://www.youtube.com/@MPLIndonesia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#F3B229",
                  color: "#F3B229",
                  y: -2,
                  backgroundColor: "rgba(243, 178, 41, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-transparent border border-white/20 text-white font-bold py-4 px-10 uppercase tracking-widest transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 no-underline"
                style={{ textDecoration: "none" }}
              >
                <span className="flex items-center justify-center gap-3">
                  <PlayCircle size={22} className="group-hover:scale-110 transition-transform" /> Watch MPL
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20"
        >
          <span className="text-xs uppercase tracking-widest font-bold rotate-90 mb-4 text-[#F3B229]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#F3B229] to-transparent" />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-20 mt-24 px-4 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(stat.icon, { className: 'w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' })}
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROSTER SECTION */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#F3B229]" />
              <span className="text-[#F3B229] font-bold tracking-widest uppercase">The Squad</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Roster</span>
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-white hover:text-[#F3B229] transition-colors font-bold uppercase text-sm tracking-widest group mt-6 md:mt-0"
          >
            View All Players <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-6 gap-6 relative z-10">
          {players.map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredPlayer(player.id)}
              onMouseLeave={() => setHoveredPlayer(null)}
              className={`
  col-span-2
  group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10
  hover:border-[#F3B229]/50 transition-all duration-500
  hover:shadow-[0_0_30px_rgba(243,178,41,0.15)]

  ${idx === 3 ? 'col-start-2' : ''}
  ${idx === 4 ? 'col-start-4' : ''}
`}
>
              {/* Player Image & Overlay */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Diagonal cut design */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#030303] z-20 transform translate-x-12 -translate-y-12 rotate-45 border-l border-b border-white/10 group-hover:border-[#F3B229]/50 transition-colors" />

                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />

                {/* Role Badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded flex items-center gap-2">
                  <Crosshair size={14} className="text-[#F3B229]" />
                  <span className="text-white font-bold tracking-widest text-[10px] uppercase">
                    {player.role}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-1 text-white drop-shadow-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {player.name}
                  </h3>
                  <p className="text-[#F3B229] font-bold text-sm tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    "{player.signature}"
                  </p>

                  {/* Expanded Stats on Hover */}
                  {/* Expanded Stats on Hover */}
                  {
                    hoveredPlayer === player.id && (
                      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 transition-all duration-500">
                        <div className="text-center">
                          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                            Win Rate
                          </p>
                          <p className="text-white font-black text-lg">
                            {player.winRate}
                          </p>
                        </div>

                        <div className="text-center border-l border-r border-white/10">
                          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                            KDA
                          </p>
                          <p className="text-white font-black text-lg">
                            {player.kda}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                            Hero
                          </p>
                          <p className="text-white font-bold text-sm truncate px-1">
                            {player.favHero}
                          </p>
                        </div>
                      </div>
                    )
                  }
                  <div className="text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Win Rate</p>
                    <p className="text-white font-black text-lg">{player.winRate}</p>
                  </div>
                  <div className="text-center border-l border-r border-white/10">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">KDA</p>
                    <p className="text-white font-black text-lg">{player.kda}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Hero</p>
                    <p className="text-white font-bold text-sm truncate px-1">{player.favHero}</p>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#F3B229] transition-all duration-500 w-0 group-hover:w-full z-30" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* MATCHES SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#030303] to-[#0a0a0a] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F3B229]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap size={20} className="text-[#F3B229]" />
              <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">Battle Log</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Recent <span className="text-[#F3B229]">Matches</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {matches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="group relative bg-[#111] border border-white/5 hover:border-[#F3B229]/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-[#151515] hover:shadow-2xl overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F3B229]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />

                <div className="relative z-10 w-full md:w-1/4 text-center md:text-left flex flex-col items-center md:items-start border-b md:border-b-0 border-white/10 pb-4 md:pb-0">
                  <span className="text-gray-400 text-sm font-bold tracking-widest mb-1">
                    {match.date}
                  </span>
                  <span className="text-[#F3B229] text-xs font-bold uppercase tracking-wider">
                    {match.tournament}
                  </span>
                </div>

                <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                  <div className="text-center sm:text-right flex-1 w-full sm:w-auto">
                    <h4 className="font-black text-2xl md:text-3xl uppercase tracking-tight text-white group-hover:text-[#F3B229] transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {match.teamA}
                    </h4>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10 shadow-inner flex-shrink-0">
                    <span className="font-black text-3xl md:text-4xl tracking-widest text-white">
                      {match.score.split(' - ')[0]}<span className="text-[#F3B229] mx-2">-</span>{match.score.split(' - ')[1]}
                    </span>
                  </div>

                  <div className="text-center sm:text-left flex-1 w-full sm:w-auto">
                    <h4 className="font-black text-2xl md:text-3xl uppercase tracking-tight text-gray-400 group-hover:text-white transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {match.teamB}
                    </h4>
                  </div>
                </div>

                <div className="relative z-10 w-full md:w-1/4 flex justify-center md:justify-end mt-4 md:mt-0">
                  <div className={`flex items-center gap-2 px-5 py-2 rounded-full border ${match.status === 'VICTORY'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                    {match.status === 'VICTORY' ? <Trophy size={16} /> : <Shield size={16} />}
                    <span className="text-sm font-black tracking-widest uppercase">
                      {match.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="text-gray-400 hover:text-white font-bold tracking-widest uppercase text-sm border-b border-gray-600 hover:border-white pb-1 transition-colors">
              View Complete Schedule
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#F3B229] mix-blend-multiply opacity-90 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920&h=1080')] bg-cover bg-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent z-20" />
        </div>

        <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Star className="w-16 h-16 text-white mx-auto mb-8 animate-[spin_10s_linear_infinite] opacity-50" />
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-black drop-shadow-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Ready to <span className="text-white">Prove Yourself?</span>
            </h2>
            <p className="text-black/80 md:text-white/90 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md">
              The arena awaits. Join our community Discord, participate in scrims, and maybe you'll be the next legend on our roster.
            </p>

            <motion.a
              href="https://discord.com/invite/mobilelegendsbangbang"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0,0,0,0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center bg-black text-[#F3B229] font-black py-5 px-12 text-xl uppercase tracking-widest overflow-hidden skew-x-[-10deg] shadow-2xl transition-all duration-300 no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="skew-x-[10deg] flex items-center gap-3">
                Join Discord Now <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CSS for custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default MLBBCommunity;