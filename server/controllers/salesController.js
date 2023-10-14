import asyncHandler from 'express-async-handler';

import Sales from '../models/salesModel.js'

import Product from '../models/productModel.js';

export const getSales = asyncHandler(async (req, res) => {
    const sales = await Sales.find().select("cName cPhNumber totalPrice paymentStatus createdAt");

    if (!sales) {
        res.status(404)
        throw new Error('Sales not found');
    }
    res.status(200).json(sales);
})

export const getSingleSales = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const singleSale = await Sales.findById(id).populate("product")

    if (!singleSale) {
        res.status(404)
        throw new Error('Sales not found');
    }

    res.status(200).json(singleSale);
})

export const updateSales = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sales = await Sales.findById(id);

    if (!sales) {
        res.status(404)
        throw new Error('Sales not found');
    }

    if (sales.paymentStatus === "pendding") {
        sales.paymentStatus = "paid";
    }
    else {
        sales.paymentStatus = "Pending";
    }
    await sales.save();
    res.status(200).json({ success: true, message: "Update successful" });
})

export const deleteSales = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const deletedSales = await Sales.findByIdAndDelete(id);

    res.status(200).json({ message: "Sales deleted", success: true })
})

export const addSales = asyncHandler(async (req, res) => {

    let product = await Product.findById(req.body.product)
    let newSales;

    if (req.body.quantity > product.stock) {
        res.status(402)
        throw new Error(`You have only ${product.stock} Stocks`)
    }

    if (product.stock > 0) {

        newSales = await Sales.create(req.body);
        product.stock -= newSales.quantity;
        await product.save();
    }
    else {
        res.status(402)
        throw new Error("Product is Out of Stock")
    }

    if (!newSales) {
        res.status(400)
        throw new Error("Something went wrong , please try again")
    }

    res.status(200).json({ success: true, message: "Sales added successfully" })
})

