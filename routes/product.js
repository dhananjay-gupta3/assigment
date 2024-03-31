const express = require('express');
const router = express.Router();
const { getData, getPage, ProductData, PutData, Patchcate, PatchData, DeleteData, Deletecate, CategoryData, CateData, Putcategory } = require('../controllers/Product')


router.get('/product', getData)
router.get('/category', CategoryData)
router.get('/page', getPage);
router.post('/product', ProductData)
router.post('/category', CateData)
router.patch('/product/:productId', PatchData)
router.patch('/category/:categoryId', Patchcate)
router.put('/product', PutData)
router.put('/category', Putcategory)
router.delete('/product/:productId', DeleteData)
router.delete('/category/:categoryId', Deletecate)


module.exports = router;