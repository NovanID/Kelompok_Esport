import React, { useState } from 'react';

const players = [
  {
    id: 1,
    name: 'Mirza',
    role: 'Rifler',
    team: 'Novanny',
    image: '/src/assets/mirza.jpeg', 
    kills: 1240,
    kd: '4.2',
    matches: 120,
  },
  {
    id: 2,
    name: 'Ridho',
    role: 'Medic',
    team: 'Freakmen',
    image: '/src/assets/ridho.jpeg',
    kills: 1150,
    kd: '3.8',
    matches: 115,
  },
  {
    id: 3,
    name: 'Hafizh',
    role: 'Sniper',
    team: 'Sekot',
    image: '/src/assets/hafizh.jpeg',
    kills: 1320,
    kd: '5.1',
    matches: 110,
  },
  {
    id: 4,
    name: 'Dani',
    role: 'Supporter',
    team: 'Morph',
    image: '/src/assets/dani.jpeg',
    kills: 980,
    kd: '3.2',
    matches: 105,
  },
  {
    id: 5,
    name: 'Satria',
    role: 'Rusher',
    team: 'Satria',
    image: '/src/assets/satria.jpeg',
    kills: 1100,
    kd: '4.0',
    matches: 118,
  },
];

const matches = [
  {
    id: 1,
    date: '23 Mei 2026',
    team1: 'Hilling Strike',
    team2: 'Team Beta',
    score1: 12,
    score2: 8,
    time: '19:00 WIB',
    status: 'selesai',
    w: 1,
  },
  {
    id: 2,
    date: '25 Mei 2026',
    team1: 'Team Gamma',
    team2: 'Hilling Strike',
    score1: 5,
    score2: 10,
    time: '20:00 WIB',
    status: 'selesai',
    w: 2,
  },
  {
    id: 3,
    date: '27 Mei 2026',
    team1: 'Hilling Strike',
    team2: 'Team Gamma',
    score1: null,
    score2: null,
    time: '19:30 WIB',
    status: 'upcoming',
    w: 0,
  },
  {
    id: 4,
    date: '30 Mei 2026',
    team1: 'Team Alpha',
    team2: 'Hilling Strike',
    score1: null,
    score2: null,
    time: '20:00 WIB',
    status: 'upcoming',
    w: 0,
  },
];
 function Point (){
  return (
    <section className="min-h-screen bg-black text-white">

      {/* ── BANNER ───────────────────────────────── */}
      {/* h-65 = 260px canonical, md:h-85 = 340px canonical */}
      <div className="relative w-full h-65 md:h-85 overflow-hidden bg-gray-900">
        <img
          src="https://www.pointblank.id/images/common/og_image.jpg"
          alt="point blank banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* bg-linear-to-b canonical (replaces bg-gradient-to-b) */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-900/60 via-orange-800/40 to-black" />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* ── INTRODUCTION ─────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-center text-white mb-10 italic">
          INTRODUCTION
        </h2>
        <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed text-center max-w-5xl mx-auto">
          <div className="space-y-4 text-white text-sm md:text-base leading-relaxed">
            <p>
              Hilling Strike Point Blank Division terbentuk dengan ambisi menjadi tim terdepan di kancah
              Point Blank kompetitif Indonesia. Beranggotakan pemain-pemain terbaik yang telah teruji
              di berbagai turnamen lokal maupun nasional.
            </p>
            <p>
              Divisi Point Blank Hilling Strike terus berkembang dengan merekrut talenta muda berbakat
              yang memiliki skill mumpuni dan semangat juang tinggi. Setiap pemain dipilih melalui
              seleksi ketat untuk memastikan kualitas terbaik.
            </p>
            <p>
              Kini Hilling Strike Point Blank Division siap bersaing di level tertinggi dan mengharumkan
              nama tim di berbagai kompetisi bergengsi, membawa pulang trophy demi trophy untuk
              para supporter setia kami.
            </p>
          </div>
        </div>
      </div>

      {/* ── PLAYERS ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-12">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-center text-white mb-8">
          PEMAIN
        </h2>
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {players.slice(0, 3).map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
        {/* Row 2: 2 cards centered */}
        <div className="grid grid-cols-2 gap-4 md:w-2/3 mx-auto">
          {players.slice(3, 5).map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </div>

      {/* ── MATCHES ──────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 pb-16">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-center text-white mb-8">
          PERTANDINGAN
        </h2>
        <div className="flex flex-col gap-3">
          {matches.map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      </div>

    </section>
  );
}

/* ── PlayerCard ─────────────────────────────────────────────────── */
function PlayerCard({ player }) {
  const roleColors = {
    Rifler:    'text-red-600 bg-red-50 border-red-200',
    Medic:     'text-green-600 bg-green-50 border-green-200',
    Sniper:    'text-blue-600 bg-blue-50 border-blue-200',
    Supporter: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    Rusher:    'text-orange-600 bg-orange-50 border-orange-200',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 shadow-lg">
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: '100%' }}>
        <img
          src={player.image}
          alt={player.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${roleColors[player.role] || 'text-gray-500 bg-gray-50 border-gray-200'}`}
        >
          {player.role}
        </span>
      </div>

      {/* Info */}
      <div className="px-3 py-3">
        <h4 className="font-bold text-gray-900 text-sm tracking-wide truncate">{player.name}</h4>
        <p className="text-gray-400 text-xs mt-0.5 truncate">{player.team}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-orange-500 font-black text-sm">{player.kills.toLocaleString()}</div>
            <div className="text-gray-400 text-[10px] uppercase tracking-wider">Kills</div>
          </div>
          <div className="w-px h-5 bg-gray-100" />
          <div className="text-center">
            <div className="text-gray-900 font-black text-sm">{player.kd}</div>
            <div className="text-gray-400 text-[10px] uppercase tracking-wider">K/D</div>
          </div>
          <div className="w-px h-5 bg-gray-100" />
          <div className="text-center">
            <div className="text-gray-700 font-black text-sm">{player.matches}</div>
            <div className="text-gray-400 text-[10px] uppercase tracking-wider">Match</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MatchRow ────────────────────────────────────────────────────── */
function MatchRow({ match }) {
  const isUpcoming = match.status === 'upcoming';

  return (
    <div
      className={`bg-white flex items-center gap-3 md:gap-6 rounded-2xl px-4 md:px-6 py-4 shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-200
        ${isUpcoming ? 'border-l-4 border-orange-400' : 'border-l-4 border-gray-200'}`}
    >
      {/* Date */}
      <div className="hidden sm:block text-xs text-orange-500 font-semibold w-24 shrink-0">
        {match.date}
      </div>

      {/* Team 1 */}
      <div className="flex-1 text-right">
        <span className={`font-bold text-sm md:text-base tracking-wide ${
          match.w === 1 ? 'text-gray-900' : match.w === 2 ? 'text-gray-400' : 'text-gray-700'
        }`}>
          {match.team1}
        </span>
      </div>

      {/* Score / VS */}
      {/* min-w-20 = canonical for min-w-[80px] */}
      <div className="shrink-0 text-center min-w-20">
        {isUpcoming ? (
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-gray-400 tracking-widest bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
              VS
            </span>
            <span className="text-[10px] text-orange-500 font-semibold mt-1">{match.time}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className={`text-xl font-black ${match.w === 1 ? 'text-green-600' : 'text-gray-400'}`}>
              {match.score1}
            </span>
            <span className="text-gray-300 font-bold">:</span>
            <span className={`text-xl font-black ${match.w === 2 ? 'text-green-600' : 'text-gray-400'}`}>
              {match.score2}
            </span>
          </div>
        )}
      </div>

      {/* Team 2 */}
      <div className="flex-1 text-left">
        <span className={`font-bold text-sm md:text-base tracking-wide ${
          match.w === 2 ? 'text-gray-900' : match.w === 1 ? 'text-gray-400' : 'text-gray-700'
        }`}>
          {match.team2}
        </span>
      </div>

      {/* Status */}
      <div className="hidden sm:block shrink-0 w-20 text-right">
        {isUpcoming ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-600">
            Upcoming
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500">
            Selesai
          </span>
        )}
      </div>
    </div>
  );
}

export default Point;
