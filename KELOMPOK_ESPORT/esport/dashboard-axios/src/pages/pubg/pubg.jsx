import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/pubg.css";
import banner from "../../assets/pubgbanner.png";
import uppi from "../../assets/Uppi.png";
import brian from "../../assets/Brian.png";
import dit from "../../assets/dit2.png";
import tzy from "../../assets/tzy.png";
import M416 from "../../assets/m14.png";
import UMP45 from "../../assets/ump45.png";
import Mini14 from "../../assets/mini14.png";
import Kar98k from "../../assets/kar94.png";

const formatPubgNewsItems = (sourceText) => {
  const itemPattern = /\*\s+\[!\[Image\s+\d+:\s+[^\]]*?thumbnail\]\((https?:\/\/[^)]+)\)\s+(.+?)\s+(PATCH NOTES|ANNOUNCEMENT|ARCADE|DEV LETTER|UNIVERSE|EVENT|ESPORTS)\s+(\d{4}\.\d{2}\.\d{2})\]\((https?:\/\/www\.pubg\.com\/en\/news\/\d+)\)/gi;

  return Array.from(sourceText.matchAll(itemPattern)).slice(0, 12).map((match, index) => {
    const imageUrl = match[1];
    const rawTitle = match[2].replace(/^\s*(PC CONSOLE|PC|CONSOLE|Esports|ALL)\s+/i, "").replace(/\s+/g, " ").trim();
    const category = match[3].toUpperCase();
    const dateValue = match[4];
    const url = match[5];

    const title = rawTitle.replace(/\s+(PATCH NOTES|ANNOUNCEMENT|ARCADE|DEV LETTER|UNIVERSE|EVENT|ESPORTS)\s*$/i, "").trim();
    const description = rawTitle.length > title.length ? rawTitle.slice(title.length).trim() : `Official PUBG ${category.toLowerCase()} update.`;

    return {
      id: `${index}-${url.split("/").pop()}`,
      title,
      description,
      category,
      date: new Date(dateValue.replace(/\./g, "-")).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      source: "PUBG Official",
      url,
      imageUrl,
    };
  });
};

// --- 1. DATA PEMAIN ---
const rosterData = [
  {
    id: 1,
    ign: "'UPI_SPECTRE'",
    role: "IGL",
    realName: "Fahrizal Rustam",
    age: 22,
    birthPlace: "Sorong",
    nationality: "Indonesia",
    ig: "hs_spectre",
    photo: uppi,
    weapon: {
      name: "M416",
      weaponImage: M416,
      attachments: ["Compensator AR", "Half Grip", "Extended QD Mag", "Tactical Stock", "Red Dot Sight"],
      proTip: "Tahan recoil pakai kombinasi half grip dan compensator, trust the spray!"
    },
    achievements: [
      "3x PUBG Regional Champion",
      "MVP 2023 Season",
      "Headshot Master",
      "Clutch King"
    ]
  },
  {
    id: 2,
    ign: "'AXE",
    role: "RUSHER",
    realName: "Budi Santoso",
    age: 20,
    birthPlace: "Batam",
    nationality: "Indonesia",
    ig: "hs_axe",
    photo: brian,
    weapon: {
      name: "UMP45",
      weaponImage: UMP45,
      attachments: ["Suppressor SMG", "Laser Sight", "Extended QD Mag", "Red Dot Sight"],
      proTip: "Laser sight wajib buat close combat, aim auto nempel ke musuh."
    },
    achievements: [
      "Rush Legend",
      "Fastest Kill Record",
      "2x Tournament Winner",
      "Combat Master"
    ]
  },
  {
    id: 3,
    ign: "'Kira'",
    role: "SUPPORT",
    realName: "Nadia Putri",
    age: 21,
    birthPlace: "Bandung",
    nationality: "Indonesia",
    ig: "hs_kira",
    photo: dit,
    weapon: {
      name: "Mini14",
      weaponImage: Mini14,
      attachments: ["Compensator Sniper", "Extended QD Mag", "8x Scope"],
      proTip: "Spam tapping dari jauh buat cover rusher yang lagi open fire."
    },
    achievements: [
      "Support Excellence",
      "Teamwork Award",
      "Tactical Genius",
      "Consistent Performer"
    ]
  },
  {
    id: 4,
    ign: "'Echo'",
    role: "SNIPER",
    realName: "Reza Pratama",
    age: 23,
    birthPlace: "Surabaya",
    nationality: "Indonesia",
    ig: "hs_echo",
    photo: tzy,
    weapon: {
      name: "Kar98k",
      weaponImage: Kar98k,
      attachments: ["Suppressor Sniper", "Bullet Loops", "8x Scope"],
      proTip: "Satu peluru, satu nyawa. Selalu incar kepala saat musuh sedang diam looting."
    },
    achievements: [
      "Precision Master",
      "Ace Tournament Mvp",
      "One Tap Legend",
      "Marksman Champion"
    ]
  }
];

