import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js'
import { v2 as cloudinary } from 'cloudinary'

export const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()

    if (!products) {
        res.status(404)
        throw new Error("No products found")
    }

    res.status(200).json(products);


})

export const getStocks = asyncHandler(async (req, res) => {
    const products = await Product.find().select("name stock -_id")

    if (!products) {
        res.status(404)
        throw new Error("No products found")
    }

    res.status(200).json(products);
});

export const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).select(" name email category price _id stock image");

    if (!product) {
        res.status(404)
        throw new Error("Product not found");
    }

    res.status(200).json(product);
})


export const addProduct = asyncHandler(async (req, res) => {

    const { id } = req.user;

    let image;
    if (req.body.image) {

        const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.image, { folder: "Stock/products" })

        image = {
            public_Id: public_id,
            url: secure_url
        }
    }
    else {
        image = {
            public_Id: "public_id",
            url: "secure_url"
        }
    }


    req.body.image = image;

    const newProduct = await Product.create({ ...req.body, user: id });

    if (!newProduct) {
        res.status(400)
        throw new Error("Something went wrong , Try again")
    }
    res.status(201).json({ success: true, message: "New Product Added" })
})


export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        res.status(404)
        throw new Error("Something went wrong , Try again")
    }

    if (!req.body.image) {

        product.name = req.body.name || product.name
        product.category = req.body.category || product.category
        product.price = Number(req.body.price) || product.price
        product.stock = Number(req.body.stock) || product.stock
        await product.save();
    }
    else {

        await cloudinary.uploader.destroy(product.image.public_Id)

        const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.image, { folder: "Stock/products" });
        const image = {
            public_Id: public_id,
            url: secure_url
        }

        product.name = req.body.name || product.name
        product.category = req.body.category || product.category
        product.price = Number(req.body.price) || product.price
        product.stock = Number(req.body.stock) || product.stock
        product.image = image || product.image
        await product.save();
    }

    res.status(200).json({ success: true, message: "Product updated successfully" })
})


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        res.status(400)
        throw new Error("Something went wrong , Try again");
    }

    await cloudinary.uploader.destroy(product.image?.public_Id)

    res.status(200).json({ success: true, message: "Product Deleted successfully" })
})