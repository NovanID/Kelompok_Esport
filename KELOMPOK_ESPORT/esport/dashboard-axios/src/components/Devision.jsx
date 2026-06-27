import { useNavigate } from "react-router-dom";

const games = [
  {
    id: "pubg",
    name: "PUBG MOBILE",
    type: "mobile", 
    accent: "#c8a000",
    bg: "linear-gradient(160deg, #1c2d4a, #0d1a30)",
    charImg: "/src/assets/images/pubg-char.jpg",
  },
  {
    id: "freefire",
    name: "FREE FIRE",
    type: "mobile",
    accent: "#00bfff",
    bg: "linear-gradient(160deg, #0d2240, #050f20)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "mlbb",
    name: "MOBILE LEGENDS",
    type: "mobile",
    accent: "#d4a800",
    bg: "linear-gradient(160deg, #1a0a30, #0a0518)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "hok",
    name: "HONOR OF KINGS",
    type: "mobile",
    accent: "#ffd700",
    bg: "linear-gradient(160deg, #0d0d25, #050510)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "valorant",
    name: "VALORANT",
    type: "pc",
    accent: "#ff4655",
    bg: "linear-gradient(160deg, #1a0a10, #0d0508)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "dota2",
    name: "DOTA 2",
    type: "pc",
    accent: "#c23c2a",
    bg: "linear-gradient(160deg, #0a1a10, #050d08)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "cs2",
    name: "COUNTER-STRIKE 2",
    type: "pc",
    accent: "#e8b04a",
    bg: "linear-gradient(160deg, #111108, #080804)",
    charImg: "",
    logoImg: "",
  },
  {
    id: "pb",
    name: "POINT BLANK",
    type: "pc",
    accent: "#00c853",
    bg: "linear-gradient(160deg, #0a1520, #050a10)",
    charImg: "",
    logoImg: "",
  },
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

export default function Devision() {
  const navigate = useNavigate();

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
            style={{ background: game.bg, cursor: game.id === "mlbb" ? "pointer" : "default" }}
            onMouseEnter={(e) => handleMouseEnter(e, game)}
            onMouseLeave={(e) => handleMouseLeave(e, game)}
            onClick={() => {
              if (game.id === "mlbb") {
                navigate("/mlbb");
              }
            }}
          >
            <div
              className="dv-accent-bar"
              style={{ background: game.accent }}
            />

            <div className="dv-card-top">
              <div className="dv-icon-box">
                {game.type === "mobile" ? <MobileIcon /> : <PCIcon />}
              </div>
              <div className="dv-icon-box">
                {game.type === "mobile" ? <MobileIcon /> : <PCIcon />}
              </div>
            </div>

            <img className="dv-char" src={game.charImg} alt={game.name} />

            <div className="dv-bottom">
              
              <button
                className="dv-btn"
                style={{ color: game.accent, borderColor: game.accent }}
                onClick={() => {
                  if (game.id === "mlbb") {
                    navigate("/mlbb");
                  }
                }}
              >
                View Players
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}