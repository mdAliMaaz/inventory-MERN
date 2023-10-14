import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({

    quantity: {
        type: Number,
        require: [true, "Quantity is required"]
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    cName: {
        type: String,
    },
    cPhNumber: {
        type: String,
        minLenght: [10, "Phone Number must be 10 characters"]
    },
    totalPrice: Number,
    paymentStatus: {
        type: String,
        default: "pendding"
    }
}, { timestamps: true })



const Sales = mongoose.model("Sales", salesSchema);


export default Sales;