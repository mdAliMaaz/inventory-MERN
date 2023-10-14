import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLenght: [3, "min length should be greater than 3 characters"]
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    stock: {
        type: Number,
        required: [true, "stock is required"],
    },
    category: {
        type: String,
    },
    image: {
        public_Id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);


export default Product