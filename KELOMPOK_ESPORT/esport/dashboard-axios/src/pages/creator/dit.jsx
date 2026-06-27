import "../style/creator.css";
import dit2 from "../../assets/dit2.png";
import hiling from "../../assets/hilingstrike.png";

export default function Dit() {
  return (
    <main className="min-h-screen text-white p-10 relative overflow-hidden">
      {/* Background */}
      <img
        src={hiling}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ filter: "brightness(0.30) contrast(1.05)" }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

      {/* Content */}
      <section className="relative z-10 mx-auto w-full max-w-5xl pt-12 md:pt-16">
        <div className="page-enter rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/25 via-white/10 to-transparent">
          <div className="rounded-2xl overflow-hidden bg-zinc-900/60 backdrop-blur-sm border border-white/5">
            <div className="p-6 md:p-10 flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-[320px]">
                <img
                  src={dit2}
                  alt="Yana_Capcay"
                  className="w-full h-[260px] md:h-[340px] object-cover rounded-xl"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">Yana_Capcay</h1>
                <div className="flex flex-wrap items-center gap-2 text-zinc-200 mt-3 text-lg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    role="img"
                    aria-label="Indonesia"
                    className="shrink-0 rounded-full overflow-hidden border border-white/10"
                  >
                    <defs>
                      <clipPath id="id-flag-circle">
                        <circle cx="9" cy="9" r="8" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#id-flag-circle)">
                      <rect x="0" y="0" width="18" height="9" fill="#EF4444" />
                      <rect x="0" y="9" width="18" height="9" fill="#FFFFFF" />
                    </g>
                  </svg>
                  <span>Indonesia</span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-zinc-200">22 tahun</span>
                </div>
                <p className="text-zinc-300 mt-3 leading-relaxed">
                  Yana_Capcay adalah creator/ambassador untuk Point Blank. Dia Adalah mantan pro player Point Blank yang telah berkompetisi di berbagai turnamen nasional dan internasional. Dengan pengalaman dan keahliannya dalam permainan, Yana_Capcay telah menjadi sosok yang dihormati di komunitas Point Blank. Beliau juga sering berbagai tips, strategi, dan konten menarik seputar Point Blank melalui platform media sosialnya.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 text-white visited:text-white hover:bg-orange-500/15 hover:text-orange-200 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 active:scale-[0.98]"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 transition-colors group-hover:bg-orange-500/25">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        role="img"
                        aria-label="Instagram"
                      >
                        <path
                          fill="currentColor"
                          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10 2.25a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                        />
                      </svg>
                    </span>
                    Yana_Prayana
                  </a>

                  <a
                    href="https://tiktok.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 text-white visited:text-white hover:bg-orange-500/15 hover:text-orange-200 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 active:scale-[0.98]"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 transition-colors group-hover:bg-orange-500/25">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        role="img"
                        aria-label="TikTok"
                      >
                        <path
                          fill="currentColor"
                          d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                        />
                      </svg>
                    </span>
                    @Yana
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

