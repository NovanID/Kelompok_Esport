const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../middleware/auth');

const prisma = new PrismaClient();

/*1. ENDPOINT RIWAYAT PESANAN (GET /api/transactions/history)
 * Mengambil seluruh data riwayat pesanan milik user yang sedang login beserta detail produk dan status pembayaran.
 */
router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Ambil data pesanan berserta detail produk yang dibeli dan info pembayarannya
    const history = await prisma.pesanan.findMany({
      where: { id_user: userId },
      include: {
        detail_pesanan: {
          include: { produk: true } // Menampilkan nama produk dsb
        },
        pembayaran: true // Menampilkan status pembayaran
      },
      orderBy: { tanggal_pesanan: 'desc' } // Mengurutkan dari yang paling baru
    });

    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Gagal mengambil riwayat pesanan' });
  }
});

/*2. ENDPOINT PEMBATALAN PESANAN (POST /api/transactions/cancel/:idPesanan)
 * Membatalkan pesanan tertentu, merubah status pembayaran menjadi CANCELLED, dan mengembalikan kuantitas produk ke stok utama.
 */
router.post('/cancel/:idPesanan', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const idPesanan = parseInt(req.params.idPesanan);

    // Cari pesanan beserta detailnya untuk pengembalian stok
    const pesanan = await prisma.pesanan.findFirst({
      where: {
        id_pesanan: idPesanan,
        id_user: userId
      },
      include: {
        detail_pesanan: true,
        pembayaran: true
      }
    });

    if (!pesanan) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    if (pesanan.status_pesanan === 'CANCELLED') {
      return res.status(400).json({ error: 'Pesanan ini sudah dibatalkan' });
    }

    // Lakukan dalam prisma transaction agar konsisten
    await prisma.$transaction(async (tx) => {
      // 1. Update status pesanan ke CANCELLED
      await tx.pesanan.update({
        where: { id_pesanan: idPesanan },
        data: { status_pesanan: 'CANCELLED' }
      });

      // 2. Update status pembayaran ke CANCELLED jika ada
      await tx.pembayaran.updateMany({
        where: { id_pesanan: idPesanan },
        data: { status_bayar: 'CANCELLED' }
      });

      // 3. Kembalikan stok untuk setiap produk dalam detail pesanan
      for (const detail of pesanan.detail_pesanan) {
        if (detail.id_produk && detail.jumlah) {
          const product = await tx.produk.findUnique({
            where: { id_produk: detail.id_produk }
          });
          
          if (product) {
            await tx.produk.update({
              where: { id_produk: detail.id_produk },
              data: {
                stok: (product.stok || 0) + detail.jumlah
              }
            });
          }
        }
      }
    });

    res.json({ message: 'Pesanan berhasil dibatalkan dan stok dikembalikan.' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Gagal membatalkan pesanan' });
  }
});

module.exports = router;
