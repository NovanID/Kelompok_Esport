import { Link } from "react-router-dom";
import { divisions } from "../../data/divisions";
import logoEsport from "../../assets/logo_esport1.png";
import coachRidhoImg from "../../assets/mirza.jpeg";
import coachStormImg from "../../assets/Brian.png";
import playerHafizhImg from "../../assets/hafizh.jpeg";
import playerSatriaImg from "../../assets/satria.jpeg";
import playerRidhoImg from "../../assets/ridho.jpeg";
import playerDaniImg from "../../assets/dani.jpeg";
import playerTzyImg from "../../assets/tzy.png";
import playerUppiImg from "../../assets/Uppi.png";
import playerBrianImg from "../../assets/Brian.png";
import playerDit2Img from "../../assets/dit2.png";

export default function Ff() {
  const division = divisions.freefire;
  const accentColor = division.accent;

  const playerImageMap = {
    "HS_Hafizh": playerHafizhImg,
    "HS_Khalista": playerSatriaImg,
    "HS_Mirza": playerRidhoImg,
    "HS_Rizki": playerDaniImg
  };

  const subPlayerImageMap = {
    "HS_Ixzy": playerTzyImg,
    "HS_Uppi": playerUppiImg,
    "HS_Brian": playerBrianImg,
    "HS_Yana": playerDit2Img
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Art - Logo Esport */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-screen overflow-hidden">
        <img src={logoEsport} alt="Art Background" className="w-[150vw] md:w-[80vw] max-h-screen object-contain rotate-12 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black pointer-events-none"></div>

      {/* FF Character - Background Content Area */}
      <div className="absolute bottom-0 right-0 w-full h-[65%] pointer-events-none overflow-hidden">
        <img
          src="https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/526ab8efaf60be59ccf03e314e019a3a.jpg"
          alt=""
          className="absolute right-0 bottom-0 h-full w-full object-contain object-right-bottom opacity-[0.15]"
        />
        <img
          src={logoEsport}
          alt=""
          className="absolute left-10 bottom-10 w-40 md:w-56 object-contain opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Hero Section */}
      <div className="relative" style={{ backgroundImage: 'url(https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/526ab8efaf60be59ccf03e314e019a3a.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 20%', minHeight: '100vh' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        {/* Background Watermark in Hero */}
        <div className="absolute right-6 bottom-16 opacity-[0.08] pointer-events-none z-0 hidden md:block">
          <img src={logoEsport} alt="Watermark" className="w-48 object-contain" />
        </div>


        <div className="absolute top-16 left-6 z-10">
          <Link to="/" className="inline-block px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl transition-all text-sm font-semibold shadow-lg">
            ← Kembali ke Home
          </Link>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-32 pb-16 px-4 text-center">
          {/* Logo Esport */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-500 ease-out">
            <img src={logoEsport} alt="Logo Esport" className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
          </div>

          <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <p className="text-gray-300 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Hilling Strike</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-4 drop-shadow-[0_0_30px_rgba(255,176,133,0.3)]" style={{ color: accentColor, textTransform: 'uppercase', letterSpacing: '2px' }}>
            FREE FIRE
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto mb-10">
            {division.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl w-full">
            <div className="flex-1 min-w-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Win Rate</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: accentColor }}>{division.teams[0].winRate}</p>
            </div>
            <div className="flex-1 min-w-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Turnamen</p>
              <p className="text-2xl md:text-3xl font-bold text-white">8<span className="text-sm font-normal text-gray-400 ml-1">Event</span></p>
            </div>
            <div className="flex-1 min-w-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Peringkat</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: accentColor }}>#1<span className="text-sm font-normal text-gray-400 ml-1">Nasional</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Bento Grid Layout */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column - Roster & Schedule (Span 8) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Roster Section */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-wider" style={{ color: accentColor }}>Main Roster</h2>
                  <p className="text-gray-400 mt-2 text-sm">Pasukan elit pembawa kemenangan.</p>
                </div>
                <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                  <span className="text-xl">⚔️</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {division.roasterMain.map((player) => (
                  <div key={player.name} className="relative group rounded-2xl overflow-hidden border border-white/5 bg-slate-800/50 hover:border-white/20 transition-all duration-300">
                    <img src={playerImageMap[player.name] || player.image} alt={player.name} className="w-full aspect-[3/4] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>{player.role}</p>
                      <h4 className="font-bold text-lg leading-tight text-white">{player.name}</h4>
                      <div className="flex justify-between mt-3">
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase">Kills</p>
                          <p className="text-xs font-bold">{player.kills}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-400 uppercase">Rating</p>
                          <p className="text-xs font-bold" style={{ color: accentColor }}>{player.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Roster */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-6 text-gray-300">Substitutes / Academy</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {division.roasterSub.map((player) => (
                  <div key={player.name} className="relative group rounded-2xl overflow-hidden border border-white/5 bg-slate-800/50 hover:border-white/20 transition-all duration-300">
                    <img src={subPlayerImageMap[player.name] || player.image} alt={player.name} className="w-full aspect-[3/4] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>{player.role}</p>
                      <h4 className="font-bold text-lg leading-tight text-white mb-1">{player.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rankings */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 relative z-10" style={{ color: accentColor }}>
                Papan Peringkat
              </h2>
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                      <th className="pb-4 font-medium pl-4">Posisi</th>
                      <th className="pb-4 font-medium">Tim</th>
                      <th className="pb-4 font-medium text-center">Poin</th>
                      <th className="pb-4 font-medium text-center">W/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {division.rankings.map((row, idx) => (
                      <tr key={idx} className={`group transition-colors ${idx === 0 ? 'bg-white/5' : 'hover:bg-white/5'}`}>
                        <td className="py-4 pl-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${idx === 0 ? 'bg-white/20 text-white' : 'text-gray-500'}`}>
                            {row.rank}
                          </span>
                        </td>
                        <td className="py-4 font-bold text-sm md:text-base">
                          {row.team} {idx === 0 && <span className="ml-2 text-sm">👑</span>}
                        </td>
                        <td className="py-4 text-center font-bold text-lg" style={{ color: accentColor }}>
                          {row.points}
                        </td>
                        <td className="py-4 text-center text-sm text-gray-400">
                          <span className="text-white">{row.wins}</span> - {row.losses}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column - Team Info, Coach, Schedule (Span 4) */}
          <div className="lg:col-span-4 space-y-8">

            {/* Team Info Card */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-8xl opacity-10 font-black italic transform group-hover:scale-110 transition-transform duration-500" style={{ color: accentColor }}>
                #1
              </div>
              <p className="text-xs text-gray-300 uppercase tracking-widest mb-2">Team Profile</p>
              <h2 className="text-4xl font-black uppercase mb-6" style={{ color: accentColor }}>{division.teams[0].name}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Didirikan</span>
                  <span className="font-bold">{division.teams[0].founded}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Total Menang</span>
                  <span className="font-bold text-white">{division.teams[0].wins} Match</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 text-sm">Total Kalah</span>
                  <span className="font-bold text-white">{division.teams[0].losses} Match</span>
                </div>
              </div>
            </div>

            {/* Coach Section */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ color: accentColor }}>Staff & Pelatih</h2>
              <div className="space-y-6">
                {division.coaches.map((coach, index) => {
                  const coachImage = index === 0 ? coachRidhoImg : coachStormImg;
                  return (
                    <div key={coach.name} className="flex flex-col sm:flex-row items-stretch rounded-2xl bg-black/20 hover:bg-black/40 transition-all duration-300 border border-white/5 overflow-hidden text-center sm:text-left">
                      <img
                        src={coachImage}
                        alt={coach.name}
                        className="w-full sm:w-36 h-48 sm:h-auto object-cover flex-shrink-0"
                      />
                      <div className="p-6 flex flex-col justify-center flex-1">
                        <p className="text-xs uppercase font-bold text-gray-400 mb-1">{coach.position}</p>
                        <h4 className="font-bold text-white text-xl leading-tight mb-1">{coach.name}</h4>
                        <p className="text-xs text-gray-500">{coach.specialty}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule Section */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ color: accentColor }}>Jadwal Match</h2>
              <div className="space-y-4">
                {division.teams[0].stats.map((match, idx) => (
                  <div key={idx} className="relative p-5 rounded-xl bg-slate-800/50 border border-white/5 overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accentColor }}></div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{match.date} • {match.time}</p>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sm w-[40%] truncate">{match.team1}</span>
                      <span className="text-[10px] font-black px-2 py-1 bg-white/10 rounded">VS</span>
                      <span className="font-bold text-sm w-[40%] text-right text-gray-300 truncate">{match.team2}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate" style={{ color: accentColor }}>{match.tournament}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}