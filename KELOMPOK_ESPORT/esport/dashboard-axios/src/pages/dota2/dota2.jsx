import { useState, useEffect } from "react";
import dota2Banner from "../../assets/Dotabanner.png";
import hero from "../../assets/hero.png";
import mirzaImg from "../../assets/mirza.jpeg";
import satriaImg from "../../assets/satria.jpeg";
import ridhoImg from "../../assets/ridho.jpeg";
import hafizhImg from "../../assets/hafizh.jpeg";
import daniImg from "../../assets/dani.jpeg";
import antimageImg from "../../assets/antimage.jpg";
import invokerImg from "../../assets/invoker.jpg";
import earthshakerImg from "../../assets/earthshaker.jpg";
import voidSpiritImg from "../../assets/void_spirit.jpg";
import lionImg from "../../assets/lion.jpg";
import emberSpiritImg from "../../assets/ember_spirit.jpg";
import "./dota2.css";

export default function Dota2() {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [news, setNews] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPlayers([
        {
          id: 1,
          name: "Mirza",
          role: "Carry",
          image: mirzaImg,
          team: "Hiling Strike",
          mmr: "7500",
        },
        {
          id: 2,
          name: "Satria",
          role: "Mid Lane",
          image: satriaImg,
          team: "Hiling Strike",
          mmr: "7200",
        },
        {
          id: 3,
          name: "Ridho",
          role: "Support",
          image: ridhoImg,
          team: "Hiling Strike",
          mmr: "6800",
        },
        {
          id: 4,
          name: "Hafizh",
          role: "Offlane",
          image: hafizhImg,
          team: "Hiling Strike",
          mmr: "7100",
        },
        {
          id: 5,
          name: "Dani",
          role: "Support",
          image: daniImg,
          team: "Hiling Strike",
          mmr: "6900",
        },
      ]);

      setNews([
        {
          id: 1,
          title: "Hiling Strike Menang di Turnamen Regional!",
          description:
            "Tim Hiling Strike berhasil meraih kemenangan di turnamen regional Dota 2 2024 dengan performa gemilang.",
          date: "15 Mei 2024",
          image: dota2Banner,
        },
        {
          id: 2,
          title: "Mirza Masuk dalam 5 Best Carry di Asia",
          description:
            "Pemain carry Hiling Strike, Mirza, dipilih sebagai salah satu dari 5 pemain carry terbaik di Asia Tenggara.",
          date: "14 Mei 2024",
          image: dota2Banner,
        },
        {
          id: 3,
          title: "Hiling Strike Lolos ke Grand Final International",
          description:
            "Dengan performa luar biasa, Hiling Strike berhasil mengalahkan tim Eropa dan lolos ke Grand Final Internasional.",
          date: "13 Mei 2024",
          image: dota2Banner,
        },
        {
          id: 4,
          title: "Strategi Baru Hiling Strike di Patch Terbaru",
          description:
            "Tim Hiling Strike mengumumkan strategi revolusioner yang akan mereka terapkan di kompetisi internasional mendatang.",
          date: "12 Mei 2024",
          image: dota2Banner,
        },
      ]);

      setHeroes([
        {
          id: 1,
          name: "Anti-Mage",
          type: "Carry",
          image: antimageImg,
          description: "Hero favorit Mirza dengan damage output tertinggi",
        },
        {
          id: 2,
          name: "Invoker",
          type: "Mid Lane",
          image: invokerImg,
          description: "Hero pilihan Satria untuk kontrol tempo mid game",
        },
        {
          id: 3,
          name: "Earthshaker",
          type: "Support",
          image: earthshakerImg,
          description: "Hero favorit Ridho dan Dani untuk initiate team fight",
        },
        {
          id: 4,
          name: "Void Spirit",
          type: "Offlane",
          image: voidSpiritImg,
          description: "Hero pilihan Hafizh untuk flexibility dan gank",
        },
        {
          id: 5,
          name: "Lion",
          type: "Support",
          image: lionImg,
          description: "Hero disable counter pick untuk Hiling Strike",
        },
        {
          id: 6,
          name: "Ember Spirit",
          type: "Mid Lane",
          image: emberSpiritImg,
          description: "Hero escape dengan burst damage dari Satria",
        },
      ]);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dota2-container">
      {/* Loading Animation */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <p className="loading-text">Loading Dota 2 Content...</p>
          </div>
        </div>
      )}

      {/* Banner Section */}
      <section className="dota2-banner">
        <img src={dota2Banner} alt="Dota 2 Banner" className="banner-img" />
        <div className="banner-overlay">
          <h1 className="banner-title">DOTA 2</h1>
          <p className="banner-subtitle">Competitive Gaming at its Finest</p>
        </div>
      </section>

      {/* Players Section */}
      <section className="players-section">
        <div className="section-header">
          <h2 className="section-title">Hiling Strike Team</h2>
          <p className="section-desc">
            Pemain profesional Dota 2 terbaik dari tim Hiling Strike
          </p>
        </div>

        <div className="players-grid">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              <div className="card-image-wrapper">
                <img src={player.image} alt={player.name} />
                <div className="card-overlay">
                  <span className="role-badge">{player.role}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="player-name">{player.name}</h3>
                <div className="player-stats">
                  <div className="stat-item">
                    <span className="stat-label">MMR</span>
                    <span className="stat-value">{player.mmr}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heroes Section */}
      <section className="heroes-section">
        <div className="section-header">
          <h2 className="section-title">Tim Heroes</h2>
          <p className="section-desc">
            Hero-hero pilihan yang sering digunakan oleh Hiling Strike
          </p>
        </div>

        <div className="heroes-grid">
          {heroes.map((hero) => (
            <div key={hero.id} className="hero-card">
              <div className="hero-image-wrapper">
                <img src={hero.image} alt={hero.name} />
                <div className="hero-type-badge">{hero.type}</div>
              </div>
              <div className="hero-content">
                <h3 className="hero-name">{hero.name}</h3>
                <p className="hero-description">{hero.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="section-header">
          <h2 className="section-title">Hiling Strike News</h2>
          <p className="section-desc">
            Berita terbaru tentang tim Hiling Strike dan pencapaian mereka
          </p>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="news-date-badge">{item.date}</div>
              </div>
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-description">{item.description}</p>
                <button className="read-more-btn">Baca Selengkapnya →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
