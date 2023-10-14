import express from 'express';

import { getSales, getSingleSales, addSales, updateSales, deleteSales } from '../controllers/salesController.js'


import { Protect } from '../middlewares/authMiddleware.js'

const router = express.Router();


router.route('/').get(Protect, getSales)
router.route('/new').post(Protect, addSales)
router.route('/:id').get(Protect, getSingleSales).put(Protect, updateSales).delete(Protect, deleteSales)

export default router;