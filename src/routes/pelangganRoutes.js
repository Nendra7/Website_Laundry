const express = require('express');
const router = express.Router();

const pelangganController = require('../controllers/pelangganController');
const {validatePelangganCreate, validatePelangganUpdate} = require('../middleware/validation');

//routes

router.get('/', pelangganController.getAll); //public
router.get('/:id', pelangganController.getById); //public
router.post('/', validatePelangganCreate, pelangganController.create); //protected
router.put('/:id', validatePelangganUpdate, pelangganController.update); //protected
router.delete('/:id', pelangganController.delete); //protected

module.exports = router;