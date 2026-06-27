const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/cart : Mendapatkan isi keranjang user yang sedang login
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Ambil data keranjang beserta detail produk dan kategorinya
    const cartItems = await prisma.keranjang.findMany({
      where: { id_user: userId },
      include: {
        produk: {
          include: { kategori: true }
        }
      }
    });

    // Format ulang agar strukturnya sama dengan apa yang diharapkan frontend
    const formattedCart = cartItems.map(item => {
      const p = item.produk;
      return {
        id: p.id_produk,
        name: p.nama_produk,
        price: p.harga,
        priceStr: `Rp ${p.harga.toLocaleString('id-ID')}`,
        image: p.gambar,
        category: p.kategori ? p.kategori.nama_kategori.toUpperCase() : 'ALL',
        quantity: item.jumlah,
        cart_id: item.id_keranjang // ID spesifik di tabel keranjang
      };
    });

    res.json(formattedCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Gagal mengambil keranjang belanja' });
  }
});

// POST /api/cart : Menambah barang ke keranjang (atau update jumlahnya jika sudah ada)
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Cek apakah barang sudah ada di keranjang user
    const existingItem = await prisma.keranjang.findFirst({
      where: { id_user: userId, id_produk: productId }
    });

    if (existingItem) {
      // Jika sudah ada, update jumlahnya
      const updated = await prisma.keranjang.update({
        where: { id_keranjang: existingItem.id_keranjang },
        data: { jumlah: existingItem.jumlah + quantity }
      });
      return res.json({ message: 'Keranjang diupdate', data: updated });
    } else {
      // Jika belum ada, buat baru
      const newItem = await prisma.keranjang.create({
        data: {
          id_user: userId,
          id_produk: productId,
          jumlah: quantity
        }
      });
      return res.status(201).json({ message: 'Barang ditambahkan ke keranjang', data: newItem });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Gagal menambah barang ke keranjang' });
  }
});

// DELETE /api/cart/:productId : Menghapus barang dari keranjang
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);

    // Cari itemnya dulu
    const item = await prisma.keranjang.findFirst({
      where: { id_user: userId, id_produk: productId }
    });

    if (!item) return res.status(404).json({ error: 'Barang tidak ditemukan di keranjang' });

    // Hapus
    await prisma.keranjang.delete({
      where: { id_keranjang: item.id_keranjang }
    });

    res.json({ message: 'Barang berhasil dihapus dari keranjang' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Gagal menghapus barang dari keranjang' });
  }
});

module.exports = router;
