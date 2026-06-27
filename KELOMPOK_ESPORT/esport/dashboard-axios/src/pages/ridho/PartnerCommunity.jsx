import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Globe, Target, Trophy, 
  ChevronDown, ArrowRight, Play, Users,
  TrendingUp, MonitorSmartphone,
  Star, Hexagon, Map,
  CheckCircle, Plus, 
  Terminal, Shield, Activity
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

// --- DATA ---
const partners = [
  { name: "TechCorp", type: "Technology" },
  { name: "AuraGear", type: "Peripherals" },
  { name: "NexusStream", type: "Broadcasting" },
  { name: "CyberDrink", type: "Energy Drink" },
  { name: "MetaPlay", type: "Platform" },
  { name: "Vanguard", type: "Security" },
  { name: "TechCorp", type: "Technology" },
  { name: "AuraGear", type: "Peripherals" },
  { name: "NexusStream", type: "Broadcasting" },
  { name: "CyberDrink", type: "Energy Drink" },
];

const features = [
  { icon: <Users size={24} />, title: "Massive Community Reach", desc: "Connect with millions of highly engaged esports fans globally across multiple digital touchpoints." },
  { icon: <Trophy size={24} />, title: "Tournament Exposure", desc: "Prime brand placement in premium regional and international tournament broadcasts." },
  { icon: <Target size={24} />, title: "Brand Engagement", desc: "Interactive activations and campaigns designed to build loyalty within the gaming community." },
  { icon: <TrendingUp size={24} />, title: "Social Media Growth", desc: "Leverage our extensive social network and influencer roster to amplify your brand presence." },
  { icon: <MonitorSmartphone size={24} />, title: "Professional Production", desc: "High-end studio broadcasts and cinematic content creation tailored for your brand." },
  { icon: <Shield size={24} />, title: "Competitive Ecosystem", desc: "Integrate into a thriving ecosystem of professional players, creators, and hardcore gamers." },
];

const tiers = [
  { name: "Silver Partner", price: "Entry", desc: "Perfect for brands entering the esports ecosystem.", color: "from-gray-400 to-gray-600", features: ["Logo on website", "Social media shoutout", "Standard stream overlay", "Community Discord role"] },
  { name: "Gold Partner", price: "Core", desc: "Comprehensive visibility across regional events.", color: "from-yellow-400 to-orange-500", featured: false, features: ["Everything in Silver", "Jersey logo placement", "Monthly content piece", "Tournament ad spots", "Player endorsement (Tier 2)"] },
  { name: "Platinum Partner", price: "Premium", desc: "Maximum exposure and deep brand integration.", color: "from-cyan-400 to-blue-600", featured: true, features: ["Everything in Gold", "Premium jersey placement", "Dedicated campaign", "Player endorsement (Tier 1)", "Custom broadcast segment", "VIP event access"] },
  { name: "Global Sponsor", price: "Exclusive", desc: "Title sponsorship and global ecosystem dominance.", color: "from-purple-500 to-pink-600", features: ["Everything in Platinum", "Naming rights to events", "Co-branded merchandise", "Global campaign strategy", "Exclusive product integration", "Board-level strategic alignment"] },
];

const faqs = [
  { q: "How does the partnership process work?", a: "We begin with a discovery call to understand your brand's goals, followed by a custom proposal. Once aligned, our activation team handles the end-to-end execution of the partnership." },
  { q: "What is included in the sponsor packages?", a: "Packages are highly customizable but generally include broadcast integration, social media campaigns, jersey placement, content creation, and experiential event activations." },
  { q: "Can we collaborate on specific media campaigns?", a: "Yes. Our in-house creative studio specializes in producing cinematic, high-impact media campaigns tailored to resonate with the Gen-Z gaming audience." },
  { q: "Do you offer regional event partnerships?", a: "Absolutely. We have a strong presence in SEA, NA, and EU. We can localize your brand's presence for specific regional tournaments or fan activations." },
];

