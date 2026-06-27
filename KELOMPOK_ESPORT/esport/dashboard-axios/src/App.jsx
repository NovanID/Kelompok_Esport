import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/home/home";
import Footer from "./components/Footer";
import Store from "./pages/Store/Store";
import Ff from "./pages/ff/ff";
import Hok from "./pages/hok/hok";
import About from "./pages/about/About";
import Pubg from "./pages/pubg/pubg";
import Creator from "./pages/creator/creator";
import Dit from "./pages/creator/dit";
import Bri from "./pages/creator/bri";
import Tzy from "./pages/creator/tzy";
import News from "./pages/News/News";
import Valorant from "./pages/Valorant/Valorant";
import Dota2 from "./pages/dota2/dota2";
import Match from "./pages/home/Match";
import Point from "./pages/home/Point";

import MLBBCommunity from "./pages/ridho/MLBBCommunity";
import CSGOCommunity from "./pages/ridho/CSGOCommunity";
import PartnerCommunity from "./pages/ridho/PartnerCommunity";

// Import halaman baru untuk Auth & History
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import History from "./pages/Transactions/History";

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <nav>
        <Navbar />
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/ff" element={<Ff />} />
          <Route path="/hok" element={<Hok />} />
          <Route path="/about" element={<About />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/tzy" element={<Tzy />} />
          <Route path="/dit" element={<Dit />} />
          <Route path="/bri" element={<Bri />} />
          <Route path="/pubg" element={<Pubg />} />
          <Route path="/News" element={<News />} />
          <Route path="/Valorant" element={<Valorant />} />
          <Route path="/dota2" element={<Dota2 />} />
          <Route path="/mlbb" element={<MLBBCommunity />} />
          <Route path="/csgo" element={<CSGOCommunity />} />
          <Route path="/partner" element={<PartnerCommunity />} />
          <Route path="/match" element={<Match />} />
          <Route path="/point" element={<Point />} />
          
          {/* Rute baru yang ditambahkan */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </Router>
  );
}


export default App;