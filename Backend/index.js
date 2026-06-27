require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 5000;

// Inisialisasi Prisma Client (Secara otomatis akan membaca konfigurasi dari prisma.config.ts)
const prisma = new PrismaClient({});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Test
app.get('/api/test', async (req, res) => {
  try {
    const productCount = await prisma.produk.count();
    res.json({
      message: 'Koneksi ke backend dan database Supabase berhasil!',
      totalProducts: productCount
    });
  } catch (error) {
    console.error('Error testing DB:', error);
    res.status(500).json({ 
      error: 'Gagal terhubung ke database', 
      details: error.message 
    });
  }
});

// Import routers yang baru dibuat
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const cartRoutes = require('./routes/cart');
const transactionsRoutes = require('./routes/transactions');

// Mendaftarkan routes ke Express
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/transactions', transactionsRoutes);

// Menjalankan server Express
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
