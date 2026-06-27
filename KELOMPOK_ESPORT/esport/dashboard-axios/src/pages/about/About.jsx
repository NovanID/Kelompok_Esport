import { Link } from "react-router-dom";
import logoEsport from "../../assets/logo_esport1.png";

export default function About() {
  return (
    <section className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-yellow-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">
              Sejak 2022
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-tight">
              We Are <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Hilling Strike
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hilling Strike adalah organisasi esports profesional yang berdedikasi untuk mencetak juara di berbagai divisi game kompetitif. Kami menggabungkan bakat luar biasa, strategi inovatif, dan semangat pantang menyerah untuk mendominasi panggung esports nasional dan internasional.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#vision" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Visi & Misi
              </a>
              <Link to="/Store" className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 font-bold backdrop-blur-sm transition-colors">
                Merchandise
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 h-full w-full"></div>
            <img
              src={logoEsport}
              alt="Hilling Strike Logo"
              className="w-full max-w-md object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.2)] animate-[pulse_4s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 bg-black/40 border-y border-white/5 backdrop-blur-md py-12 mb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">8</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Divisi Game</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">24+</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Pro Player</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">15</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Gelar Juara</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">2M+</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Fans Setia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision and Mission */}
      <div id="vision" className="container mx-auto px-6 py-12 max-w-7xl relative z-10 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Filosofi <span className="text-yellow-500">Kami</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Kami tidak hanya bermain untuk menang, kami bermain untuk menginspirasi dan membangun komunitas esports yang positif.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" /><path d="M12 2a10 10 0 0 1 10 10" /><path d="M12 22a10 10 0 0 1-10-10" /><path d="M12 2v20" /><path d="M2 12h20" /></svg>
            </div>
            <h3 className="text-3xl font-black uppercase mb-6 text-yellow-500 tracking-wide">Visi</h3>
            <p className="text-lg text-gray-300 leading-relaxed relative z-10">
              Menjadi organisasi esports terbesar dan paling dihormati di Asia Tenggara, yang dikenal karena profesionalisme, prestasi gemilang, dan kontribusi nyata dalam memajukan industri gaming.
            </p>
          </div>

          <div className="p-10 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
            </div>
            <h3 className="text-3xl font-black uppercase mb-6 text-yellow-500 tracking-wide">Misi</h3>
            <ul className="space-y-4 text-lg text-gray-300 relative z-10 list-disc list-outside ml-6">
              <li className="pl-2">Membina dan mengembangkan bakat-bakat talenta muda esports tanah air.</li>
              <li className="pl-2">Menyediakan fasilitas dan infrastruktur latihan berstandar internasional.</li>
              <li className="pl-2">Membangun ekosistem yang sehat antara manajemen, pemain, dan penggemar.</li>
              <li className="pl-2">Memenangkan berbagai turnamen major di setiap divisi yang kami ikuti.</li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}
