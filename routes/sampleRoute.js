const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');

router.get('/', sampleController.getSampleData);
router.get('/demo1', sampleController.getDemo1);
router.get('/demo2', sampleController.getDemo2);

module.exports = router;
