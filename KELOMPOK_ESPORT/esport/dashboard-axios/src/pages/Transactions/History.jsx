import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, ArrowLeft } from 'lucide-react';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Harap login terlebih dahulu untuk melihat riwayat');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/transactions/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  return (
    <section className="pb-5 text-white position-relative" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '2rem' }}>
      
      <div className="w-100" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-4">
          
          <div className="text-start position-relative"> 
            
            <button 
              className="btn rounded-0 d-flex justify-content-center align-items-center p-0 d-none d-md-flex" 
              onClick={() => navigate('/Store')}
              style={{ 
                position: 'absolute',
                left: '-65px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px', 
                height: '40px', 
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s' 
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#ff4655'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
              title="Kembali ke Store"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 
              className="display-4 fw-bold text-white m-0" 
              style={{ 
                letterSpacing: '-2px', 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transform: 'translateX(-5px)'
              }}> ORDER HISTORY </h1>
            <p className="text-secondary fw-bold mb-1 text-uppercase" 
              style={{ 
                fontSize: '0.8rem', letterSpacing: '0.2em'
              }}> RIWAYAT TRANSAKSI ANDA </p>
          </div>

        </div>

        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '3rem' }}></div>

        <div className="w-100">
          {loading ? (
            <div className="text-center py-5">
              <h5 className="text-secondary" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>MEMUAT DATA PESANAN...</h5>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-5 bg-black border border-secondary p-5" style={{ borderColor: 'rgba(255, 255, 255, 0.05) !important' }}>
              <Package size={48} className="text-secondary mb-3 opacity-50" />
              <h4 className="text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Belum ada pesanan</h4>
              <p className="text-secondary mb-4">Anda belum melakukan checkout apapun.</p>
              <Link to="/Store" className="btn text-white fw-bold rounded-0 px-4 py-2" style={{ backgroundColor: '#ff4655', letterSpacing: '2px', fontSize: '0.8rem' }}>
                MULAI BELANJA
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {history.map((order) => {
                const totalAmount = order.detail_pesanan.reduce((sum, item) => sum + item.subtotal, 0);
                const paymentStatus = order.pembayaran.length > 0 ? order.pembayaran[0].status_bayar : 'UNPAID';
                const paymentMethod = order.pembayaran.length > 0 ? order.pembayaran[0].metode_bayar : 'Unknown';

                return (
                  <div key={order.id_pesanan} className="card rounded-0 text-white p-0" style={{ backgroundColor: '#111', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div className="card-header border-bottom p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#161616', borderColor: 'rgba(255, 255, 255, 0.05) !important' }}>
                      
                      <div className="d-flex flex-column align-items-start">
                        <span className="text-secondary small fw-bold mb-1" style={{ letterSpacing: '1px' }}>ORDER ID: #{order.id_pesanan}</span>
                        <span className="small text-secondary">{new Date(order.tanggal_pesanan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      
                      <div className="text-end">
                        {paymentMethod && paymentMethod !== 'Unknown' && (
                          <span className="d-block text-secondary small mb-2 fw-bold" style={{ letterSpacing: '1px' }}>{paymentMethod.toUpperCase()}</span>
                        )}
                        <span className={`badge rounded-0 px-3 py-2`} style={{ backgroundColor: paymentStatus === 'PAID' ? 'rgba(70, 255, 86, 1)' : 'rgba(255, 255, 255, 0.1)', letterSpacing: '1px', fontSize: '0.7rem' }}>
                          {paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      {order.detail_pesanan.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center pb-3 mb-3 last-child-no-border" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          
                          <div className="d-flex gap-3 align-items-center">
                            <img src={item.produk?.gambar} alt={item.produk?.nama_produk} style={{ width: '60px', height: '60px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                            
                            {/* PERUBAHAN: Menambahkan flex-column dan align-items-start agar text rata kiri sempurna */}
                            <div className="d-flex flex-column align-items-start justify-content-center text-start">
                              <h6 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{item.produk?.nama_produk}</h6>
                              <span className="text-secondary small m-0" style={{ letterSpacing: '0.3px' }}>{item.jumlah}x @ Rp {item.harga_satuan.toLocaleString('id-ID')}</span>
                            </div>

                          </div>
                          
                          <div className="fw-bold" style={{ fontSize: '1rem' }}>
                            Rp {item.subtotal.toLocaleString('id-ID')}
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between align-items-center pt-3">
                        <span className="fw-bold text-secondary tracking-widest" style={{ fontSize: '0.8rem' }}>TOTAL</span>
                        <h4 className="fw-bold m-0" style={{ color: '#ff4655', fontSize: '1.5rem' }}>Rp {totalAmount.toLocaleString('id-ID')}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .tracking-widest { letter-spacing: 0.2em; }
        .last-child-no-border:last-child { border-bottom: none !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }
        
        .card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .card:hover {
          border-color: rgba(255, 70, 85, 0.3) !important;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .text-start.position-relative {
            padding-left: 55px;
          }
          .btn[title="Kembali ke Store"] {
            display: flex !important;
            left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default History;