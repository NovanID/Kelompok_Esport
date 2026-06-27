import React, { useMemo, useState } from 'react';
import aboutImg from '../../assets/logo_esport1.png';

const tabs = ['RESULTS', 'UPCOMING'];
const games = ['ALL', 'PUBG', 'FREE FIRE', 'MOBILE LEGEND', 'HONOR OF KING', 'VALORANT', 'DOTA2', 'CSGO', 'POINT BLANK'];

const matches = [
  {
    id: 1,
    game: 'MOBILE LEGEND',
    type: 'RESULTS',
    title: 'HILING STRIKE vs NAVI',
    date: '10 May',
    time: '05:15 PM',
    status: 'LOSE',
    scoreLeft: '1',
    scoreRight: '2',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'NAVI',
    leftLogo: aboutImg,
    rightLogo: 'https://cdn.dribbble.com/userupload/32242150/file/original-799ef2b69b025c1fe334105a76709c2d.jpg?resize=752x&vertical=center',
    league: 'MPL ID Season 17',
    stage: 'Regular Season',
    side: 'RESULT',
  },
  {
    id: 2,
    game: 'MOBILE LEGEND',
    type: 'RESULTS',
    title: 'HILING STRIKE vs Team Liquid ID',
    date: '08 May',
    time: '06:15 PM',
    status: 'LOSE',
    scoreLeft: '0',
    scoreRight: '2',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'Team Liquid ID',
    leftLogo: aboutImg,
    rightLogo: 'https://teamliquid.com/staff/OmniEulogy/TLLogoBottom2.jpg', 
    league: 'MPL ID Season 17',
    stage: 'Regular Season',
    side: 'RESULT',
  },
  {
    id: 3,
    game: 'FREE FIRE',
    type: 'RESULTS',
    title: 'HILING STRIKE Free Fire',
    date: '08 May',
    time: '03:08 PM',
    status: 'RANK 1',
    scoreLeft: 'Rank 1',
    scoreRight: '',
    leftTeam: 'HILING STRIKE Free Fire',
    rightTeam: '',
    leftLogo: aboutImg,
    rightLogo: '',
    league: 'FFWS SEA SPRING 2026',
    stage: 'Knockout Stage',
    side: 'RESULT',
  },
  {
    id: 4,
    game: 'FREE FIRE',
    type: 'UPCOMING',
    title: 'HILING STRIKE Free Fire vs Alter Ego',
    date: '15 May',
    time: '06:00 PM',
    status: 'UPCOMING',
    scoreLeft: '',
    scoreRight: '',
    leftTeam: 'HILING STRIKE Free Fire',
    rightTeam: 'Alter Ego',
    leftLogo: aboutImg,
    rightLogo: 'https://yt3.googleusercontent.com/ytc/AIdro_khejg9Kng7hneH-K0VDTBdzgUA7FqtbrkLCjh2XKZky_I=s900-c-k-c0x00ffffff-no-rj',
    league: 'FFWS SEA SPRING 2026',
    stage: 'Group Stage',
    side: 'UPCOMING',
  },
  {
    id: 5,
    game: 'PUBG',
    type: 'UPCOMING',
    title: 'HILING STRIKE vs Team Secret',
    date: '16 May',
    time: '07:30 PM',
    status: 'UPCOMING',
    scoreLeft: '',
    scoreRight: '',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'Team Secret',
    leftLogo: aboutImg,
    rightLogo: 'https://img.freepik.com/vektor-premium/logo-tanda-tanya-gratis_666658-256.jpg',
    league: 'PUBG Mobile Series',
    stage: 'Final Round',
    side: 'UPCOMING',
  },
  {
    id: 6,
    game: 'DOTA2',
    type: 'UPCOMING',
    title: 'HILING STRIKE vs TSM',
    date: '17 May',
    time: '04:00 PM',
    status: 'UPCOMING',
    scoreLeft: '',
    scoreRight: '',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'TSM',
    leftLogo: aboutImg,
    rightLogo: 'https://s3.eu-west-3.amazonaws.com/skinsnipe.com/img/csgo/collections/tsm.png',
    league: 'The International',
    stage: 'Group Stage',
    side: 'UPCOMING',
  },
  {
    id: 7,
    game: 'VALORANT',
    type: 'RESULTS',
    title: 'HILING STRIKE vs Bigetron',
    date: '09 May',
    time: '08:00 PM',
    status: 'WIN',
    scoreLeft: '2',
    scoreRight: '1',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'Bigetron',
    leftLogo: aboutImg,
    rightLogo: 'https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1-internal.aliyuncs.com/company-logo/9a8bdc336a22fe29b2c7330a618cdece.jpg',
    league: 'VCT SEA',
    stage: 'Playoffs',
    side: 'RESULT',
  },
  {
    id: 8,
    game: 'CSGO',
    type: 'UPCOMING',
    title: 'HILING STRIKE vs GEEKFAM',
    date: '18 May',
    time: '09:00 PM',
    status: 'UPCOMING',
    scoreLeft: '',
    scoreRight: '',
    leftTeam: 'HILING STRIKE',
    rightTeam: 'GEEKFAM',
    leftLogo: aboutImg,
    rightLogo: 'https://www.geekfam.asia/wp-content/uploads/2024/04/logo-homepage.png',
    league: 'ESL Pro League',
    stage: 'Quarter Finals',
    side: 'UPCOMING',
  },
  {
    id: 9,
    game: 'POINT BLANK',
    type: 'RESULTS',
    title: 'PB HILING STRIKE vs PB BOOM',
    date: '07 May',
    time: '05:00 PM',
    status: 'WIN',
    scoreLeft: '13',
    scoreRight: '8',
    leftTeam: 'PB HILING STRIKE',
    rightTeam: 'PB BOOM',
    leftLogo: aboutImg,
    rightLogo: 'https://i0.wp.com/esportsnesia.com/wp-content/uploads/2020/05/boom-esports-logo.jpg',
    league: 'PB National Cup',
    stage: 'Finals',
    side: 'RESULT',
  },
];

