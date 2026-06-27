import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        nama,
        email,
        password
      });

      // Jika berhasil, arahkan ke halaman login
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Gagal mendaftar, coba lagi');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
      <div className="card bg-dark border-secondary p-5" style={{ width: '100%', maxWidth: '400px', borderRadius: '0px' }}>
        <h2 className="text-center fw-bold mb-4" style={{ letterSpacing: '2px' }}>REGISTER</h2>
        
        {error && <div className="alert alert-danger rounded-0 border-0 bg-danger text-white">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">NAMA LENGKAP</label>
            <input 
              type="text" 
              className="form-control bg-black text-white border-secondary rounded-0 p-3" 
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-bold">EMAIL</label>
            <input 
              type="email" 
              className="form-control bg-black text-white border-secondary rounded-0 p-3" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-bold">PASSWORD</label>
            <input 
              type="password" 
              className="form-control bg-black text-white border-secondary rounded-0 p-3" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn w-100 rounded-0 py-3 fw-bold text-white mb-3"
            style={{ backgroundColor: '#e31837' }}
            disabled={loading}
          >
            {loading ? 'MEMPROSES...' : 'CREATE ACCOUNT'}
          </button>
        </form>
        
        <p className="text-center text-secondary small mt-3 mb-0">
          Sudah punya akun? <Link to="/login" className="text-white fw-bold text-decoration-none">Login di sini</Link>
        </p>
      </div>

      <style>{`
        input:focus {
          border-color: #e31837 !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}

export default Register;
