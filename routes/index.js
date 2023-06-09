const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    return res.json({ "Welcome":  `Welcome to the Divisha Techmology Backend ` });

});

router.use('/api/seller', require('./register'));
router.use('/api/seller', require('./auth'));
router.use('/api/seller', require('./store'));
router.use('/api/seller', require('./seller'));


module.exports = router;