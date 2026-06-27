import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const categories = ["ALL", "TOURNAMENT", "ROSTER", "ANNOUNCEMENT", "PARTNERS", "EVENT"];

const customEsportsNews = [
  {
    title: "ONIC Esports Raih Juara MPL ID Season 12",
    category: "TOURNAMENT",
    game: "Mobile Legends",
    excerpt: "ONIC Esports kembali mendominasi skena Mobile Legends Indonesia setelah menundukkan Geek Fam di Grand Final MPL ID...",
    content: "ONIC Esports berhasil mempertahankan gelar juara mereka di Mobile Legends Professional League (MPL) Indonesia. Di babak Grand Final yang berlangsung sengit, mereka sukses menundukkan kuda hitam dengan skor meyakinkan. Kemenangan ini mengukuhkan dominasi Indonesia di kancah Asia Tenggara dan membawa mereka melaju ke kompetisi dunia.",
    image: "https://asset.kompas.com/crops/zXGOWQef0EnpjHT0hySI2EWaqPY=/240x5:3586x2235/750x500/data/photo/2023/10/15/652bfbfebe84d.jpeg"
  },
  {
    title: "Paper Rex Amankan Tiket ke VCT Masters",
    category: "TOURNAMENT",
    game: "Valorant",
    excerpt: "Tim asal Asia Tenggara, Paper Rex, menunjukkan performa gemilang di VCT Pacific dan memastikan diri lolos ke turnamen global...",
    content: "Pertandingan dramatis terjadi di VCT Pacific League di mana Paper Rex (PRX) berhasil mengalahkan lawannya dengan strategi agresif andalan mereka. Kemenangan ini membuktikan bahwa region Pacific adalah penantang serius untuk turnamen tingkat dunia Valorant Champions Tour tahun ini.",
    image: "https://api.duniagames.co.id/api/content/upload/file/10043006541779354701.jpeg"
  },
  {
    title: "Alter Ego Ares Juara PMSL SEA 2023",
    category: "TOURNAMENT",
    game: "PUBG Mobile",
    excerpt: "Tim Indonesia Alter Ego Ares berhasil mempertahankan gelar juara di ajang PUBG Mobile Super League (PMSL) SEA...",
    content: "Sejarah tercipta! Alter Ego Ares kembali membuktikan bahwa mereka adalah raja Asia Tenggara. Dengan perolehan poin eliminasi dan placement yang konsisten di hari terakhir, mereka mengungguli tim-tim kuat dari Thailand dan Malaysia. Trofi juara kembali dibawa pulang ke Tanah Air.",
    image: "https://cdn.antaranews.com/cache/1200x800/2023/08/28/3394dc48-e9cd-42e1-a70b-81e805d5c162.jpeg"
  },
  {
    title: "Team Spirit Angkat Aegis of Champions di TI",
    category: "TOURNAMENT",
    game: "Dota 2",
    excerpt: "The International berakhir dengan kemenangan Team Spirit yang berhasil meraih gelar juara dunia kedua mereka dalam sejarah Dota 2...",
    content: "Team Spirit kembali mengukir sejarah! Mereka berhasil memenangkan turnamen terbesar Dota 2, The International (TI), mengalahkan lawan mereka dengan skor telak 3-0 di Grand Final. Permainan makro dan teamfight yang sempurna di late game menjadi kunci kemenangan mereka tahun ini.",
    image: "https://d1tgyzt3mf06m9.cloudfront.net/v3-staging/2023/10/Team-Spirit-Berhasil-Juarai-The-International-2023-Usai-Kalahkan-Gaimin-Gladiators-1-1024x583.jpg"
  },
  {
    title: "Vitality Sabet Gelar Juara Major Terakhir CS:GO",
    category: "TOURNAMENT",
    game: "CS:GO",
    excerpt: "Tim tuan rumah Vitality berhasil menjadi juara di BLAST.tv Paris Major, menutup era CS:GO dengan kemenangan manis...",
    content: "Di hadapan pendukungnya sendiri, Team Vitality tampil tanpa cela dan tidak kehilangan satu map pun sepanjang turnamen. Pemain bintang mereka mendapatkan gelar MVP berkat performa individunya yang tak tertandingi di turnamen Major CS:GO terakhir sebelum peralihan besar ke CS2.",
    image: "https://cdn.esports.id/media/article/834520251215035518.jpeg"
  },
  {
    title: "EVOS Divine Melaju ke FFWS Global",
    category: "TOURNAMENT",
    game: "Free Fire",
    excerpt: "EVOS Divine memastikan langkah mereka sebagai perwakilan Indonesia di panggung dunia Free Fire World Series (FFWS)...",
    content: "Persaingan sengit di liga domestik berakhir manis bagi EVOS Divine. Gaya bermain bertahan dan rotasi cerdas saat late game membuat mereka mengamankan poin krusial yang dibutuhkan untuk terbang ke turnamen global FFWS. Komunitas Survivor Indonesia menaruh harapan besar pada mereka.",
    image: "https://storage.googleapis.com/swafiles/images/2025/07/212200/1753110002_9cadf670a277e86070d5.jpg"
  },
  {
    title: "Kagendra Juara PBNC Indonesia",
    category: "TOURNAMENT",
    game: "Point Blank",
    excerpt: "Kagendra keluar sebagai kampiun Point Blank National Championship (PBNC) setelah pertarungan sengit di partai final...",
    content: "Kembalinya skena kompetitif Point Blank di Indonesia dimeriahkan oleh kemenangan Kagendra di PBNC. Aim yang akurat dan penguasaan bomb mission yang sempurna membuat mereka layak menjadi juara dan akan secara resmi mewakili Indonesia di ajang PBIC (Point Blank International Championship).",
    image: "https://www.sinyalmagz.com/wp-content/uploads/2025/07/kagendraTsel0725-1-scaled.jpg"
  },
  {
    title: "Talon Esports Raih Gelar Juara Honor of Kings",
    category: "TOURNAMENT",
    game: "Honor of Kings",
    excerpt: "Turnamen Honor of Kings Invitational dimenangkan oleh tim Talon Esports setelah laga dramatis lima game berturut-turut...",
    content: "Ekspansi global Honor of Kings (HoK) membawa warna baru di skena MOBA mobile. Talon Esports sukses menampilkan strategi draft hero yang brilian untuk mengunci kemenangan di turnamen internasional pertama tahun ini. Pertarungan di lane dan eksekusi teamfight mereka patut diacungi jempol.",
    image: "https://api.duniagames.co.id/optimize-image?url=https%3A%2F%2Fapi.duniagames.co.id%2Fapi%2Fcontent%2Fupload%2Ffile%2F17461692021760028820.jpeg&format=webp&width=736&signature=aeeea6e617bae3dfd2a7f4aadeceb828dd1594cac61cf525e6cd811aca6b0069"
  },
  {
    title: "LOUD Kalahkan Sentinels di VCT Americas",
    category: "EVENT",
    game: "Valorant",
    excerpt: "Rivalitas region Americas memanas setelah LOUD membungkam Sentinels dengan permainan yang luar biasa...",
    content: "Pertandingan el clasico Valorant Americas antara LOUD dan Sentinels menyita perhatian jutaan penonton dari seluruh dunia. LOUD sukses melakukan comeback dramatis di map ketiga, membuktikan bahwa mentalitas juara mereka tetap membara meski menghadapi rintangan berat.",
    image: "https://cdn.esports.id/media/article/882820240304080824.jpeg"
  },
  {
    title: "RRQ Hoshi Lakukan Perombakan Roster Besar-besaran",
    category: "ROSTER",
    game: "Mobile Legends",
    excerpt: "Tim raksasa Indonesia, RRQ Hoshi, mengumumkan perpisahan dengan beberapa pemain veterannya demi regenerasi tim...",
    content: "Jelang musim kompetisi baru, tim berjuluk Raja dari Segala Raja ini secara mengejutkan melepas beberapa pemain ikonik mereka. Langkah berani ini diambil manajemen untuk memberikan ruang bagi talenta-talenta muda dari liga akademi (MDL) untuk bersinar di panggung utama MPL Indonesia musim depan.",
    image: "https://cdn.medcom.id/dynamic/content/2026/05/18/1820517/coIaH0xLOW.jpg?w=1024"
  },
  {
    title: "FaZe Clan Juarai Intel Extreme Masters",
    category: "EVENT",
    game: "CS2",
    excerpt: "Turnamen Tier-1 pertama di era Counter-Strike 2 (CS2) berhasil dimenangkan oleh FaZe Clan di hadapan ribuan penonton...",
    content: "Transisi sistem game dari CS:GO ke CS2 tidak menghentikan dominasi raksasa Eropa, FaZe Clan. Bermain di panggung utama, mereka mempertontonkan adaptasi mekanik baru yang memukau. Kemenangan ini menjadikan mereka tim pertama yang menjuarai turnamen major di era baru Counter-Strike.",
    image: "https://static.upoint.id/images/news/1658242351faze1.jpg"
  },
  {
    title: "Bigetron RA Kembali Berjaya di Kancah Global",
    category: "TOURNAMENT",
    game: "PUBG Mobile",
    excerpt: "Tim alien merah, Bigetron Red Aliens, perlahan kembali menunjukkan taringnya di ajang PMGC dengan raihan WWCD berturut-turut...",
    content: "Meski sempat diragukan performanya di babak awal, Bigetron RA membuktikan mentalitas juara dunia mereka tak pernah pudar. Rotasi yang rapi dan setup pertahanan map yang kokoh di zona akhir membuat mereka berhasil mendulang poin placement yang sangat tinggi di babak penyisihan PMGC.",
    image: "https://cdn.esports.id/media/article/176320210924054306.jpeg"
  }
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function FeaturedNews({ news, onClick }) {
  if (!news) return null;

  return (
    <section className="news-featured">
      <div className="news-featured-card news-animate-in">
        <div className="news-featured-img">
          <img src={news.image} alt={news.title} style={{ objectFit: 'cover' }} />
          <div className="news-featured-badge">
            <span className="pulse-dot"></span>
            FEATURED
          </div>
        </div>
        <div className="news-featured-content">
          <div className="news-featured-cat">{news.category}</div>
          <div className="news-featured-date">{news.date}</div>
          <h2 className="news-featured-title">{news.title}</h2>
          <p className="news-featured-excerpt">{news.excerpt}</p>
          <a className="news-featured-link" href="#" onClick={(e) => { e.preventDefault(); onClick(news); }}>
            <span>Read More</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ news, index, onClick }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="news-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.5s ease ${index * 0.08}s`,
      }}
    >
      <div className="news-card-img" style={{ backgroundColor: '#0f1923' }}>
        <img src={news.image} alt={news.title} style={{ objectFit: 'cover' }} />
        <div className="news-card-cat">{news.category}</div>
      </div>
      <div className="news-card-body">
        <div className="news-card-date">{news.date}</div>
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-excerpt">{news.excerpt}</p>
        <a className="news-card-link" href="#" onClick={(e) => { e.preventDefault(); onClick(news); }}>
          View <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=12')
      .then(res => {
        const fetchedNews = res.data.map((post, index) => {
          const gameNews = customEsportsNews[index % customEsportsNews.length];
          
          const date = new Date();
          date.setDate(date.getDate() - (index * 3));
          const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
          
          return {
            id: post.id,
            title: gameNews.title,
            category: gameNews.category,
            date: dateStr,
            excerpt: gameNews.excerpt,
            image: gameNews.image,
            fullImage: gameNews.image,
            featured: index === 0,
            link: "#",
            content: gameNews.content,
            tags: ["Esports", gameNews.game, gameNews.category]
          };
        });
        
        setTimeout(() => {
          setNewsData(fetchedNews);
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  const filteredNews = activeCategory === "ALL"
    ? newsData
    : newsData.filter((n) => n.category === activeCategory);

  const featuredNews = filteredNews.find((n) => n.featured) || null;
  const regularNews = filteredNews.filter((n) => !n.featured);
  const displayedNews = regularNews.slice(0, visibleCount);
  const hasMore = visibleCount < regularNews.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedNews(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="news-page">
      <div className="w-100" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', paddingTop: '1rem' }}>
 <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-4">
    
    <div className="text-start"> 
  <h1 
    className="display-4 fw-bold text-white m-0" 
    style={{ 
      letterSpacing: '-2px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transform: 'translateX(-5px)'
    }}> NEWS </h1>
  <p className="text-secondary fw-bold mb-1 text-uppercase" 
    style={{ 
      fontSize: '0.8rem', letterSpacing: '0.2em'
    }}> LATEST ESPORTS UPDATES </p>
</div>

  </div>
</div>

      <div className="news-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`news-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="news-loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="news-spinner" style={{ width: '60px', height: '60px', border: '4px solid rgba(255, 70, 85, 0.2)', borderTopColor: '#ff4655', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: '#888', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 'bold' }}>MEMUAT DATA</p>
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <>
          {featuredNews && <FeaturedNews news={featuredNews} onClick={handleNewsClick} />}

          <section className="news-grid-section">
            <div className="news-grid-header">
              <span className="news-grid-label">
                {activeCategory === "ALL" ? "All News" : activeCategory}
              </span>
              <span className="news-grid-count">
                {regularNews.length} articles
              </span>
            </div>

            {displayedNews.length > 0 ? (
              <div className="news-grid">
                {displayedNews.map((news, index) => (
                  <NewsCard key={news.id} news={news} index={index} onClick={handleNewsClick} />
                ))}
              </div>
            ) : (
              <div className="news-empty">
                <div className="news-empty-icon">📭</div>
                <p className="news-empty-text">No articles found in this category</p>
              </div>
            )}

            {hasMore && (
              <div className="news-load-more">
                <button className="news-load-btn" onClick={handleLoadMore}>
                  <span>Load More</span>
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {selectedNews && (
        <div className="news-modal-overlay" onClick={closeModal} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '2rem'
        }}>
          <div className="news-modal-content" onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: '#1a1a1a', borderRadius: '12px', maxWidth: '800px', width: '100%',
            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            border: '1px solid #333', maxHeight: '90vh'
          }}>
            <button className="news-modal-close" onClick={closeModal} style={{
              position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)',
              border: 'none', color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer', zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <X size={24} />
            </button>
            <div style={{ position: 'relative', height: '350px', overflow: 'hidden', backgroundColor: '#0f1923', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={selectedNews.fullImage} alt={selectedNews.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', zIndex: 1
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to top, #1a1a1a, transparent)', zIndex: 2 }}></div>
            </div>
            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ color: '#ff4655', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.1em' }}>{selectedNews.category}</span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{selectedNews.date}</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{selectedNews.title}</h2>
              <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                {selectedNews.content}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedNews.tags.map(tag => (
                  <span key={tag} style={{ backgroundColor: '#333', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.news-page {
  width: 100%;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.news-hero {
  position: relative;
  width: 100%;
  padding: 1rem 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.news-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #ff4655;
  margin-bottom: 1.5rem;
}

.news-hero-tag::before {
  content: '';
  width: 40px;
  height: 2px;
  background: #ff4655;
  display: inline-block;
}

.news-hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 4vw, 7rem);
  font-weight: 10;
  letter-spacing: -2px;
  line-height: 0.95;
  margin: 0 0 1.5rem;
  color: #fff;
}

.news-hero-desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  max-width: 600px;
  margin: 0;
}

.news-filter {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.news-filter-btn {
  padding: 12px 24px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.news-filter-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ff4655;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.news-filter-btn:hover {
  color: rgba(255, 255, 255, 0.7);
}

.news-filter-btn.active {
  color: #fff;
}

.news-filter-btn.active::after {
  transform: scaleX(1);
}

.news-featured {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.news-featured-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
}

.news-featured-card:hover {
  border-color: rgba(255, 70, 85, 0.2);
}

.news-featured-img {
  position: relative;
  overflow: hidden;
  min-height: 420px;
}

.news-featured-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.news-featured-card:hover .news-featured-img img {
  transform: scale(1.05);
}

.news-featured-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 50%,
    rgba(17, 17, 17, 0.6) 80%,
    #111 100%
  );
  pointer-events: none;
}

.news-featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #ff4655;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}

.news-featured-badge .pulse-dot {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: news-pulse 1.5s ease-in-out infinite;
}

.news-featured-content {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-featured-cat {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ff4655;
  margin-bottom: 1rem;
}

.news-featured-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 0 0 1rem;
  transition: color 0.3s ease;
}

.news-featured-card:hover .news-featured-title {
  color: #ff4655;
}

.news-featured-excerpt {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2rem;
}

.news-featured-date {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.news-featured-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: flex-start;
}

.news-featured-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #ff4655;
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: 0;
}

.news-featured-link:hover::before {
  transform: translateX(0);
}

.news-featured-link:hover {
  border-color: #ff4655;
}

.news-featured-link span,
.news-featured-link svg {
  position: relative;
  z-index: 1;
}

.news-featured-link svg {
  transition: transform 0.3s ease;
}

.news-featured-link:hover svg {
  transform: translateX(4px);
}

.news-grid-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

.news-grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.news-grid-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
}

.news-grid-count {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.2);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #ff4655;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 5;
}

.news-card:hover {
  border-color: rgba(255, 70, 85, 0.15);
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.news-card:hover::before {
  transform: scaleX(1);
}

.news-card-img {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.news-card:hover .news-card-img img {
  transform: scale(1.08);
}

.news-card-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(17, 17, 17, 0.4) 100%
  );
  pointer-events: none;
}

.news-card-cat {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 5;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff4655;
}

.news-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-card-date {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.news-card-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.75rem;
  transition: color 0.3s ease;
}

.news-card:hover .news-card-title {
  color: #ff4655;
}

.news-card-excerpt {
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.news-card-link svg {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.news-card:hover .news-card-link {
  color: #ff4655;
}

.news-card:hover .news-card-link svg {
  transform: translateX(4px);
}

.news-load-more {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.news-load-btn {
  padding: 16px 48px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.news-load-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #ff4655;
  transform: translateY(100%);
  transition: transform 0.4s ease;
  z-index: 0;
}

.news-load-btn:hover::before {
  transform: translateY(0);
}

.news-load-btn:hover {
  border-color: #ff4655;
}

.news-load-btn span {
  position: relative;
  z-index: 1;
}

.news-empty {
  text-align: center;
  padding: 6rem 2rem;
}

.news-empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.news-empty-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 2px;
}

@keyframes news-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes news-fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.news-animate-in {
  animation: news-fadeIn 0.5s ease both;
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .news-featured-card {
    grid-template-columns: 1fr;
  }

  .news-featured-img {
    min-height: 280px;
  }

  .news-featured-img::after {
    background: linear-gradient(
      180deg,
      transparent 40%,
      rgba(17, 17, 17, 0.6) 80%,
      #111 100%
    );
  }

  .news-featured-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .news-hero {
    padding: 4rem 1.5rem 2rem;
  }

  .news-filter {
    padding: 0 1.5rem 1.5rem;
    flex-wrap: wrap;
    gap: 4px;
  }

  .news-filter-btn {
    padding: 8px 14px;
    font-size: 0.6rem;
    letter-spacing: 2px;
  }

  .news-featured {
    padding: 2rem 1.5rem;
  }

  .news-grid-section {
    padding: 1.5rem 1.5rem 4rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .news-featured-content {
    padding: 2rem;
  }

  .news-featured-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .news-hero-title {
    font-size: 3rem;
    letter-spacing: -1px;
  }

  .news-filter-btn {
    padding: 6px 10px;
    font-size: 0.55rem;
    letter-spacing: 1.5px;
  }

  .news-card-body {
    padding: 1.2rem;
  }

  .news-card-title {
    font-size: 1rem;
  }
}
      `}</style>
    </div>
  );
}