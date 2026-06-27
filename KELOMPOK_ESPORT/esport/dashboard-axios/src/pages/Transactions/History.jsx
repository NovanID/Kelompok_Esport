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
    <section className="pb-5 text-white position-relative" style={{ backgroundColor: '#050505', minHeight: '100vh', paddingTop: '5rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div className="d-flex align-items-center mb-5 gap-3">
          <button className="btn btn-dark rounded-0 border-secondary" onClick={() => navigate('/Store')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="fw-bold m-0" style={{ letterSpacing: '1px' }}>ORDER HISTORY</h1>
            <p className="text-secondary small m-0 tracking-widest">RIWAYAT TRANSAKSI ANDA</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <h5 className="text-secondary">Memuat data pesanan...</h5>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-5 bg-dark border border-secondary p-5" style={{ borderRadius: '0px' }}>
            <Package size={48} className="text-secondary mb-3 opacity-50" />
            <h4 className="text-white">Belum ada pesanan</h4>
            <p className="text-secondary">Anda belum melakukan checkout apapun.</p>
            <Link to="/Store" className="btn text-white fw-bold rounded-0 mt-3 px-4 py-2" style={{ backgroundColor: '#e31837' }}>
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
                <div key={order.id_pesanan} className="card bg-black border-secondary rounded-0 text-white p-0">
                  <div className="card-header bg-dark border-bottom border-secondary p-4 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-secondary small fw-bold d-block">ORDER ID: #{order.id_pesanan}</span>
                      <span className="small">{new Date(order.tanggal_pesanan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="text-end">
                      {paymentMethod && paymentMethod !== 'Unknown' && (
                        <span className="d-block text-secondary small mb-2 fw-bold">{paymentMethod.toUpperCase()}</span>
                      )}
                      <span className={`badge rounded-0 px-3 py-2 ${paymentStatus === 'PAID' ? 'bg-success' : 'bg-danger'}`}>
                        {paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    {order.detail_pesanan.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3 last-child-no-border">
                        <div className="d-flex gap-3 align-items-center">
                          <img src={item.produk?.gambar} alt={item.produk?.nama_produk} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="bg-dark" />
                          <div>
                            <h6 className="fw-bold mb-1">{item.produk?.nama_produk}</h6>
                            <span className="text-secondary small">{item.jumlah}x @ Rp {item.harga_satuan.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                        <div className="fw-bold">
                          Rp {item.subtotal.toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between align-items-center pt-3">
                      <span className="fw-bold text-secondary tracking-widest">TOTAL</span>
                      <h4 className="fw-bold m-0" style={{ color: '#e31837' }}>Rp {totalAmount.toLocaleString('id-ID')}</h4>
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
      `}</style>
    </section>
  );
}

export default History;
