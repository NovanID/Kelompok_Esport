import React, { useState, useEffect } from 'react';
import { Trophy, Users, Swords, ChevronRight, Crosshair, Shield, Zap, Target, Eye, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const CSGOCommunity = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  useEffect(() => {
    document.title = "CSGO Community";
  }, []);

  const players = [ 
    { id: 1, name: 'S1MPLE', role: 'AWPer', rating: '1.30', maps: '2840', kd: '1.28', hs: '42%', img: '/src/assets/hafizh.jpeg' },
    { id: 2, name: 'NIKO', role: 'Rifler', rating: '1.25', maps: '2100', kd: '1.22', hs: '55%', img: '/src/assets/ridho.jpeg' },
    { id: 3, name: 'ZYW0O', role: 'AWPer', rating: '1.28', maps: '1450', kd: '1.30', hs: '38%', img: '/src/assets/satria.jpeg' },
    { id: 4, name: 'D0NKCS', role: 'Entry', rating: '1.20', maps: '980', kd: '1.18', hs: '51%', img: '/src/assets/dani.jpeg' },
    { id: 5, name: 'M0NESY', role: 'AWPer', rating: '1.24', maps: '850', kd: '1.19', hs: '40%', img: '/src/assets/mirza.jpeg' },
  ];

  const matches = [
    { id: 1, teamA: 'OUR SQUAD', teamB: 'NAVI', score: '16 - 12', map: 'Dust II', status: 'WIN', event: 'IEM Katowice 2026' },
    { id: 2, teamA: 'OUR SQUAD', teamB: 'FAZE CLAN', score: '13 - 16', map: 'Mirage', status: 'LOSS', event: 'BLAST Premier' },
    { id: 3, teamA: 'OUR SQUAD', teamB: 'VITALITY', score: '16 - 9', map: 'Inferno', status: 'WIN', event: 'ESL Pro League S20' },
  ];

  const stats = [
    { label: 'World Ranking', value: '#3', icon: <Trophy size={28} /> },
    { label: 'Active Players', value: '85K+', icon: <Users size={28} /> },
    { label: 'Majors Won', value: '5', icon: <Award size={28} /> },
    { label: 'Maps Played', value: '3.2K', icon: <Target size={28} /> },
  ];

  const weapons = [
    { name: 'AK-47', kills: '48,230', accuracy: '24.5%' },
    { name: 'AWP', kills: '31,890', accuracy: '62.1%' },
    { name: 'M4A4', kills: '39,100', accuracy: '28.3%' },
    { name: 'Desert Eagle', kills: '12,450', accuracy: '35.8%' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="bg-[#060608] text-white min-h-screen font-sans overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center saturate-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/30 via-[#060608]/70 to-[#060608]" />
          
          {/* Blobs */}
          <motion.div 
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }} 
            transition={{ duration: 5, repeat: Infinity }} 
            className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(245,158,11,0.25),_transparent_70%)] rounded-full" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.1, 0.25, 0.1] }} 
            transition={{ duration: 6, repeat: Infinity, delay: 1.5 }} 
            className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(239,68,68,0.15),_transparent_70%)] rounded-full" 
          />
        </div>

        <motion.div 
          variants={stagger} 
          initial="hidden" 
          animate="show" 
          className="relative z-10 text-center px-5 max-w-[900px] mx-auto"
        >
          <motion.div 
            variants={fadeUp} 
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_#F59E0B] animate-pulse" />
            <span className="text-amber-500 font-extrabold tracking-[4px] text-[11px] uppercase">Counter-Strike Division</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp} 
            className="text-[clamp(48px,10vw,120px)] font-black uppercase italic tracking-[-3px] leading-[0.95] mb-6"
          >
            Tactical<br />
            <span className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">Supremacy</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp} 
            className="text-gray-400 text-[clamp(16px,2vw,22px)] max-w-[600px] mx-auto mb-10 leading-relaxed"
          >
            Where precision meets strategy. Join the elite <strong className="text-white">Counter-Strike 2</strong> squad dominating the competitive scene.
          </motion.p>

          <motion.div 
            variants={fadeUp} 
            className="flex gap-4 justify-center flex-wrap"
          >
            <a 
              href="https://www.facebook.com/groups/csgo.indonesia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block no-underline bg-amber-500 text-black font-black px-10 py-4 border-none uppercase tracking-[3px] text-sm cursor-pointer [clip-path:polygon(12px_0%,100%_0%,calc(100%-12px)_100%,0%_100%)] transition-transform hover:scale-105"
              style={{ textDecoration: 'none' }}
            >
              <span className="flex items-center gap-2.5"><Crosshair size={18} /> Join The Squad</span>
            </a>
            <a 
              href="https://www.youtube.com/@ESLCSHighlights" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block no-underline bg-transparent text-white font-bold px-10 py-4 border border-white/15 uppercase tracking-[3px] text-sm cursor-pointer backdrop-blur-md transition-colors hover:border-amber-500"
              style={{ textDecoration: 'none' }}
            >
              <span className="flex items-center gap-2.5"><Eye size={18} /> Watch Highlights</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[4px] uppercase text-amber-500 font-extrabold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative z-10 mt-16 px-5 max-w-[1200px] mx-auto mb-32">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              whileHover={{ y: -4 }}
              className="bg-[#0A0A0E]/85 backdrop-blur-3xl border border-white/5 p-8 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="text-amber-500 mb-4 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] flex justify-center">{s.icon}</div>
              <div className="text-4xl font-black tracking-tighter mb-1">{s.value}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-[3px] font-bold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ROSTER ═══ */}
      <section className="py-[120px] px-5 max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-[3px] bg-amber-500" />
            <span className="text-amber-500 font-extrabold tracking-[4px] uppercase text-[13px]">The Roster</span>
          </div>
          <h2 className="text-[clamp(36px,6vw,64px)] font-black uppercase italic tracking-[-2px] leading-none m-0">
            Elite <span className="text-gray-500">Operators</span>
          </h2>
        </motion.div>

