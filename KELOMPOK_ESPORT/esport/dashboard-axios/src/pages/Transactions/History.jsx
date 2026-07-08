import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, ArrowLeft, Trash2, CheckCircle2, XCircle, Clock, ShieldAlert, CreditCard } from 'lucide-react';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchHistory();
  }, [navigate]);

  const handleCancelOrder = async (idPesanan) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/transactions/cancel/${idPesanan}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data.message || 'Pesanan berhasil dibatalkan');
      fetchHistory();
    } catch (error) {
      console.error('Gagal membatalkan pesanan:', error);
      alert(error.response?.data?.error || 'Gagal membatalkan pesanan');
    }
  };

  return (
    <section className="pb-5 text-white position-relative" style={{ backgroundColor: '#050505', minHeight: '100vh', paddingTop: '5.5rem' }}>
      {/* Background radial glow */}
      <div className="position-absolute top-0 start-50 translate-middle-x w-100" style={{ height: '300px', background: 'radial-gradient(circle, rgba(227, 24, 55, 0.1) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: 0 }}></div>
      
      <div className="container position-relative" style={{ maxWidth: '900px', zIndex: 1 }}>
        
        <div className="d-flex align-items-center mb-5 gap-3">
          <button className="btn btn-dark rounded-0 border-secondary hover-red transition-all" onClick={() => navigate('/Store')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="fw-black m-0 tracking-wider" style={{ letterSpacing: '2px', fontSize: '2rem' }}>ORDER HISTORY</h1>
            <p className="text-secondary small m-0 tracking-widest text-uppercase">RIWAYAT TRANSAKSI ANDA</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-secondary">Memuat data pesanan...</h5>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-5 bg-dark bg-opacity-20 border border-secondary p-5 glass-card" style={{ borderRadius: '8px' }}>
            <Package size={56} className="text-secondary mb-3 opacity-50 pulse-icon" />
            <h4 className="text-white fw-bold">Belum Ada Pesanan</h4>
            <p className="text-secondary mb-4">Anda belum melakukan pembelian produk apa pun di HS Store.</p>
            <Link to="/Store" className="btn text-white fw-bold rounded-0 px-5 py-3 scale-hover" style={{ backgroundColor: '#e31837', letterSpacing: '1px' }}>
              MULAI BELANJA
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-5">
            {history.map((order) => {
              const totalAmount = order.detail_pesanan.reduce((sum, item) => sum + item.subtotal, 0);
              const paymentStatus = order.pembayaran.length > 0 ? order.pembayaran[0].status_bayar : 'UNPAID';
              const paymentMethod = order.pembayaran.length > 0 ? order.pembayaran[0].metode_bayar : 'Unknown';
              const isCancelled = order.status_pesanan === 'CANCELLED' || paymentStatus === 'CANCELLED';

              return (
                <div key={order.id_pesanan} className="card bg-black border-secondary text-white p-0 overflow-hidden glass-card transition-all" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  
                  {/* Card Header */}
                  <div className="card-header border-bottom border-secondary p-4 d-flex flex-wrap justify-content-between align-items-center gap-3" style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}>
                    <div>
                      <span className="text-danger small fw-black d-block tracking-wider">ORDER ID: #{order.id_pesanan}</span>
                      <span className="text-secondary small">{new Date(order.tanggal_pesanan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3">
                      <div className="text-end">
                        {paymentMethod && paymentMethod !== 'Unknown' && (
                          <span className="d-block text-secondary small mb-1 fw-bold tracking-widest text-uppercase" style={{ fontSize: '0.75rem' }}>{paymentMethod}</span>
                        )}
                        <span className={`badge rounded-0 px-3 py-2 fw-bold tracking-wider ${
                          paymentStatus === 'PAID' ? 'bg-success' : 
                          isCancelled ? 'bg-secondary text-dark' : 'bg-danger'
                        }`} style={{ fontSize: '0.75rem' }}>
                          {paymentStatus === 'PAID' ? 'LUNAS' : isCancelled ? 'BATAL' : paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    {/* Progress Timeline Tracker */}
                    <div className="mb-4 p-3 bg-dark bg-opacity-50 rounded" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="d-flex justify-content-between align-items-center position-relative my-2">
                        {/* Connecting Line */}
                        <div className="position-absolute top-50 start-0 end-0 translate-middle-y" style={{ height: '3px', backgroundColor: '#333', zIndex: 1 }}></div>
                        <div className="position-absolute top-50 start-0 translate-middle-y" style={{ height: '3px', width: isCancelled ? '0%' : paymentStatus === 'PAID' ? '100%' : '50%', backgroundColor: paymentStatus === 'PAID' ? '#198754' : '#e31837', zIndex: 2, transition: 'width 0.5s ease-in-out' }}></div>
                        
                        {/* Step 1: Created */}
                        <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 3 }}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: '#e31837', color: 'white' }}>
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="small mt-2 fw-bold" style={{ fontSize: '0.7rem', color: '#fff' }}>Dibuat</span>
                        </div>

                        {/* Step 2: Payment */}
                        <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 3 }}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: isCancelled ? '#6c757d' : paymentStatus === 'PAID' ? '#198754' : '#333', 
                            color: 'white',
                            border: paymentStatus === 'PAID' ? 'none' : '2px solid #555' 
                          }}>
                            {isCancelled ? <XCircle size={16} /> : paymentStatus === 'PAID' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                          </div>
                          <span className="small mt-2 fw-bold" style={{ fontSize: '0.7rem', color: isCancelled ? '#6c757d' : paymentStatus === 'PAID' ? '#198754' : '#aaa' }}>
                            {isCancelled ? 'Batal' : paymentStatus === 'PAID' ? 'Lunas' : 'Menunggu'}
                          </span>
                        </div>

                        {/* Step 3: Delivery / Processed */}
                        <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 3 }}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: isCancelled ? '#6c757d' : paymentStatus === 'PAID' ? '#198754' : '#333', 
                            color: 'white',
                            border: paymentStatus === 'PAID' ? 'none' : '2px solid #555' 
                          }}>
                            {isCancelled ? <XCircle size={16} /> : paymentStatus === 'PAID' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                          </div>
                          <span className="small mt-2 fw-bold" style={{ fontSize: '0.7rem', color: isCancelled ? '#6c757d' : paymentStatus === 'PAID' ? '#198754' : '#aaa' }}>
                            {isCancelled ? 'Batal' : 'Diproses'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products List */}
                    <div className="mb-4">
                      {order.detail_pesanan.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3 last-child-no-border">
                          <div className="d-flex gap-3 align-items-center">
                            <img src={item.produk?.gambar} alt={item.produk?.nama_produk} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }} className="bg-dark border border-secondary" />
                            <div>
                              <h6 className="fw-bold mb-1 text-uppercase text-white tracking-wide" style={{ fontSize: '0.95rem' }}>{item.produk?.nama_produk}</h6>
                              <span className="text-secondary small fw-medium">{item.jumlah}x @ Rp {item.harga_satuan.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                          <div className="fw-bold text-white-50">
                            Rp {item.subtotal.toLocaleString('id-ID')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer / Total & Cancel Button */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 border-top border-secondary gap-3">
                      <div>
                        <span className="fw-black text-secondary tracking-widest small d-block" style={{ fontSize: '0.75rem' }}>TOTAL PEMBAYARAN</span>
                        <h3 className="fw-black m-0" style={{ color: '#e31837' }}>Rp {totalAmount.toLocaleString('id-ID')}</h3>
                      </div>
                      
                      {!isCancelled && (
                        <button 
                          className="btn btn-outline-danger btn-sm rounded-0 px-4 py-2 hover-bg-red fw-bold tracking-widest text-uppercase transition-all"
                          onClick={() => handleCancelOrder(order.id_pesanan)}
                          style={{ fontSize: '0.75rem', border: '1px solid #dc3545' }}
                        >
                          BATALKAN PESANAN
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .tracking-widest { letter-spacing: 0.2em; }
        .last-child-no-border:last-child { border-bottom: none !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }
        .glass-card {
          background: rgba(10, 10, 10, 0.75) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .glass-card:hover {
          transform: translateY(-2px);
          border-color: rgba(227, 24, 55, 0.3) !important;
          box-shadow: 0 12px 40px 0 rgba(227, 24, 55, 0.1);
        }
        .hover-red:hover {
          background-color: #e31837 !important;
          color: white !important;
          border-color: #e31837 !important;
        }
        .hover-bg-red:hover {
          background-color: #e31837 !important;
          color: white !important;
          border-color: #e31837 !important;
        }
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fw-black {
          font-weight: 900;
        }
        .scale-hover {
          transition: all 0.2s ease-in-out;
        }
        .scale-hover:hover {
          transform: scale(1.03);
          background-color: #ff2a4b !important;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        .pulse-icon {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default History;
