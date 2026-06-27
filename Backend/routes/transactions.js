const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/transactions/history : Mengambil riwayat pesanan user yang sedang login
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

module.exports = router;
