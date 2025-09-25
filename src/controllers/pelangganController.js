const pool = require('../config/db');

module.exports = {
    //GET /api/pelanggan
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM pelanggan ORDER BY id DESC');
            res.json(rows);
        } catch (err) {
            next(err);
        }
    },

    //GET /api/pelanggan/:id
    getById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [rows] = await pool.execute('SELECT * FROM pelanggan WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
            res.json(rows[0]);
        } catch (err) {
            next(err);
        }
    },

    //POST /api/pelanggan
    create: async (req, res, next) => {
        try {
            const { Nama, No_Hp, Alamat } = req.body;
            const [result] = await pool.execute('INSERT INTO pelanggan (Nama, No_Hp, Alamat) VALUES (?, ?, ?)', [Nama, No_Hp, Alamat]);
            res.status(201).json({ id: result.insertId, Nama, No_Hp, Alamat });
        } catch (err) {
            next(err);  
        }
    },

    //PUT /api/pelanggan/:id
    update: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { Nama, No_Hp, Alamat } = req.body;

            const fields = [];
            const values = [];
            if (Nama !== undefined) fields.push('Nama = ?'), values.push(Nama);
            if (No_Hp !== undefined) fields.push('No_Hp = ?'), values.push(No_Hp);
            if (Alamat !== undefined) fields.push('Alamat = ?'), values.push(Alamat);
            if (fields.length === 0) return res.status(400).json({ message: 'Tidak ada data untuk diupdate' });

            values.push(id); //untuk WHERE id = ?
            const sql = `UPDATE pelanggan SET ${fields.join(', ')} WHERE id = ?`;
            const [result] = await pool.execute(sql, values);

            if(result.affectedRows === 0) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
            res.json({ message: 'Pelanggan berhasil diperbarui' });
        } catch (err) {
            next(err);
        }
    },
   
    //DELETE /api/pelanggan/:id
    delete: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.execute('DELETE FROM pelanggan WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
            res.json({ message: 'Pelanggan berhasil dihapus' });
        } catch (err) {
            next(err);
        }
    },
};