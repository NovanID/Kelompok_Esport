const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint Mengambil Semua Produk: GET /api/products
router.get('/', async (req, res) => {
  try {
    // 1. Mengambil semua data produk beserta nama kategorinya dari Supabase
    const products = await prisma.produk.findMany({
      include: {
        kategori: true // Join tabel kategori untuk mendapatkan nama kategori
      }
    });
    
    // 2. Format ulang data agar nama variabelnya cocok dengan struktur di frontend Store.jsx
    const formattedProducts = products.map(p => {
      // Mengubah kategori menjadi teks uppercase (contoh: "APPAREL")
      const categoryName = p.kategori && p.kategori.nama_kategori 
        ? p.kategori.nama_kategori.toUpperCase() 
        : 'ALL PRODUCTS';

      return {
        id: p.id_produk,
        name: p.nama_produk,
        price: p.harga,
        // Format harga menjadi bentuk string Rupiah seperti "Rp 450.000"
        priceStr: `Rp ${p.harga.toLocaleString('id-ID')}`,
        image: p.gambar, // Pastikan link gambar sudah ada di database Supabase
        category: categoryName,
        isNew: true, // Atribut isNew bisa Anda ubah logikanya nanti sesuai database
        stok: p.stok
      };
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Gagal mengambil data produk dari database' });
  }
});

module.exports = router;
