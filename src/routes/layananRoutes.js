const express = require('express');
const router = express.Router();

const layananController = require('../controllers/layananController');
const {validateLayananCreate, validateLayananUpdate} = require('../middleware/validation');

//routes

router.get('/', layananController.getAll); //public
router.get('/:id', layananController.getById); //public
router.post('/', validateLayananCreate, layananController.create); //protected
router.put('/:id', validateLayananUpdate, layananController.update); //protected
router.delete('/:id', layananController.delete); //protected

module.exports = router;