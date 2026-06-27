import { Link } from 'react-router-dom';
import logoEsport from '../assets/logo_esport1.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <img src={logoEsport} alt="Logo" />
        </div>

        <div className="footer-col">
          <h4>HILING STRIKE</h4>
        <Link to="/About">ABOUT</Link>
        <Link to="/Match">MATCH</Link>
        <Link to="/Partner">PARTNER</Link>
        <Link to="/Creator">CREATOR</Link>
        <Link to="/News">NEWS</Link>
        <Link to="/Store">STORE</Link>
        </div>

        <div className="footer-col">
          <h4>DIVISIONS</h4>
          <Link to="/ml" className='ml'>Mobile Legends</Link>
          <Link to="/pubg">PUBG Mobile</Link>
          <Link to="/ff">FREE FIRE</Link>
          <Link to="/valo" className="valo">VALORANT</Link>
          <Link to="/hok">Honor of Kings</Link>
          <Link to="/point">Point Blank</Link>
          <Link to="/csgo">Counter Strike</Link>
          <Link to="/dota">Dota2</Link>
        </div>

        <div className="footer-col">
          <h4>FOLLOW US</h4>
          <div className="footer-socials">
            <Link to="/Ig">IG</Link>
            <Link to="/Yt">YT</Link>
            <Link to="/Fb">FB</Link>
            <Link to="/X">X</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>PT HILING</h4>
          <p>Gedung HILING, Lt. 24</p>
          <p>Jl. Pugaran2. Maguwoharjo. Depok</p>
          <p>YOGYAKARTA, 10220</p>
          <p>No Telp: 08822451679</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Made by Tim Hiling</p>
      </div>
    </footer>
  );
}

export default Footer;