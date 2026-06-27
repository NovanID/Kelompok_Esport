import { useEffect, useRef, useState } from 'react';
import axios from "axios";

// Import Assets (Pastikan path ini sesuai dengan struktur folder kamu)
import aboutImg from '../../assets/logo_esport1.png';
import sponsor1  from "../../assets/sponsor1.jpg";  
import sponsor2  from "../../assets/sponsor2.png";  
import sponsor3  from "../../assets/sponsor3.png";  
import sponsor4  from "../../assets/sponsor4.avif"; 
import sponsor5  from "../../assets/sponsor5.png";  
import sponsor6  from "../../assets/sponsor6.png";  
import sponsor7  from "../../assets/sponsor7.png";  
import sponsor8  from "../../assets/sponsor8.png";  
import sponsor9  from "../../assets/sponsor9.png";  
import sponsor10 from "../../assets/sponsor10.png"; 

// ============ HERO SECTION ============
function Hero() {
  return (
    <section className="hero-section text-white">
      {/* Konten Hero kamu */}
    </section>
  );
}

// ============ ABOUT SECTION ============
function About() {
  const [counted, setCounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState({ tahun: 0, divisi: 0, atlet: 0, prestasi: 0 });
  const sectionRef = useRef(null);
  const targets = { tahun: 4, divisi: 7, atlet: 50, prestasi: 100 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          setVisible(true);
          animateCount();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const animateCount = () => {
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setCounts({
        tahun: Math.floor(targets.tahun * ease),
        divisi: Math.floor(targets.divisi * ease),
        atlet: Math.floor(targets.atlet * ease),
        prestasi: Math.floor(targets.prestasi * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-inner">
        <span className="outline-top"></span>
        <span className="outline-right"></span>
        <span className="outline-bottom"></span>
        <span className="outline-left"></span>

        <div className="about-left">
          <img src={aboutImg} alt="Tim Esport" className="about-img" />
        </div>

        <div className={`about-right ${visible ? 'about-right--visible' : ''}`}>
          <div className="about-tag">WHO WE ARE</div>
          <h2 className="about-title">ABOUT US</h2>
          <div className="about-divider"></div>
          <p className="about-desc">
            <strong>HILING STRIKE</strong> adalah organisasi Esport profesional yang berdiri
            sejak tahun 2020. Kami memiliki visi untuk menjadi tim Esport
            terbaik di Asia dan melahirkan atlet-atlet berbakat yang mampu
            berkompetisi di level dunia.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">{counts.tahun}+</span>
              <span className="stat-label">TAHUN BERDIRI</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{counts.divisi}</span>
              <span className="stat-label">DIVISI GAME</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{counts.atlet}+</span>
              <span className="stat-label">ATLET</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{counts.prestasi}+</span>
              <span className="stat-label">PRESTASI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ DIVISION SECTION ============
const games = [
  { id: "pubg",      name: "PUBG MOBILE",      type: "mobile", accent: "#c8a000", bg: "linear-gradient(160deg, #1c2d4a, #0d1a30)", charImg: "https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-16v1j.jpg" },
  { id: "freefire",  name: "FREE FIRE",         type: "mobile", accent: "#00bfff", bg: "linear-gradient(160deg, #0d2240, #050f20)", charImg: "https://asset.kompas.com/crops/-qfYPDY9h2x2QmPZjNuUu2T8qpE=/151x0:1231x720/1200x800/data/photo/2020/06/25/5ef405986c087.jpg" },
  { id: "mlbb",      name: "MOBILE LEGENDS",    type: "mobile", accent: "#d4a800", bg: "linear-gradient(160deg, #1a0a30, #0a0518)", charImg: "https://images.tokopedia.net/img/KRMmCm/2023/6/15/65e7e1d3-65f8-4f8b-b0a3-ac5c76acb2a2.jpg" },
  { id: "hok",       name: "HONOR OF KINGS",    type: "mobile", accent: "#ffd700", bg: "linear-gradient(160deg, #0d0d25, #050510)", charImg: "https://dt-webcons-web-xlrvm-prod-1394847165.cos.ap-jakarta.myqcloud.com/images/post/545aa85e-8522-400e-8195-73511129f424.jpg" },
  { id: "valorant",  name: "VALORANT",          type: "pc",     accent: "#ff4655", bg: "linear-gradient(160deg, #1a0a10, #0d0508)", charImg: "https://www.riotgames.com/darkroom/1200/1dbd7211e78ce5faa7a8af9d10afad47:2b5979e3922758399ba389561e797919/ps-f2p-val-console-launch-16x9.jpg" },
  { id: "dota2",     name: "DOTA 2",            type: "pc",     accent: "#c23c2a", bg: "linear-gradient(160deg, #0a1a10, #050d08)", charImg: "https://i.pcmag.com/imagery/reviews/00xeme7ybg1aolezzfqxhjv-4-hero-image-gallery.fit_scale.size_1050x594.v1569475078.jpg" },
  { id: "cs2",       name: "COUNTER-STRIKE 2",  type: "pc",     accent: "#e8b04a", bg: "linear-gradient(160deg, #111108, #080804)", charImg: "https://i0.wp.com/internet.medialities.org/wp-content/uploads/2024/02/7a767-csgo-operation-10-details.jpg?fit=1200%2C675&ssl=1&w=640" },
  { id: "pb",        name: "POINT BLANK",       type: "pc",     accent: "#00c853", bg: "linear-gradient(160deg, #0a1520, #050a10)", charImg: "https://hybrid.co.id/wp-content/uploads/2020/04/6aacf36edd9714e283ce5b32fd719461_point-blank-2020.jpg" },
];

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <rect x="5" y="2" width="14" height="20" rx="2" />
  </svg>
);

const PCIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

function Devision() {
  const handleMouseEnter = (e, game) => {
    const btn = e.currentTarget.querySelector(".dv-btn");
    const bar = e.currentTarget.querySelector(".dv-accent-bar");
    btn.style.background = game.accent;
    btn.style.color = "#000";
    btn.style.boxShadow = `0 0 18px ${game.accent}`;
    bar.style.transform = "scaleX(1)";
  };

  const handleMouseLeave = (e, game) => {
    const btn = e.currentTarget.querySelector(".dv-btn");
    const bar = e.currentTarget.querySelector(".dv-accent-bar");
    btn.style.background = "transparent";
    btn.style.color = game.accent;
    btn.style.boxShadow = "none";
    bar.style.transform = "scaleX(0)";
  };

  return (
    <section className="dv-section">
      <div className="dv-header">
        <p className="dv-header-label">DIVISION</p>
      </div>
      <div className="dv-scroll">
        {games.map((game) => (
          <div
            key={game.id}
            className="dv-card"
            style={{ background: game.bg }}
            onMouseEnter={(e) => handleMouseEnter(e, game)}
            onMouseLeave={(e) => handleMouseLeave(e, game)}
          >
            <div className="dv-accent-bar" style={{ background: game.accent, transform: "scaleX(0)" }} />
            <div className="dv-card-top">
              <div className="dv-icon-box">{game.type === "mobile" ? <MobileIcon /> : <PCIcon />}</div>
              <div className="dv-icon-box">{game.type === "mobile" ? <MobileIcon /> : <PCIcon />}</div>
            </div>
            <img className="dv-char" src={game.charImg} alt={game.name} />
            <div className="dv-bottom">
              <div className="dv-game-name" style={{ color: game.accent }}>{game.name}</div>
              <button className="dv-btn" style={{ color: game.accent, borderColor: game.accent }}>
                View Players
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ MATCH SECTION ============
function Match() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  // Daftar nama tim musuh agar tidak muncul "Romaguera-Crona"
  const enemyTeams = ["RRQ", "EVOS", "ONIC", "ALTER EGO", "BTR", "GEEK FAM", "AURA", "DEWA UNITED", "BOOM", "TALON"];

  useEffect(() => {
    let cancelled = false;

    // Tambahkan simulated delay 1.2s agar loading spinner terlihat dramatis & premium
    const timer = setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          if (cancelled) return;
          const data = res.data.slice(0, 10).map((item, index) => ({
            id: item.id,
            team1: "HS",
            // MENGUBAH DISINI: Mengambil dari array enemyTeams, bukan item.company.name
            team2: enemyTeams[index % enemyTeams.length], 
            stage: [
              "Grand Final",
              "Playoff",
              "Upper Bracket",
              "Knockout",
              "Swiss Stage",
            ][index % 5],
            game: [
              "VALORANT",
              "PUBG MOBILE",
              "MLBB",
              "FREE FIRE",
              "CS2",
            ][index % 5],
            result: Math.random() > 0.5 ? "WIN" : "LOSE",
            time: `${10 + index}:00 PM`,
          }));

          setMatches(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          if (!cancelled) setLoading(false);
        });
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <section className="match-section">
        <div className="match-section-header">
          <div className="match-col-header">RECENT MATCHES</div>
        </div>
        <div className="loading-box" style={{ minHeight: '350px' }}>
          <div className="loading-spinner"></div>
          <h2 style={{ color: '#a855f7', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '15px', fontSize: '1.2rem' }}>
            Fetching Arena Matches...
          </h2>
        </div>
      </section>
    );
  }

  const leftMatches = matches.slice(0, 5);
  const rightMatches = matches.slice(5);

  return (
    <section className="match-section">
      <div className="match-section-header">
        <div className="match-col-header">RECENT MATCHES</div>
      </div>
      <div className="match-container match-fade-in">
        <div className="match-col">
          {leftMatches.map((match) => (
            <div className="match-item" key={match.id}>
              <div className="match-left">
                <div className="match-game">{match.game}</div>
                <div className="match-stage">{match.stage}</div>
              </div>
              <div className="match-center">
                <h3>{match.team1}</h3>
                <span className="vs-text">VS</span>
                <h3>{match.team2}</h3>
              </div>
              <div className="match-right">
                <div className={match.result === "WIN" ? "match-result-win" : "match-result-lose"}>
                  {match.result}
                </div>
                <span className="match-time">{match.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="match-col">
          {rightMatches.map((match) => (
            <div className="match-item" key={match.id}>
              <div className="match-left">
                <div className="match-game">{match.game}</div>
                <div className="match-stage">{match.stage}</div>
              </div>
              <div className="match-center">
                <h3>{match.team1}</h3>
                <span className="vs-text">VS</span>
                <h3>{match.team2}</h3>
              </div>
              <div className="match-right">
                <div className={match.result === "WIN" ? "match-result-win" : "match-result-lose"}>
                  {match.result}
                </div>
                <span className="match-time">{match.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PARTNER SECTION ============
function Partner() {
  const partners = [
    { name: "DIOR", img: sponsor1 },
    { name: "Napster", img: sponsor2 },
    { name: "Backforce", img: sponsor3 },
    { name: "Causony", img: sponsor4 },
    { name: "GGBT", img: sponsor5 },
    { name: "ROG", img: sponsor6 },
    { name: "Indihome", img: sponsor7 },
    { name: "Logitec", img: sponsor8 },
    { name: "Tomorow", img: sponsor9 },
    { name: "Tokopedia", img: sponsor10 },
  ];

  return (
    <section className="partner-section">
      <h2 className="partner-title">Partners</h2>
      <div className="partner-grid">
        {partners.map((item, index) => (
          <div className="partner-card" key={index}>
            {item.img
              ? <img src={item.img} alt={item.name} className="partner-img" />
              : <span className="partner-name">{item.name}</span>
            }
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ CONTACT SECTION (WITH AXIOS) ============
function Contact() {
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      // Mengirim data ke JSONPlaceholder (Simulasi API)
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      console.log("Respon API:", res.data);
      alert("Pesan berhasil dikirim!");
      setFormData({ nama: '', email: '', pesan: '' });
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim pesan.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="container my-5 text-white">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="nama"
          type="text" 
          className="form-control mb-3" 
          placeholder="Nama" 
          value={formData.nama}
          onChange={handleChange}
          required 
        />
        <input 
          name="email"
          type="email" 
          className="form-control mb-3" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <textarea 
          name="pesan"
          className="form-control mb-3" 
          placeholder="Pesan"
          value={formData.pesan}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn btn-purple" disabled={isSending}>
          {isSending ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>
    </section>
  );
}

// ============ MAIN HOME COMPONENT ============
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Devision />
      <Match />
      <Partner />
      <Contact />
    </>
  );
}