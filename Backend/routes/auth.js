const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
// Kunci rahasia JWT. Sebaiknya nanti disimpan di file .env
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-rahasia';

// Endpoint Register: POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Mengambil data dari request yang dikirim frontend
    const { nama, email, password } = req.body;

    // 1. Cek apakah email sudah terdaftar di database
    const userExist = await prisma.user.findFirst({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // 2. Enkripsi password menggunakan bcrypt agar tidak terlihat sebagai plain text
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan user baru ke tabel "user"
    const newUser = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ 
      message: 'Registrasi berhasil!', 
      user: { id: newUser.id_user, nama: newUser.nama, email: newUser.email } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal melakukan registrasi' });
  }
});

// Endpoint Login: POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email di database
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email atau password salah' });
    }

    // 2. Cocokkan password yang dikirim dengan password terenkripsi di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email atau password salah' });
    }

    // 3. Buat JWT Token yang berlaku selama 1 hari
    const token = jwt.sign({ id: user.id_user, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ 
      message: 'Login berhasil!', 
      token, 
      user: { id: user.id_user, nama: user.nama, email: user.email } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal melakukan login' });
  }
});

module.exports = router;
