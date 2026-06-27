import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Simpan token JWT dan info user ke Local Storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Arahkan kembali ke Store
      navigate('/Store');
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Gagal terhubung ke server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
      <div className="card bg-dark border-secondary p-5" style={{ width: '100%', maxWidth: '400px', borderRadius: '0px' }}>
        <h2 className="text-center fw-bold mb-4" style={{ letterSpacing: '2px' }}>HS LOGIN</h2>
        
        {error && <div className="alert alert-danger rounded-0 border-0 bg-danger text-white">{error}</div>}

        <form onSubmit={handleLogin}>
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
            {loading ? 'MEMPROSES...' : 'SIGN IN'}
          </button>
        </form>
        
        <p className="text-center text-secondary small mt-3 mb-0">
          Belum punya akun? <Link to="/register" className="text-white fw-bold text-decoration-none">Daftar sekarang</Link>
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

export default Login;
