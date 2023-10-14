import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js'



export const register = asyncHandler(async (req, res) => {

    const { name, email, password, phNumber } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error(" all fields are required")
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400)
        throw new Error("Email already exists")
    }

    let avatar;

    if (req.body.image) {

        const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.image, { folder: "Stock/avatar" });
        avatar = {
            public_Id: public_id,
            url: secure_url
        }
    }
    else {
        avatar = {
            public_Id: "public_id",
            url: "secure_url"
        }
    }



    const newUser = await User.create({ name, email, password, avatar, phNumber });

    if (!newUser) {
        res.status(500)
        throw new Error("Somthing went wrong , try again")
    }
    res.status(201).json({ success: true, message: "New account created" })
})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        res.status(404)
        throw new Error("User not found")
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if (!isPasswordCorrect) {
        res.status(400)
        throw new Error("Password is incorrect")
    }

    const options = { id: existingUser._id, name: existingUser.name };

    const token = generateToken(options, res)

    res.status(200).json({ success: true, user: existingUser._id, token, message: "User successfully logged in" })
})


export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "")
    res.status(200).json({ success: true, message: "User logged out" })
})