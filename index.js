require('dotenv').config(); //load env variables

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

//Routes
const layananRoutes = require('./src/routes/layananRoutes');
const pelangganRoutes = require('./src/routes/pelangganRoutes');
const transaksiRoutes = require('./src/routes/transaksiRoutes');

//middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); //for parsing application/json

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

//mount routes
app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/transaksi', transaksiRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

//basic error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error : err.message || 'Internal server error!'});
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
}); 

module.exports = app;// Export app for testing purposes