<div className="grid grid-cols-6 gap-6">          {players.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredPlayer(p.id)} 
              onMouseLeave={() => setHoveredPlayer(null)}
className={`
  col-span-2
  relative bg-[#0A0A0E] rounded-xl overflow-hidden border transition-all duration-500

  ${i === 3 ? 'col-start-2' : ''}
  ${i === 4 ? 'col-start-4' : ''}

  ${
    hoveredPlayer === p.id
      ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
      : 'border-white/5 shadow-none'
  }
`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/30 to-transparent z-[2]" />
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredPlayer === p.id ? 'grayscale-0 scale-108' : 'grayscale-[0.8] scale-100'
                  }`} 
                />
                <div className="absolute top-3 left-3 z-[3] bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded flex items-center gap-1.5">
                  <Crosshair size={12} className="text-amber-500" />
                  <span className="text-[10px] font-extrabold tracking-widest uppercase">{p.role}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 z-[3]">
                  <h3 className="text-3xl font-black uppercase italic mb-1 tracking-tighter">{p.name}</h3>
                  <div 
                    className={`grid grid-cols-3 gap-2 border-t border-white/10 pt-3 mt-2 transition-all duration-500 ${
                      hoveredPlayer === p.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                    }`}
                  >
                    {[['Rating', p.rating], ['K/D', p.kd], ['HS%', p.hs]].map(([l, v]) => (
                      <div key={l} className="text-center">
                        <div className="text-[9px] text-gray-500 tracking-[2px] uppercase mb-0.5">{l}</div>
                        <div className="text-base font-black text-white">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div 
                className={`absolute bottom-0 left-0 h-[3px] bg-amber-500 transition-all duration-500 z-[10] ${
                  hoveredPlayer === p.id ? 'w-full' : 'w-0'
                }`} 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ WEAPON STATS ═══ */}
      <section className="py-20 px-5 bg-gradient-to-b from-[#060608] to-[#0A0A10] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(245,158,11,0.05),_transparent_70%)] pointer-events-none" />
        <div className="max-w-[900px] mx-auto relative z-[2]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Target size={18} className="text-amber-500" />
              <span className="text-gray-500 font-extrabold tracking-[4px] uppercase text-[12px]">Arsenal</span>
            </div>
            <h2 className="text-[clamp(32px,5vw,56px)] font-black uppercase italic tracking-[-2px] m-0">
              Weapon <span className="text-amber-500">Stats</span>
            </h2>
          </motion.div>

          <div className="grid gap-3">
            {weapons.map((w, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-3 items-center px-7 py-5 bg-[#0C0C10] border border-white/5 rounded-xl transition-colors cursor-default hover:border-amber-500/20"
              >
                <div className="font-black text-xl uppercase tracking-wider">{w.name}</div>
                <div className="text-center">
                  <span className="text-[10px] text-gray-500 tracking-[2px] uppercase">Kills </span>
                  <span className="font-extrabold text-amber-500">{w.kills}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 tracking-[2px] uppercase">Accuracy </span>
                  <span className="font-extrabold">{w.accuracy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MATCHES ═══ */}
      <section className="py-20 px-5 max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Zap size={18} className="text-amber-500" />
            <span className="text-gray-500 font-extrabold tracking-[4px] uppercase text-[12px]">Battle Log</span>
          </div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-black uppercase italic tracking-[-2px] m-0">
            Recent <span className="text-amber-500">Matches</span>
          </h2>
        </motion.div>

        <div className="grid gap-4">
          {matches.map((m, i) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.12 }}
              className="flex flex-wrap items-center justify-between gap-5 px-8 py-6 bg-[#0C0C10] border border-white/5 rounded-xl transition-colors hover:border-amber-500/25"
            >
              <div className="min-w-[150px]">
                <div className="text-[12px] text-gray-500 font-bold tracking-[2px] mb-1">{m.event}</div>
                <div className="text-[11px] text-amber-500 font-bold tracking-wider">{m.map}</div>
              </div>
              <div className="flex items-center gap-5 flex-wrap justify-center">
                <span className="font-black text-2xl uppercase tracking-tighter">{m.teamA}</span>
                <div className="bg-black/50 px-5 py-2 rounded-lg border border-white/10">
                  <span className="font-black text-2xl tracking-[2px]">{m.score}</span>
                </div>
                <span className="font-black text-2xl uppercase text-gray-500 tracking-tighter">{m.teamB}</span>
              </div>
              <div className={`px-4.5 py-1.5 rounded-full border text-xs font-black tracking-[3px] uppercase flex items-center gap-1.5 ${
                m.status === 'WIN' 
                ? 'border-green-500/30 bg-green-500/10 text-green-500' 
                : 'border-red-500/30 bg-red-500/10 text-red-500'
              }`}>
                {m.status === 'WIN' ? <Trophy size={14} /> : <Shield size={14} />} {m.status}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-[120px] px-5 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-amber-500 mix-blend-multiply opacity-85 z-[2]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] to-transparent z-[3]" />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="relative z-10 max-w-[700px] mx-auto"
        >
          <Crosshair size={48} className="mx-auto mb-6 opacity-60" />
          <h2 className="text-[clamp(36px,7vw,72px)] font-black uppercase italic tracking-[-2px] mb-4 text-white">
            Ready to <span className="text-amber-500">Compete?</span>
          </h2>
          <p className="text-gray-300 text-[clamp(14px,2vw,20px)] mb-10 leading-relaxed font-semibold">
            Join our Discord, participate in scrims, and prove your aim. The next Major champion could be you.
          </p>
          <button className="bg-black text-amber-500 font-black px-12 py-4.5 border-none text-base uppercase tracking-[3px] cursor-pointer [clip-path:polygon(14px_0%,100%_0%,calc(100%-14px)_100%,0%_100%)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <span className="flex items-center gap-3">Join Discord <ChevronRight size={20} /></span>
          </button>
        </motion.div>
      </section>

      {/* Custom CSS overrides to guarantee NO underlines on any interactive states */}
      <style dangerouslySetInnerHTML={{
        __html: `
        a, a:hover, a:focus, a:active {
          text-decoration: none !important;
          outline: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }
      `}} />
    </div>
  );
};

export default CSGOCommunity;
