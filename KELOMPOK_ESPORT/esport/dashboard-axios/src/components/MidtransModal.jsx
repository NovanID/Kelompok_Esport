import { useState, useEffect } from 'react';
import { X, ChevronRight, CreditCard, Smartphone, Building2, QrCode, Copy } from 'lucide-react';

function MidtransModal({ isOpen, onClose, totalAmount, onSuccess }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSelectedMethod(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'bca_va', name: 'BCA Virtual Account', type: 'va', icon: <Building2 size={24} /> },
    { id: 'mandiri_va', name: 'Mandiri Virtual Account', type: 'va', icon: <Building2 size={24} /> },
    { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: <Smartphone size={24} /> },
    { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', icon: <Smartphone size={24} /> },
    { id: 'qris', name: 'QRIS', type: 'qris', icon: <QrCode size={24} /> },
    { id: 'cc', name: 'Credit / Debit Card', type: 'cc', icon: <CreditCard size={24} /> }
  ];

  const handleSelect = (method) => {
    setSelectedMethod(method);
    setStep(2);
  };

  const handleSimulatePayment = () => {
    // Memanggil API onSuccess di parent (Store.jsx) dengan mengirim nama metode
    onSuccess(selectedMethod.name);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
      {/* Container mirip pop-up Midtrans (Putih bersih) */}
      <div className="bg-white text-dark shadow-lg overflow-hidden d-flex flex-column" style={{ width: '100%', maxWidth: '380px', borderRadius: '12px', minHeight: '500px', maxHeight: '90vh' }}>
        
        {/* Header Midtrans */}
        <div className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="m-0 fw-bold" style={{ color: '#001A40' }}>HS STORE</h6>
            <span className="small text-muted">ID: ORDER-{Math.floor(Math.random() * 100000)}</span>
          </div>
          <button className="btn btn-sm btn-light p-1 rounded-circle d-flex" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Amount */}
        <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
          <span className="text-muted small">Total</span>
          <h4 className="m-0 fw-bold" style={{ color: '#001A40' }}>Rp {totalAmount.toLocaleString('id-ID')}</h4>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 overflow-auto bg-white position-relative">
          
          {step === 1 && (
            <div>
              <div className="px-3 py-2 bg-light border-bottom text-muted small fw-bold">Pilih Metode Pembayaran</div>
              {paymentMethods.map(method => (
                <div 
                  key={method.id} 
                  className="d-flex justify-content-between align-items-center p-3 border-bottom cursor-pointer hover-bg-light"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelect(method)}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-primary">{method.icon}</div>
                    <span className="fw-semibold text-dark">{method.name}</span>
                  </div>
                  <ChevronRight size={20} className="text-muted" />
                </div>
              ))}
            </div>
          )}

          {step === 2 && selectedMethod && (
            <div className="p-4 d-flex flex-column align-items-center h-100">
              
              <div className="text-center mb-4">
                <p className="text-muted small mb-1">Selesaikan pembayaran dalam</p>
                <h5 className="text-danger fw-bold">{formatTime(timeLeft)}</h5>
              </div>

              {selectedMethod.type === 'va' && (
                <div className="w-100 mb-4">
                  <span className="text-muted small d-block mb-2">Nomor Virtual Account</span>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded border">
                    <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: '2px' }}>
                      8077 {Math.floor(10000000 + Math.random() * 90000000)}
                    </h5>
                    <button className="btn btn-sm text-primary p-0 d-flex align-items-center gap-1 border-0 bg-transparent">
                      <Copy size={16} /> <span className="small">Salin</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedMethod.type === 'ewallet' && (
                <div className="w-100 mb-4 text-center">
                  <div className="bg-light p-4 rounded border mb-3">
                    <Smartphone size={48} className="text-primary mb-2" />
                    <h6 className="fw-bold">Buka aplikasi {selectedMethod.name} Anda</h6>
                  </div>
                </div>
              )}

              {selectedMethod.type === 'qris' && (
                <div className="w-100 mb-4 text-center">
                  <div className="bg-light p-4 rounded border mb-3 d-inline-block">
                    <QrCode size={120} className="text-dark" />
                  </div>
                  <p className="small text-muted">Scan QR ini menggunakan aplikasi e-wallet / m-banking Anda</p>
                </div>
              )}

              {selectedMethod.type === 'cc' && (
                <div className="w-100 mb-4">
                  <div className="mb-3">
                    <label className="small text-muted mb-1">Nomor Kartu</label>
                    <input type="text" className="form-control text-muted" value="0000 0000 0000 0000" readOnly />
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="small text-muted mb-1">Berlaku Hingga</label>
                      <input type="text" className="form-control text-muted" value="12/28" readOnly />
                    </div>
                    <div className="col-6">
                      <label className="small text-muted mb-1">CVV</label>
                      <input type="text" className="form-control text-muted" value="***" readOnly />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-auto w-100 pt-4">
                <button 
                  className="btn btn-success w-100 py-3 fw-bold rounded mb-2 shadow-sm"
                  onClick={handleSimulatePayment}
                >
                  SIMULASIKAN PEMBAYARAN BERHASIL
                </button>
                <button 
                  className="btn btn-link w-100 text-muted text-decoration-none small"
                  onClick={() => setStep(1)}
                >
                  Pilih metode pembayaran lain
                </button>
              </div>
              
            </div>
          )}
          
        </div>

      </div>
      
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa !important; }
      `}</style>
    </div>
  );
}

export default MidtransModal;
