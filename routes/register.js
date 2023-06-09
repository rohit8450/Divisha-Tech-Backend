const express = require('express');
const sellerController = require('../controller/sellerController');

const router = express.Router();

router.post('/register',sellerController.Register);



module.exports = router;