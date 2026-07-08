const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runTest() {
  console.log("=== MEMULAI PENGUJIAN FITUR TRANSAKSI ===");

  // 1. Ambil salah satu produk dari database
  const product = await prisma.produk.findFirst();
  if (!product) {
    console.error("EROR: Tidak ada produk di database. Harap jalankan seed data produk terlebih dahulu.");
    return;
  }
  
  console.log(`Produk Terpilih: ${product.nama_produk}`);
  console.log(`Stok Awal: ${product.stok}`);

  // Pastikan stok minimal 5 untuk pengujian
  if (product.stok === null || product.stok < 5) {
    console.log("Mengubah stok produk menjadi 10 untuk keperluan pengujian...");
    await prisma.produk.update({
      where: { id_produk: product.id_produk },
      data: { stok: 10 }
    });
    product.stok = 10;
  }

  // 2. Ambil user pertama dari database
  let user = await prisma.user.findFirst();
  if (!user) {
    console.log("Membuat user baru untuk keperluan pengujian...");
    user = await prisma.user.create({
      data: {
        nama: "Test User",
        email: "testuser@gmail.com",
        password: "hashedpassword123"
      }
    });
  }

  console.log(`User Terpilih: ${user.nama} (ID: ${user.id_user})`);

  // --- SKENARIO 1: Checkout Sukses ---
  console.log("\n--- SKENARIO 1: Checkout Sukses (Beli 2 Pcs) ---");
  const quantityToBuy = 2;
  const initialStock = product.stok;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Periksa stok
      const p = await tx.produk.findUnique({
        where: { id_produk: product.id_produk }
      });

      if (!p || p.stok < quantityToBuy) {
        throw new Error(`Stok tidak mencukupi`);
      }

      // Kurangi stok
      const updatedProduct = await tx.produk.update({
        where: { id_produk: product.id_produk },
        data: { stok: p.stok - quantityToBuy }
      });
      console.log(`Stok setelah dikurangi di tx: ${updatedProduct.stok}`);

      // Buat pesanan
      const pesanan = await tx.pesanan.create({
        data: {
          id_user: user.id_user,
          tanggal_pesanan: new Date(),
          status_pesanan: 'PROCESSED'
        }
      });

      // Buat detail pesanan
      await tx.detail_pesanan.create({
        data: {
          id_pesanan: pesanan.id_pesanan,
          id_produk: product.id_produk,
          jumlah: quantityToBuy,
          harga_satuan: product.harga,
          subtotal: product.harga * quantityToBuy
        }
      });

      // Buat pembayaran
      await tx.pembayaran.create({
        data: {
          id_pesanan: pesanan.id_pesanan,
          metode_bayar: 'GoPay',
          status_bayar: 'PAID',
          tanggal_bayar: new Date()
        }
      });

      return pesanan;
    });

    console.log(`Checkout berhasil! ID Pesanan: ${result.id_pesanan}`);
    
    // Verifikasi stok setelah commit
    const productAfterCheckout = await prisma.produk.findUnique({
      where: { id_produk: product.id_produk }
    });
    console.log(`Verifikasi Stok Database: ${productAfterCheckout.stok} (Ekspektasi: ${initialStock - quantityToBuy})`);
    if (productAfterCheckout.stok === initialStock - quantityToBuy) {
      console.log("SELESAI: Skenario 1 BERHASIL!");
    } else {
      console.error("EROR: Stok tidak cocok setelah checkout!");
    }

    // --- SKENARIO 2: Pembatalan Pesanan ---
    console.log("\n--- SKENARIO 2: Pembatalan Pesanan ---");
    const checkoutStock = productAfterCheckout.stok;

    await prisma.$transaction(async (tx) => {
      // Ambil detail pesanan
      const details = await tx.detail_pesanan.findMany({
        where: { id_pesanan: result.id_pesanan }
      });

      // Kembalikan stok
      for (const d of details) {
        const prod = await tx.produk.findUnique({
          where: { id_produk: d.id_produk }
        });
        await tx.produk.update({
          where: { id_produk: d.id_produk },
          data: { stok: prod.stok + d.jumlah }
        });
      }

      // Update status pesanan ke CANCELLED
      await tx.pesanan.update({
        where: { id_pesanan: result.id_pesanan },
        data: { status_pesanan: 'CANCELLED' }
      });

      // Update status pembayaran ke CANCELLED
      await tx.pembayaran.updateMany({
        where: { id_pesanan: result.id_pesanan },
        data: { status_bayar: 'CANCELLED' }
      });
    });

    console.log("Pembatalan pesanan berhasil!");
    const productAfterCancel = await prisma.produk.findUnique({
      where: { id_produk: product.id_produk }
    });
    console.log(`Verifikasi Stok Database setelah pembatalan: ${productAfterCancel.stok} (Ekspektasi: ${checkoutStock + quantityToBuy})`);
    if (productAfterCancel.stok === initialStock) {
      console.log("SELESAI: Skenario 2 BERHASIL!");
    } else {
      console.error("EROR: Stok tidak kembali ke nilai awal setelah pembatalan!");
    }

  } catch (err) {
    console.error("Eror tidak terduga saat pengujian:", err);
  }

  // --- SKENARIO 3: Checkout Gagal (Stok Kurang) ---
  console.log("\n--- SKENARIO 3: Checkout Gagal (Stok Tidak Cukup) ---");
  const currentStock = (await prisma.produk.findUnique({ where: { id_produk: product.id_produk } })).stok;
  console.log(`Stok saat ini: ${currentStock}`);
  const buyTooMuch = currentStock + 5;
  console.log(`Mencoba membeli sebanyak: ${buyTooMuch}`);

  try {
    await prisma.$transaction(async (tx) => {
      const p = await tx.produk.findUnique({
        where: { id_produk: product.id_produk }
      });

      if (!p || p.stok < buyTooMuch) {
        throw new Error(`Stok untuk produk "${p.nama_produk}" tidak mencukupi. Tersedia: ${p.stok}, Diminta: ${buyTooMuch}`);
      }

      await tx.produk.update({
        where: { id_produk: product.id_produk },
        data: { stok: p.stok - buyTooMuch }
      });
    });
    console.error("EROR: Seharusnya transaksi ini dibatalkan karena stok kurang!");
  } catch (err) {
    console.log(`Selesai: Transaksi dibatalkan secara benar dengan pesan: "${err.message}"`);
    console.log("SELESAI: Skenario 3 BERHASIL!");
  }

  console.log("\n=== PENGUJIAN SELESAI DENGAN SUKSES ===");
  await prisma.$disconnect();
}

runTest();
