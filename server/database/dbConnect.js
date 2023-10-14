import mongoose from "mongoose";

const dbConnect = async (url) => {

    try {
        await mongoose.connect(url);
        console.log("Database connected successful 🍀");

    } catch (error) {
        throw new Error("Database connection error:", error.message);
    }
}

export default dbConnect;