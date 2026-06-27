require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('Menghapus data lama (jika ada)...');
    await prisma.produk.deleteMany({});
    await prisma.kategori.deleteMany({});

    console.log('Menambahkan Kategori...');
    const catApparel = await prisma.kategori.create({ data: { nama_kategori: 'APPAREL', deskripsi: 'Pakaian dan Jersey' } });
    const catAccessories = await prisma.kategori.create({ data: { nama_kategori: 'ACCESSORIES', deskripsi: 'Aksesoris Esport' } });
    const catEquipment = await prisma.kategori.create({ data: { nama_kategori: 'EQUIPMENT', deskripsi: 'Perlengkapan Gaming' } });

    console.log('Menambahkan Produk...');
    const produkList = [
      {
        id_kategori: catApparel.id_kategori,
        nama_produk: "HS PRO JERSEY 2024 - HOME",
        harga: 450000,
        stok: 50,
        deskripsi: "Jersey utama edisi 2024",
        // Di React (Vite), jika gambar ada di dalam /src, kita bisa meletakkan jalurnya seperti ini, 
        // atau Anda bisa memindahkan foldernya ke folder /public agar mudah diakses.
        // Untuk sekarang, kita simpan URL dummy atau path statis:
        gambar: "/src/pages/Store/Image/Jersey-2026.jpeg"
      },
      {
        id_kategori: catApparel.id_kategori,
        nama_produk: "HS 'VISION' HOODIE GREY",
        harga: 650000,
        stok: 30,
        deskripsi: "Hoodie eksklusif edisi Vision",
        gambar: "/src/pages/Store/Image/Hoodie.png"
      },
      {
        id_kategori: catAccessories.id_kategori,
        nama_produk: "HS CLASSIC CAP - NOIR",
        harga: 249000,
        stok: 100,
        deskripsi: "Topi klasik warna hitam",
        gambar: "/src/pages/Store/Image/Topi.png"
      },
      {
        id_kategori: catEquipment.id_kategori,
        nama_produk: "HS MOUSEPAD XL",
        harga: 399000,
        stok: 75,
        deskripsi: "Mousepad ukuran XL untuk kenyamanan gaming",
        gambar: "/src/pages/Store/Image/Mousepad.png"
      },
      {
        id_kategori: catApparel.id_kategori,
        nama_produk: "HS JERSEY x High School",
        harga: 450000,
        stok: 40,
        deskripsi: "Jersey kolaborasi khusus",
        gambar: "/src/pages/Store/Image/JerseyAway.png"
      },
      {
        id_kategori: catAccessories.id_kategori,
        nama_produk: "HS PIN SET",
        harga: 85000, // Di frontend sebelumnya tertulis Rp 85.000 tapi angkanya 850000 (typo). Saya perbaiki jadi 85000
        stok: 200,
        deskripsi: "Set pin logo eksklusif",
        gambar: "/src/pages/Store/Image/Pinset.png"
      }
    ];

    await prisma.produk.createMany({ data: produkList });

    console.log('✅ Semua kategori dan produk berhasil dimasukkan ke Supabase!');
  } catch (error) {
    console.error('❌ Gagal memasukkan data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
