import express from 'express';

import { getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct, getStocks } from '../controllers/productController.js'

import { Protect } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.route('/').get(Protect, getProducts);
router.route('/stock').get(Protect, getStocks);
router.route('/new').post(Protect, addProduct);
router.route('/:id').get(Protect, getSingleProduct).put(Protect, updateProduct).delete(Protect, deleteProduct);


export default router;