function Match() {
  const [activeTab, setActiveTab] = useState('RESULTS');
  const [activeGame, setActiveGame] = useState('ALL');

  const filtered = useMemo(
    () => matches.filter(
      (item) => item.type === activeTab && (activeGame === 'ALL' || item.game === activeGame)
    ),
    [activeTab, activeGame]
  );

  // Fungsi untuk mendapatkan logo game
  const getGameLogo = (gameName) => {
    const gameColors = {
      'MOBILE LEGEND': 'f97316',
      'FREE FIRE': 'ef4444',
      'PUBG': '10b981',
      'DOTA2': '8b5cf6',
      'VALORANT': 'ec4899',
      'CSGO': '3b82f6',
      'POINT BLANK': '14b8a6',
      'HONOR OF KING': 'f59e0b',
    };
    const color = gameColors[gameName] || '6b7280';
    return `https://ui-avatars.com/api/?name=${gameName.charAt(0)}&background=${color}&color=fff&rounded=true&size=32`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-red-600">MATCHES</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Latest Match Results & Upcoming Fixtures
          </h1>
        </div>

        <div className="rounded-full bg-slate-900 shadow-sm ring-1 ring-slate-700 p-1 flex items-center justify-center gap-2 mb-8 max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {games.map((game) => (
            <button
              key={game}
              onClick={() => setActiveGame(game)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeGame === game
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200/50'
                  : 'bg-slate-900 text-slate-300 ring-1 ring-slate-700 hover:bg-slate-800'
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center text-slate-400 shadow-sm">
              No matches found for selected filter.
            </div>
          ) : (
            filtered.map((match) => (
              <div key={match.id} className="group overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/20">
                <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={getGameLogo(match.game)}
                      alt={match.game}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{match.game}</span>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <div>{match.date}</div>
                    <div className="font-semibold text-white">{match.time}</div>
                  </div>
                </div>
                
                <div className="px-6 py-8">
                  <div className="flex items-center justify-between gap-4 text-center">
                    {/* Tim Kiri */}
                    <div className="flex-1">
                      {match.leftLogo && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={match.leftLogo} 
                            alt={match.leftTeam}
                            className="w-16 h-16 rounded-full object-cover shadow-lg ring-2 ring-slate-700"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(match.leftTeam)}&background=ef4444&color=fff&rounded=true&size=80`;
                            }}
                          />
                        </div>
                      )}
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {match.leftTeam}
                      </p>
                      <p className="mt-3 text-3xl font-black text-white">
                        {match.scoreLeft || '-'}
                      </p>
                    </div>
                    
                    {/* Skor / VS */}
                    <div className="flex-1">
                      {match.status === 'UPCOMING' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-semibold uppercase tracking-wider text-red-500">VS</span>
                          <div className="mt-2 text-xs text-slate-500">{match.status}</div>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-slate-500">{match.status}</p>
                          <p className="mt-2 text-3xl font-black text-white">
                            {match.scoreLeft && match.scoreRight ? `${match.scoreLeft} : ${match.scoreRight}` : '-'}
                          </p>
                        </>
                      )}
                    </div>
                    
                    {/* Tim Kanan */}
                    <div className="flex-1">
                      {match.rightLogo && match.rightTeam && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={match.rightLogo} 
                            alt={match.rightTeam}
                            className="w-16 h-16 rounded-full object-cover shadow-lg ring-2 ring-slate-700"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(match.rightTeam)}&background=3b82f6&color=fff&rounded=true&size=80`;
                            }}
                          />
                        </div>
                      )}
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {match.rightTeam || '-'}
                      </p>
                      <p className="mt-3 text-3xl font-black text-white">
                        {match.scoreRight || '-'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-800 px-4 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {match.league}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {match.stage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Match;