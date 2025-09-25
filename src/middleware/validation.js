module.exports = {
    validatePelangganCreate: (req, res, next) => {
        // Handle both No_Hp and No_HP field names for backward compatibility
        const { Nama, No_Hp, No_HP, Alamat } = req.body;
        const phoneField = No_Hp || No_HP; // Accept both formats
        
        const errors = [];
        if (!Nama || typeof Nama !== 'string' || Nama.trim().length < 2) {
            errors.push('Nama wajib minimal 2 karakter');
        }
        
        // Handle phone number as string (recommended for phone numbers)
        if (!phoneField) {
            errors.push('No. HP wajib diisi');
        } else {
            const phoneStr = String(phoneField).trim();
            if (phoneStr.length < 10) {
                errors.push('No. HP wajib minimal 10 digit');
            }
            // Check if contains only digits
            if (!/^\d+$/.test(phoneStr)) {
                errors.push('No. HP harus berupa angka');
            }
            // Store as string in the correct field name for database
            req.body.No_Hp = phoneStr;
            // Remove the alternative field name if it exists
            if (req.body.No_HP) delete req.body.No_HP;
        }
        
        if (!Alamat || typeof Alamat !== 'string' || Alamat.trim().length < 5) {
            errors.push('Alamat wajib minimal 5 karakter');
        }
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    },
    validatePelangganUpdate: (req, res, next) => {
        // Handle both No_Hp and No_HP field names for backward compatibility
        const { Nama, No_Hp, No_HP, Alamat } = req.body;
        const phoneField = No_Hp || No_HP; // Accept both formats
        
        const errors = [];
        if (Nama !== undefined && (typeof Nama !== 'string' || Nama.trim().length < 2)) {
            errors.push('Jika disertakan, nama wajib minimal 2 karakter');
        }
        
        // Handle phone number as string for update
        if (phoneField !== undefined) {
            const phoneStr = String(phoneField).trim();
            if (phoneStr.length < 10) {
                errors.push('Jika disertakan, No. HP wajib minimal 10 digit');
            } else if (!/^\d+$/.test(phoneStr)) {
                errors.push('No. HP harus berupa angka');
            } else {
                // Store as string in the correct field name for database
                req.body.No_Hp = phoneStr;
                // Remove the alternative field name if it exists
                if (req.body.No_HP) delete req.body.No_HP;
            }
        }
        
        if (Alamat !== undefined && (typeof Alamat !== 'string' || Alamat.trim().length < 5)) {
            errors.push('Jika disertakan, alamat wajib minimal 5 karakter');
        }
        if (errors.length) {
            return res.status(400).json({ errors });
        }   
        next();
    },
    validateLayananCreate: (req, res, next) => {
        const { Jenis_Layanan, Harga, Satuan } = req.body;
        const errors = [];
        if (!Jenis_Layanan || typeof Jenis_Layanan !== 'string' || Jenis_Layanan.trim().length < 2) {
            errors.push('Jenis layanan wajib minimal 2 karakter');        
        }
        if (!Harga || typeof Harga !== 'number' || Harga <= 0) {
            errors.push('Harga wajib angka positif');
        }
        if (!Satuan || typeof Satuan !== 'string' || Satuan.trim().length < 1) {
            errors.push('Satuan wajib diisi');
        }
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    },
    validateLayananUpdate: (req, res, next) => {
        const { Jenis_Layanan, Harga, Satuan } = req.body;
        const errors = [];
        if (Jenis_Layanan !== undefined && (typeof Jenis_Layanan !== 'string' || Jenis_Layanan.trim().length < 2)) {
            errors.push('Jika disertakan, jenis layanan wajib minimal 2 karakter');
        }
        if (Harga !== undefined && (typeof Harga !== 'number' || Harga <= 0)) {
            errors.push('Jika disertakan, harga harus angka positif');
        }
        if (Satuan !== undefined && (typeof Satuan !== 'string' || Satuan.trim().length < 1)) {
            errors.push('Jika disertakan, satuan wajib diisi');
        }
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    },
    validateTransaksiCreate: (req, res, next) => {
        const { pelangganId, layananId, Berat_Cucian, Harga, Total_Harga } = req.body;
        const errors = [];
        if (!pelangganId || typeof pelangganId !== 'number' || pelangganId <= 0) {
            errors.push('ID pelanggan wajib angka positif');
        }
        if (!layananId || typeof layananId !== 'number' || layananId <= 0) {
            errors.push('ID layanan wajib angka positif');
        }
        if (!Berat_Cucian || typeof Berat_Cucian !== 'number' || Berat_Cucian <= 0) {
            errors.push('Berat wajib angka positif');
        }
        if (Total_Harga === undefined) {
            req.body.Total_Harga = Berat_Cucian * Harga;
        }   
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    },
    validateTransaksiUpdate: (req, res, next) => {
        const { pelangganId, layananId, Berat_Cucian, Harga, Total_Harga } = req.body;
        const errors = [];
        if (pelangganId !== undefined && (typeof pelangganId !== 'number' || pelangganId <= 0)) {
            errors.push('Jika disertakan, ID pelanggan wajib angka positif');
        }
        if (layananId !== undefined && (typeof layananId !== 'number' || layananId <= 0)) {
            errors.push('Jika disertakan, ID layanan wajib angka positif');
        }
        if (Berat_Cucian !== undefined && (typeof Berat_Cucian !== 'number' || Berat_Cucian <= 0)) {
            errors.push('Jika disertakan, berat wajib angka positif');
        }
        if (Total_Harga = Berat_Cucian * Harga !== undefined) {
            req.body.Total_Harga = Berat_Cucian * Harga;
        }
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        next();
    }
};
