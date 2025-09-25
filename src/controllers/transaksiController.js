require('dotenv').config();
const pool = require('../config/db');

module.exports = {
    //GET /api/transaksi
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    t.*,
                    p.Nama AS Pelanggan_Name,
                    p.Alamat AS Pelanggan_Alamat,
                    l.Jenis_Layanan AS Layanan_Name,
                    l.Satuan AS Layanan_Satuan
                FROM transaksi t 
                LEFT JOIN pelanggan p ON t.pelangganId = p.id 
                LEFT JOIN layanan l ON t.layananId = l.id 
                ORDER BY t.id DESC
            `);
            res.json(rows);
        } catch (err) {
            next(err);
        }
    },

    //GET /api/transaksi/:id
    getById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [rows] = await pool.execute('SELECT * FROM transaksi WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
            res.json(rows[0]);
        } catch (err) {
            next(err);
        }
    },

    //POST /api/transaksi
    create: async (req, res, next) => {
        try {
            const { pelangganId, layananId, Berat_Cucian } = req.body;
            
            // Validasi input
            if (!pelangganId || !layananId || !Berat_Cucian) {
                return res.status(400).json({ 
                    message: 'pelangganId, layananId, dan Berat_Cucian harus diisi' 
                });
            }

            // Ambil data pelanggan
            const [pelangganRows] = await pool.execute('SELECT * FROM pelanggan WHERE id = ?', [pelangganId]);
            if (pelangganRows.length === 0) {
                return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
            }
            const pelanggan = pelangganRows[0];

            // Ambil data layanan
            const [layananRows] = await pool.execute('SELECT * FROM layanan WHERE id = ?', [layananId]);
            if (layananRows.length === 0) {
                return res.status(404).json({ message: 'Layanan tidak ditemukan' });
            }
            const layanan = layananRows[0];

            // Hitung total harga
            const Total_Harga = layanan.Harga * Berat_Cucian;

            // Insert transaksi dengan data yang diambil dari tabel lain
            const [result] = await pool.execute(
                `INSERT INTO transaksi 
                (Nama_Pelanggan, No_Hp_Pelanggan, Jenis_Layanan, Harga, Berat_Cucian, Total_Harga, pelangganId, layananId) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    pelanggan.Nama, 
                    pelanggan.No_Hp, 
                    layanan.Jenis_Layanan, 
                    layanan.Harga, 
                    Berat_Cucian, 
                    Total_Harga, 
                    pelangganId, 
                    layananId
                ]
            );

            res.status(201).json({ 
                id: result.insertId, 
                Nama_Pelanggan: pelanggan.Nama,
                No_Hp_Pelanggan: pelanggan.No_Hp,
                Jenis_Layanan: layanan.Jenis_Layanan,
                Harga: layanan.Harga,
                Berat_Cucian,
                Total_Harga,
                pelangganId,
                layananId
            });
        } catch (err) {
            next(err);  
        }
    },

    //PUT /api/transaksi/:id
    update: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { pelangganId, layananId, Berat_Cucian } = req.body;
            
            // Validasi input
            if (!pelangganId && !layananId && !Berat_Cucian) {
                return res.status(400).json({ message: 'Minimal salah satu field harus diisi' });
            }

            // Ambil data transaksi yang akan diupdate
            const [existingRows] = await pool.execute('SELECT * FROM transaksi WHERE id = ?', [id]);
            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
            }
            const existing = existingRows[0];

            // Set default values dari data existing
            let finalPelangganId = pelangganId ?? existing.pelangganId;
            let finalLayananId = layananId ?? existing.layananId;
            let finalBeratCucian = Berat_Cucian ?? existing.Berat_Cucian;

            // Ambil data pelanggan
            const [pelangganRows] = await pool.execute('SELECT * FROM pelanggan WHERE id = ?', [finalPelangganId]);
            if (pelangganRows.length === 0) {
                return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
            }
            const pelanggan = pelangganRows[0];

            // Ambil data layanan
            const [layananRows] = await pool.execute('SELECT * FROM layanan WHERE id = ?', [finalLayananId]);
            if (layananRows.length === 0) {
                return res.status(404).json({ message: 'Layanan tidak ditemukan' });
            }
            const layanan = layananRows[0];

            // Hitung ulang total harga
            const Total_Harga = layanan.Harga * finalBeratCucian;

            // Update dengan data yang baru
            const [result] = await pool.execute(
                `UPDATE transaksi SET 
                    Nama_Pelanggan = ?, 
                    No_Hp_Pelanggan = ?, 
                    Jenis_Layanan = ?, 
                    Harga = ?, 
                    Berat_Cucian = ?, 
                    Total_Harga = ?, 
                    pelangganId = ?, 
                    layananId = ? 
                WHERE id = ?`,
                [
                    pelanggan.Nama,
                    pelanggan.No_Hp,
                    layanan.Jenis_Layanan,
                    layanan.Harga,
                    finalBeratCucian,
                    Total_Harga,
                    finalPelangganId,
                    finalLayananId,
                    id
                ]
            );

            if(result.affectedRows === 0) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
            res.json({ 
                message: 'Transaksi berhasil diperbarui',
                data: {
                    id,
                    Nama_Pelanggan: pelanggan.Nama,
                    No_Hp_Pelanggan: pelanggan.No_Hp,
                    Jenis_Layanan: layanan.Jenis_Layanan,
                    Harga: layanan.Harga,
                    Berat_Cucian: finalBeratCucian,
                    Total_Harga,
                    pelangganId: finalPelangganId,
                    layananId: finalLayananId
                }
            });
        } catch (err) {
            next(err);
        }
    },
   
    //DELETE /api/transaksi/:id
    delete: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.execute('DELETE FROM transaksi WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
            res.json({ message: 'Transaksi berhasil dihapus' });
        } catch (err) {
            next(err);
        }
    },
};
    