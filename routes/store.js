const express = require('express');
const storeController = require('../controller/storeController');
const router = express.Router();


router.post('/store/create/:id', storeController.createStore);
router.post('/store/add-category/:sellerId/:storeId',storeController.createCategory);
router.post('/store/add-sub-category/:sellerId/:categoryId',storeController.createSubCategory);
router.post('/store/add-inventory/:categoryId/:subCategoryId',storeController.createInventory);



module.exports = router;