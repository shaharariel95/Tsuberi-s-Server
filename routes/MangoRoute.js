const express = require('express');
const router = express.Router();
const MangoController = require('../controllers/MangoController');

router.post('/Mango', MangoController.palletData);


module.exports = router;
