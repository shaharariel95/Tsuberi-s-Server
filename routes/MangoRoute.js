const express = require('express');
const router = express.Router();
const MangoController = require('../controllers/MangoController');

router.post('/addPalet', MangoController.palletData);
router.post('/getPalet',MangoController.getPalet);


module.exports = router;
