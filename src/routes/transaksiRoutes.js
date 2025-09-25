const express = require('express');
const router = express.Router();

const transaksiController = require('../controllers/transaksiController');
const {validateTransaksiCreate, validateTransaksiUpdate} = require('../middleware/validation');

//routes

router.get('/', transaksiController.getAll); //public
router.get('/:id', transaksiController.getById); //public
router.post('/', validateTransaksiCreate, transaksiController.create); //protected
router.put('/:id', validateTransaksiUpdate, transaksiController.update); //protected
router.delete('/:id', transaksiController.delete); //protected

module.exports = router;