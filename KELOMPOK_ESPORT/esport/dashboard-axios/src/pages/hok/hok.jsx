import { Link } from "react-router-dom";
import { divisions } from "../../data/divisions";
import hokBanner from "../../assets/HOK_banner.png";
import playerHafizhImg from "../../assets/hafizh.jpeg";
import playerRidhoImg from "../../assets/ridho.jpeg";
import playerDaniImg from "../../assets/dani.jpeg";
import playerMirzaImg from "../../assets/mirza.jpeg";
import playerBrianImg from "../../assets/Brian.png";
import coachIxzyImg from "../../assets/tzy.png";
import coachSatriaImg from "../../assets/satria.jpeg";

/**
 * ==========================================
 * HALAMAN UTAMA DIVISI HONOR OF KINGS (HOK)
 * ==========================================
 * Fungsi utama untuk menampilkan profil tim Honor of Kings Hilling Strike,
 * menyajikan ringkasan statistik divisi, formasi pemain berdasarkan lane,
 * profil pelatih & asisten, filosofi strategi, prestasi tim, dan jadwal match.
 */
export default function Hok() {
  const division = divisions.hok;
  const accentColor = division.accent;

  const playerImageMap = {
    "HS_Mirza": playerRidhoImg,
    "HS_Ridho": playerMirzaImg,
    "HS_Rizki": playerDaniImg,
    "HS_Hafizh": playerHafizhImg,
    "HS_Brian": playerBrianImg
  };

  const coachImageMap = {
    "Coach Ixzy": coachIxzyImg,
    "Coach Satria": coachSatriaImg
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ==========================================
          1. HERO SECTION & STATISTIK RINGKASAN
          Menampilkan banner game Honor of Kings dan ringkasan metrik
          seperti total roster, jumlah turnamen, dan pencapaian juara.
         ========================================== */}
      <section
        className="relative overflow-hidden px-6 pt-[85vh] pb-12 lg:px-20 min-h-[115vh] flex flex-col justify-end items-center bg-cover bg-center text-center"
        style={{ backgroundImage: `url(${hokBanner})` }}
      >
        {/* Overlay - No blur, subtle darkening to make banner clear */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Bottom fade to content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="space-y-8 w-full flex flex-col items-center">
            <div className="inline-flex items-center justify-center gap-3 rounded-full border border-[#ffd70055] bg-[#ffffff11] px-4 py-2 text-sm uppercase tracking-[0.2em] text-[#ffd700]">
              HONOR OF KINGS
            </div>
            {/* Menampilkan ringkasan statistik (total match, win rate, turnamen) di bawah banner HOK */}
            <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
              {division.stats.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-[#ffffff19] bg-[#08101f]/80 backdrop-blur-md p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9ca3af]">{item.label}</p>
                  <p className="mt-4 text-3xl font-bold" style={{ color: accentColor }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-[#ffd70066] bg-[#ffd70014] px-6 py-3 text-sm font-semibold text-[#ffd700] transition hover:bg-[#ffd70022]"
              >
                ← Kembali ke Home
              </Link>
              <a
                href="#formation"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Lihat Formasi
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 pb-20 space-y-10">
        {/* ==========================================
            2. FORMASI PEMAIN UTAMA (MAIN ROSTER)
            Menampilkan kartu formasi pemain inti berdasarkan layout lane
            (Clash, Jungle, Mid, Farm, Roam) beserta statistik Kills & Rating.
           ========================================== */}
        <section id="formation" className="rounded-[2rem] border border-[#ffffff14] bg-[#08101b] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <h2 className="text-4xl font-bold mb-8 uppercase" style={{ color: accentColor }}>
            Formasi Pemain
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
            {division.roasterMain.map((player, index) => (
              <div 
                key={player.name} 
                className={`relative group rounded-3xl overflow-hidden border border-[#ffffff1a] bg-[#0f1726] hover:border-white/20 transition-all duration-300 w-full sm:col-span-2 ${
                  index === 3 ? 'sm:col-start-2' : ''
                } ${
                  index === 4 ? 'sm:col-start-4' : ''
                }`}
              >
                <img src={playerImageMap[player.name] || player.image} alt={player.name} className="w-full aspect-[3/4] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020716] via-[#020716]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>{player.role}</p>
                  <h4 className="font-bold text-xl leading-tight text-white">{player.name}</h4>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase">Kills</p>
                      <p className="text-sm font-bold text-white">{player.kills}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-400 uppercase">Rating</p>
                      <p className="text-sm font-bold" style={{ color: accentColor }}>{player.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content split in HOK (Pelatih & Strategi on left, Prestasi & Jadwal on right) */}
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {/* ==========================================
                3. STAF PELATIH & FILOSOFI (COACH SECTION)
                Menampilkan profil pelatih kepala dan asisten pelatih,
                termasuk nama, spesialisasi, dan pengalaman mereka.
               ========================================== */}
            <section className="rounded-[2rem] border border-[#ffffff14] bg-[#08101b] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-4xl font-bold mb-8 uppercase" style={{ color: accentColor }}>
                Pelatih & Filosofi
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {division.coaches.map((coach) => (
                  <div key={coach.name} className="flex flex-col sm:flex-row items-stretch rounded-3xl border border-[#ffffff1a] bg-[#0f1726] overflow-hidden text-center sm:text-left">
                    <img
                      src={coachImageMap[coach.name] || coach.image}
                      alt={coach.name}
                      className="w-full sm:w-36 h-48 sm:h-auto object-cover flex-shrink-0"
                    />
                    <div className="p-6 flex flex-col justify-center flex-1">
                      <p className="text-xs uppercase font-bold text-gray-400 mb-1">{coach.position}</p>
                      <h4 className="font-bold text-white text-xl leading-tight mb-1" style={{ color: accentColor }}>{coach.name}</h4>
                      <p className="text-xs text-[#cbd5e1] mb-1">{coach.specialty}</p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500">{coach.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ==========================================
                4. STRATEGI UTAMA PERMAINAN (TACTICAL STRATEGY)
                Menjelaskan fokus taktik tim dalam game, seperti
                kontrol objektif (turtle/lord) dan penentuan draft hero.
               ========================================== */}
            <section className="rounded-[2rem] border border-[#ffffff14] bg-[#08101b] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-4xl font-bold mb-8 uppercase" style={{ color: accentColor }}>
                Strategi Utama
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#ffd70033] bg-[#0f1726] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#9ca3af]">Kontrol Objektif</p>
                  <p className="mt-4 text-lg text-[#e5e7eb]">
                    Fokus pada turtle dan lord untuk mendapatkan keunggulan inti di fase tengah dan akhir.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#ffd70033] bg-[#0f1726] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#9ca3af]">Draft Hero</p>
                  <p className="mt-4 text-lg text-[#e5e7eb]">
                    Pilih hero fleksibel dengan counter kuat dan sinergi tim untuk dominasi lane.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            {/* ==========================================
                5. PRESTASI & PENCAPAIAN TIM (TEAM ACHIEVEMENTS)
                Menampilkan jumlah kemenangan match dan persentase win rate
                tim HOK Hilling Strike secara visual.
               ========================================== */}
            <section className="rounded-[2rem] border border-[#ffffff14] bg-[#08101b] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-3xl font-bold mb-6 uppercase" style={{ color: accentColor }}>
                Prestasi Tim
              </h2>
              <div className="space-y-4">
                <div className="rounded-3xl bg-[#0f1726] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#9ca3af]">Juara</p>
                  <p className="mt-3 text-3xl font-bold" style={{ color: accentColor }}>{division.teams[0].wins}</p>
                  <p className="mt-2 text-sm text-[#cbd5e1]">Catatan kemenangan tim HOK.</p>
                </div>
                <div className="rounded-3xl bg-[#0f1726] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#9ca3af]">Win Rate</p>
                  <p className="mt-3 text-3xl font-bold" style={{ color: accentColor }}>{division.teams[0].winRate}</p>
                  <p className="mt-2 text-sm text-[#cbd5e1]">Konsistensi performa di setiap turnamen.</p>
                </div>
              </div>
            </section>

            {/* ==========================================
                6. JADWAL LAGA TANDING (UPCOMING MATCHES)
                Menampilkan daftar jadwal tanding tim HOK di turnamen mendatang
                beserta detail tanggal, waktu, dan nama tim lawan.
               ========================================== */}
            <section className="rounded-[2rem] border border-[#ffffff14] bg-[#08101b] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <h2 className="text-3xl font-bold mb-6 uppercase" style={{ color: accentColor }}>
                Jadwal Pertandingan
              </h2>
              <div className="space-y-4">
                {division.teams[0].stats.map((match, idx) => (
                  <div key={idx} className="rounded-3xl bg-[#0f1726] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#9ca3af]">{match.date}</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#d1d5db]">VS</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold" style={{ color: accentColor }}>{match.team1}</p>
                      <p className="text-sm text-[#cbd5e1]">{match.time}</p>
                      <p className="font-bold" style={{ color: accentColor }}>{match.team2}</p>
                    </div>
                    <p className="mt-3 text-sm text-[#9ca3af]">{match.tournament}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </section>
  );
}