export default function Pubg() {
  const [activePlayer, setActivePlayer] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        setNewsError("");

        const newsPages = [1, 2, 3];
        const responses = await Promise.all(
          newsPages.map((page) =>
            axios
              .get(`https://r.jina.ai/http://www.pubg.com/en/news${page === 1 ? "" : `?page=${page}`}`)
              .then((response) => String(response.data))
              .catch(() => "")
          )
        );

        const formattedItems = Array.from(
          new Map(
            formatPubgNewsItems(responses.join("\n")).map((item) => [item.url, item])
          ).values()
        ).slice(0, 12);

        setNewsItems(formattedItems);
      } catch (error) {
        setNewsError("Gagal mengambil news PUBG official.");
        console.error("PUBG news fetch error:", error);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const togglePlayer = (id) => {
    setActivePlayer(activePlayer === id ? null : id);
  };

  return (
    <main className="page-enter min-h-screen bg-black text-white relative">
      
      {/* --- HERO SECTION / BANNER BACKGROUND --- */}
      {/* Menggunakan absolute & z-0 agar teks dan konten bisa berada di atasnya */}
      <section className="absolute -top-5 left-0 w-full h-[550px] md:h-[700px] overflow-hidden z-0 flex items-center justify-center">
        <img
          src={banner}
          alt="PUBG Banner"
          className="absolute inset-0 w-full h-full object-cover object-[center_18%] opacity-85 brightness-110"
          aria-hidden="true"
        />
        {/* Gradasi hitam agar banner menyatu ke area bawah */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        {/* Header Text Overlay - Centered in Hero */}
        <div className="relative z-10 text-center" />
      </section>

      {/* --- KONTEN UTAMA --- */}
      {/* relative & z-10 memastikan konten ini berada di atas banner background */}
      <div className="relative z-10 pt-[600px] md:pt-[750px] pb-20 px-4 sm:px-6 lg:px-8">
        

        {/* Kontainer Daftar Pemain */}
        <div className="w-full space-y-6">
          {rosterData.map((player) => (
            <div 
              key={player.id} 
              className="group flex flex-col w-full shadow-2xl shadow-black"
            >
              {/* BAGIAN ATAS (KARTU UTAMA) */}
              <button
                onClick={() => togglePlayer(player.id)}
                className={`relative flex flex-col sm:flex-row w-full text-left transition-all duration-300 overflow-hidden
                  ${activePlayer === player.id 
                    ? 'border-2 border-orange-500 bg-orange-500/10' 
                    : 'border border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-orange-500/50'
                  }
                `}
              >
                {/* Blok Foto Pemain */}
                <div className="w-full sm:w-64 bg-gray-950 flex justify-center items-end relative overflow-hidden border-b-4 sm:border-b-0 sm:border-r-4 border-orange-500">
                  <img 
                    src={player.photo} 
                    alt={player.ign} 
                    className="w-full h-48 sm:h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-gray-900"></div>
                </div>

                {/* Blok Informasi Pemain */}
                <div className="flex-1 p-6 relative z-10 flex flex-col justify-center">
                  <h3 className="text-4xl md:text-5xl font-black italic text-white drop-shadow-lg">
                    {player.ign}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 mb-4">
                    <span className="bg-orange-500 text-black px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm">
                      {player.role}
                    </span>
                    <span className="text-gray-300 font-medium text-lg border-l-2 border-gray-600 pl-2">
                      {player.realName}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                    <p>Age <span className="font-bold text-white">{player.age}</span></p>
                    <p className="hidden sm:block">|</p>
                    <p>Birth Place <span className="font-bold text-white">{player.birthPlace}</span></p>
                    <p className="hidden sm:block">|</p>
                    <p>Nationality <span className="font-bold text-white">{player.nationality}</span></p>
                  </div>
                </div>

                {/* Ikon panah (Indikator Expand) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hidden md:block">
                  <svg 
                    className={`w-8 h-8 transition-transform duration-300 ${activePlayer === player.id ? 'rotate-180 text-orange-500' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* BAGIAN BAWAH (DETAIL SENJATA) */}
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-900/90 backdrop-blur-md border-x border-b border-gray-800
                  ${activePlayer === player.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 border-t border-orange-500/20">
                  
                  {/* Visual Nama Senjata */}
                  <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-black/60 rounded-lg p-6 border border-gray-800">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Favorite Weapon</p>
                    <img 
                      src={player.weapon.weaponImage} 
                      alt={player.weapon.name} 
                      className="w-40 h-40 object-contain mb-4 drop-shadow-lg"
                    />
                    <h4 className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600">
                      {player.weapon.name}
                    </h4>
                  </div>

                  {/* Attachments & Pro Tip */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-semibold mb-3 uppercase">Loadout Recommendation</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {player.weapon.attachments.map((item, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1.5 bg-gray-950 text-orange-100 text-xs font-bold rounded-sm border border-gray-700 shadow-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      
                      <div className="relative p-4 bg-orange-500/10 border-l-4 border-orange-500 rounded-r-md">
                        <p className="text-sm md:text-base text-gray-300 italic pr-8">
                          "{player.weapon.proTip}"
                        </p>
                        <p className="text-xs text-orange-400 font-bold mt-2 uppercase tracking-wide">— {player.ign}'s Tip</p>
                      </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <p className="text-gray-400 text-sm font-semibold mb-3 uppercase">Achievements</p>
                      <div className="grid grid-cols-2 gap-2">
                        {player.achievements.map((achievement, index) => (
                          <div 
                            key={index} 
                            className="px-3 py-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-200 text-xs font-bold rounded-sm border border-orange-500/40 shadow-sm text-center"
                          >
                            🏆 {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- NEWS SECTION --- */}
        <div className="mt-20 pt-16 border-t border-gray-800">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 flex items-center gap-4">
            <span className="bg-gradient-to-br from-orange-400 to-red-600 px-4 py-2 rounded shadow-lg shadow-orange-500/50">📰</span>
            PUBG Latest News
          </h2>

          {newsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-400 text-lg">Loading official PUBG news...</p>
              </div>
            </div>
          ) : newsError ? (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-400 font-semibold">{newsError}</p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4 snap-x snap-mandatory">
              <div className="flex gap-6 w-max pr-4">
              {newsItems.map((news) => (
                <article
                  key={news.id}
                  className="group relative bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.03] hover:border-orange-500/60 flex flex-col w-[320px] md:w-[360px] shrink-0 snap-start"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
                    {news.imageUrl ? (
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  <div className="relative p-5 bg-gray-900/95 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                        {news.date}
                      </span>
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/40">
                        {news.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-300 transition-colors">
                      {news.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {news.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className="text-xs text-gray-500">
                        📌 {news.source}
                      </span>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-3 py-1 rounded text-xs font-bold transition-all duration-300"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}