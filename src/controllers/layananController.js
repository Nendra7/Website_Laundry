require('dotenv').config();
const pool = require('../config/db');

module.exports = {
    //GET /api/layanan
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM layanan ORDER BY id DESC');
            res.json(rows);
        } catch (err) {
            next(err);
        }
    },

    //GET /api/layanan/:id
    getById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [rows] = await pool.execute('SELECT * FROM layanan WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Layanan tidak ditemukan' });
            res.json(rows[0]);
        } catch (err) {
            next(err);
        }
    },

    //POST /api/layanan
    create: async (req, res, next) => {
        try {
            const { Jenis_Layanan, Harga, Satuan } = req.body;
            const [result] = await pool.execute('INSERT INTO layanan (Jenis_Layanan, Harga, Satuan) VALUES (?, ?, ?)', [Jenis_Layanan, Harga, Satuan]);
            res.status(201).json({ id: result.insertId, Jenis_Layanan, Harga, Satuan });
        } catch (err) {
            next(err);  
        }
    },

    //PUT /api/layanan/:id
    update: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { Jenis_Layanan, Harga, Satuan } = req.body;

            const fields = [];
            const values = [];
            if (Jenis_Layanan !== undefined) fields.push('Jenis_Layanan = ?'), values.push(Jenis_Layanan);
            if (Harga !== undefined) fields.push('Harga = ?'), values.push(Harga);
            if (Satuan !== undefined) fields.push('Satuan = ?'), values.push(Satuan);
            if (fields.length === 0) return res.status(400).json({ message: 'Tidak ada data untuk diupdate' });

            values.push(id); //untuk WHERE id = ?
            const sql = `UPDATE layanan SET ${fields.join(', ')} WHERE id = ?`;
            const [result] = await pool.execute(sql, values);

            if(result.affectedRows === 0) return res.status(404).json({ message: 'Layanan tidak ditemukan' });
            res.json({ message: 'Layanan berhasil diperbarui' });
        } catch (err) {
            next(err);
        }
    },
   
    //DELETE /api/layanan/:id
    delete: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.execute('DELETE FROM layanan WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Layanan tidak ditemukan' });
            res.json({ message: 'Layanan berhasil dihapus' });
        } catch (err) {
            next(err);
        }
    },
};