const testimonials = [
  { text: "Partnering with this organization completely transformed our brand's perception among Gen-Z. Their production quality and community engagement are unmatched.", author: "Sarah Jenkins", role: "CMO, NexusGear" },
  { text: "The platinum partnership delivered 3x our expected ROI in the first quarter. Their team doesn't just sell logos; they build integrated gaming experiences.", author: "David Chen", role: "Director of Marketing, CyberDrink" },
  { text: "A world-class esports organization. Their global network and professional operations made our international expansion seamless and impactful.", author: "Elena Rodriguez", role: "VP of Partnerships, MetaPlay" },
];

const PartnerCommunity = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [apiPartners, setApiPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minId, setMinId] = useState(1);

  // Compute filtered and sorted partners
  const filteredPartners = apiPartners
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isVerified = item.id % 2 !== 0;
      const matchesVerified = !verifiedOnly || isVerified;
      const matchesMinId = item.id >= minId;
      return matchesSearch && matchesVerified && matchesMinId;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });



  useEffect(() => {
    let cancelled = false;

    const fetchApiData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (cancelled) return;
        setApiPartners(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching live partners:", error);
        if (!cancelled) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchApiData();
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-700/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-700/10 blur-[150px] rounded-full" />
        <div className="absolute top-[30%] left-[50%] translate-x-[-50%] w-[40%] h-[40%] bg-cyan-600/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
      </div>

      <div className="relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-24">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center z-20"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-bold text-cyan-100 tracking-widest uppercase">Global Partnership Program</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] uppercase italic">
              Powering The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">Future</span> <br/> of Esports Together
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join forces with the most dynamic organization in competitive gaming. We bridge the gap between visionary brands and the world's most passionate digital generation.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Become a Partner
              </button>
              <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest rounded hover:bg-white/5 transition-all duration-300">
                Explore Collaborations
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Stats */}
          <div className="absolute bottom-10 left-0 w-full">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Global Partners", value: "50+" },
                { label: "Community Reach", value: "1M+" },
                { label: "Global Events", value: "25+" },
                { label: "Championships", value: "12" },
              ].map((stat, i) => (
                <div key={i} className="text-center border-t border-white/10 pt-6">
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <section className="py-12 bg-black/50 border-y border-white/5 overflow-hidden">
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div 
              className="flex items-center gap-16 md:gap-32 px-8"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                  <Hexagon size={24} className="text-cyan-500" />
                  <span className="text-xl font-black text-white tracking-tighter uppercase italic">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6">Why Partner With Us</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Unmatched platform for brands to authentically engage with the next generation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all group">
                  <div className="w-12 h-12 rounded bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LIVE DATA SECTION (AXIOS) ================= */}
        <section className="py-32 px-6 relative overflow-hidden bg-black/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div className="text-left">
                <div className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">Live Network</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none">Global <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Collaborators</span></h2>
              </div>
              <p className="text-gray-400 max-w-md text-right hidden md:block">
                Our ecosystem is expanding in real-time. Here are the latest industry leaders and organizations joining our global esports movement.
              </p>
            </div>

            {/* ================= FILTER FORM ================= */}
            {!loading && (
              <motion.form 
                onSubmit={(e) => e.preventDefault()}
                className="mb-12 p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Search Input (type="search") */}
                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Search Collaborator</label>
                  <div className="relative">
                    <input 
                      type="search" 
                      placeholder="Search by name or company..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                {/* Radio Input (type="radio") */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort Order</label>
                  <div className="flex items-center gap-6 h-[46px] px-4 bg-black/20 border border-white/5 rounded-lg">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input 
                        type="radio" 
                        name="sortOrder" 
                        value="asc"
                        checked={sortOrder === 'asc'}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="accent-cyan-500 cursor-pointer w-4 h-4"
                      />
                      A - Z
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer text-gray-300 hover:text-white transition-colors">
                      <input 
                        type="radio" 
                        name="sortOrder" 
                        value="desc"
                        checked={sortOrder === 'desc'}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="accent-cyan-500 cursor-pointer w-4 h-4"
                      />
                      Z - A
                    </label>
                  </div>
                </div>

                {/* Checkbox Input (type="checkbox") */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification Status</label>
                  <div className="flex items-center h-[46px] px-4 bg-black/20 border border-white/5 rounded-lg">
                    <label className="flex items-center gap-3 text-xs font-bold uppercase cursor-pointer text-gray-300 hover:text-white transition-colors select-none">
                      <input 
                        type="checkbox" 
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="accent-cyan-500 cursor-pointer w-4 h-4 rounded"
                      />
                      Only Verified
                    </label>
                  </div>
                </div>

                {/* Range Input (type="range") */}
                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Min Partner Tier ID</label>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">ID &gt;= {minId}</span>
                  </div>
                  <div className="flex items-center h-[46px] px-4 bg-black/20 border border-white/5 rounded-lg">
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={minId}
                      onChange={(e) => setMinId(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer bg-white/10 h-1 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Date Input (type="date") */}
                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partnership Join Date Filter</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      defaultValue="2026-05-24"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>
              </motion.form>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 relative">
                <motion.div 
                  className="absolute w-24 h-24 rounded-full border border-cyan-500/20"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
                  }}
                />

                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-[8px] opacity-40 animate-pulse" />
                  
                  <motion.div 
                    className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))'
                    }}
                  />
                  
                  {/* Inner reverse spinning ring */}
                  <motion.div 
                    className="absolute w-10 h-10 border-2 border-transparent border-b-purple-500 border-l-purple-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))'
                    }}
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex flex-col items-center gap-1"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold tracking-[0.2em] uppercase text-xs">
                    Syncing with Global Network
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold animate-pulse">
                    Establishing secure handshake...
                  </span>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {filteredPartners.length === 0 ? (
                  <div className="col-span-full py-16 text-center border border-white/5 bg-white/[0.01] rounded-xl">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No Collaborators Found</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Try adjusting your search query or filter parameters</p>
                  </div>
                ) : (
                  filteredPartners.map((item, i) => (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      className="group relative p-6 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe size={80} />
                      </div>
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform">
                          {item.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">{item.name}</h3>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">{item.company.name}</div>
                        {item.id % 2 !== 0 ? (
                          <div className="flex items-center gap-2 text-[9px] text-cyan-400 font-medium bg-cyan-500/10 px-2 py-1 rounded w-fit">
                            <Activity size={10} />
                            VERIFIED PARTNER
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-medium bg-white/5 px-2 py-1 rounded w-fit">
                            <Activity size={10} />
                            STANDARD PARTNER
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* ================= TIERS ================= */}
        <section className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, i) => (
                <div key={i} className="p-8 rounded-xl border border-white/10 bg-black relative">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color}`} />
                  <div className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-2">{tier.name}</div>
                  <div className="text-3xl font-black mb-4">{tier.price}</div>
                  <div className="space-y-3 mb-8">
                    {tier.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-400 uppercase font-bold">
                        <CheckCircle size={14} className="text-cyan-500" /> {f}
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 font-black uppercase text-xs tracking-widest transition-all bg-white/10 text-white hover:bg-white/20">
                    Select Tier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Total Views", value: "10M+", icon: <Activity size={20} /> },
              { label: "Followers", value: "500K+", icon: <Users size={20} /> },
              { label: "Tournaments", value: "120+", icon: <Trophy size={20} /> },
              { label: "Pro Players", value: "80+", icon: <Terminal size={20} /> },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-cyan-500 mb-4 flex justify-center">{s.icon}</div>
                <div className="text-4xl font-black mb-1">{s.value}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTestimonial}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="p-12 bg-white/[0.02] border border-white/10 rounded-2xl"
               >
                 <p className="text-2xl italic font-medium mb-8 leading-relaxed">"{testimonials[activeTestimonial].text}"</p>
                 <div className="font-black uppercase tracking-widest text-cyan-400">{testimonials[activeTestimonial].author}</div>
                 <div className="text-xs text-gray-500 uppercase font-bold">{testimonials[activeTestimonial].role}</div>
               </motion.div>
             </AnimatePresence>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-8">Let's Build The Next Generation</h2>
            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start Partnership Now
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default PartnerCommunity;