import "../style/creator.css";
import hiling from "../../assets/hilingstrike.png";
import tzy from "../../assets/tzy.png";
import dit2 from "../../assets/dit2.png";
import brian from "../../assets/Brian.png";
import { Link } from "react-router-dom";

export default function Creator() {
  return (
    <main className="page-enter min-h-screen bg-black text-white py-10">
      {/* Hero */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 h-[620px] md:h-[780px] overflow-hidden">
        <img
          src={hiling}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black" />
      </section>

      {/* Card Grid */}
      <section className="relative z-10 mx-auto -mt-28 md:-mt-36 w-full max-w-[1440px] px-4 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div className="creator-card bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition duration-300">
          <Link to="/tzy" className="block cursor-pointer">
            <div className="creator-card__media">
              <img
                src={tzy}
                alt="IZXY"
                className="w-full h-[280px] md:h-[320px] object-cover"
              />

              <div
                className="creator-card__overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="creator-card__popup absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start gap-4 rounded-2xl bg-zinc-950/70 backdrop-blur-sm border-2 border-white/10 p-4">
                  <img
                    src={tzy}
                    alt=""
                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex flex-col gap-0 leading-none">
                    <p className="text-base font-semibold text-white truncate">Izxy Al Aziz</p>
                    <p className="text-xs text-zinc-200/80">Bergabung: 12 Jan 2024 | Aktif sejak bergabung</p>
                    <p className="text-xs text-zinc-300/80">Asal: Bandung | Umur: 20</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">IZXY</h2>
            <p className="text-zinc-400 mb-5">Mobile Legends Ambassador</p>
          </div>
        </div>

        <div className="creator-card bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition duration-300">
          <Link to="/dit" className="block cursor-pointer">
            <div className="creator-card__media">
              <img
                src={dit2}
                alt="DIT2"
                className="w-full h-[280px] md:h-[320px] object-cover"
              />

              <div
                className="creator-card__overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="creator-card__popup absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start gap-4 rounded-2xl bg-zinc-950/70 backdrop-blur-sm border-2 border-white/10 p-4">
                  <img
                    src={dit2}
                    alt=""
                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex flex-col gap-0 leading-none">
                    <p className="text-base font-semibold text-white truncate">I gede Raditya</p>
                    <p className="text-xs text-zinc-200/80">Bergabung: 03 Mar 2024 | Aktif sejak bergabung</p>
                    <p className="text-xs text-zinc-300/80">Asal: Surabaya | Umur: 21</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">Yana_Capcay</h2>
            <p className="text-zinc-400 mb-5">Point Blank Ambassador</p>
          </div>
        </div>

        <div className="creator-card bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition duration-300">
          <Link to="/bri" className="block cursor-pointer">
            <div className="creator-card__media">
              <img
                src={brian}
                alt="brian"
                className="w-full h-[280px] md:h-[320px] object-cover"
              />

              <div
                className="creator-card__overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="creator-card__popup absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start gap-4 rounded-2xl bg-zinc-950/70 backdrop-blur-sm border-2 border-white/10 p-4">
                  <img
                    src={brian}
                    alt=""
                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex flex-col gap-0 leading-none">
                    <p className="text-base font-semibold text-white truncate">Handy Brian</p>
                    <p className="text-xs text-zinc-200/80">Bergabung: 20 Apr 2024 | Aktif sejak bergabung</p>
                    <p className="text-xs text-zinc-300/80">Asal: Jakarta | Umur: 22</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">BrianYoo</h2>
            <p className="text-zinc-400 mb-5">Free Fire Ambassador</p>
          </div>
        </div>
      </section>

      {/* About Creator */}
      <section className="mx-auto w-full max-w-6xl mt-14 md:mt-16">
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/25 via-white/10 to-transparent">
          <div className="rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-white/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.22em] text-zinc-300/80">ABOUT</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">
                  <span className="bg-white bg-clip-text text-transparent">
                    Creator
                  </span>
                </h2>
                <p className="mt-3 text-zinc-300 leading-relaxed max-w-3xl">
                  Halaman ini berisi profil creator/ambassador esports. pada halaman ini merupakan para creator yang aktif di dunia esports. Kami menampilkan profil mereka, termasuk pengalaman, keahlian, dan kontribusi mereka dalam industri esports. Para creator ini sering berbagi konten menarik seputar game, strategi, dan tips kepada komunitas esports melalui platform media sosial mereka. Mereka juga sering berpartisipasi dalam turnamen dan acara esports untuk memberikan wawasan dan hiburan kepada penggemar esports di seluruh dunia.
                </p>
              </div>
            </div>

            <div className="mt-6 h-px bg-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
