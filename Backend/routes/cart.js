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

    // Ambil info produk untuk cek stok
    const product = await prisma.produk.findUnique({
      where: { id_produk: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Cek apakah barang sudah ada di keranjang user
    const existingItem = await prisma.keranjang.findFirst({
      where: { id_user: userId, id_produk: productId }
    });

    const currentQty = existingItem ? existingItem.jumlah : 0;
    const newQty = currentQty + quantity;

    // Jika qty baru <= 0, hapus item dari keranjang
    if (newQty <= 0) {
      if (existingItem) {
        await prisma.keranjang.delete({
          where: { id_keranjang: existingItem.id_keranjang }
        });
      }
      return res.json({ message: 'Barang dihapus dari keranjang' });
    }

    // Cek apakah jumlah baru melebihi stok yang tersedia
    if (product.stok !== null && newQty > product.stok) {
      return res.status(400).json({ error: `Jumlah tidak boleh melebihi stok produk. Tersedia: ${product.stok}` });
    }

    if (existingItem) {
      // Jika sudah ada, update jumlahnya
      const updated = await prisma.keranjang.update({
        where: { id_keranjang: existingItem.id_keranjang },
        data: { jumlah: newQty }
      });
      return res.json({ message: 'Keranjang diupdate', data: updated });
    } else {
      // Jika belum ada, buat baru
      const newItem = await prisma.keranjang.create({
        data: {
          id_user: userId,
          id_produk: productId,
          jumlah: newQty
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
