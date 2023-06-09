const express = require('express');
const sellerController = require('../controller/sellerController');
const router = express.Router();

router.get('/:id', sellerController.getSpecificSellerDetails);




module.exports = router;