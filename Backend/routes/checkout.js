const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../middleware/auth');

const prisma = new PrismaClient();

// Endpoint Checkout: POST /api/checkout
// Endpoint ini dilindungi oleh verifyToken, jadi hanya user login yang bisa checkout
router.post('/', verifyToken, async (req, res) => {
  try {
    // cartItems didapat dari keranjang belanja frontend, paymentMethod dari modal Midtrans
    const { cartItems, paymentMethod } = req.body; 
    const userId = req.user.id; // Diambil dari JWT Token

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Keranjang belanja kosong' });
    }

    // Menggunakan Prisma Transaction agar data Pesanan & Detail Pesanan tersimpan bersamaan
    const newPesanan = await prisma.$transaction(async (tx) => {
      // 1. Buat data Pesanan utama
      const pesanan = await tx.pesanan.create({
        data: {
          id_user: userId,
          tanggal_pesanan: new Date(),
          status_pesanan: 'PROCESSED' // Langsung diproses karena sudah dibayar
        }
      });

      // 2. Buat data Detail Pesanan untuk setiap barang di keranjang
      const detailPromises = cartItems.map(item => {
        return tx.detail_pesanan.create({
          data: {
            id_pesanan: pesanan.id_pesanan,
            id_produk: item.id,
            jumlah: item.quantity,
            harga_satuan: item.price,
            subtotal: item.price * item.quantity
          }
        });
      });

      await Promise.all(detailPromises);

      // 3. Buat data Pembayaran dengan status LUNAS sesuai simulasi Midtrans
      await tx.pembayaran.create({
        data: {
          id_pesanan: pesanan.id_pesanan,
          metode_bayar: paymentMethod || 'Unknown',
          status_bayar: 'PAID',
          tanggal_bayar: new Date()
        }
      });

      // 4. Hapus keranjang di database karena sudah di-checkout
      await tx.keranjang.deleteMany({
        where: { id_user: userId }
      });

      return pesanan;
    });

    res.status(201).json({ message: 'Checkout berhasil', id_pesanan: newPesanan.id_pesanan });
  } catch (error) {
    console.error('Error saat checkout:', error);
    res.status(500).json({ error: 'Gagal melakukan checkout pesanan' });
  }
});

module.exports = router;
