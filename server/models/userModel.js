import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLenght: [3, "min length should be greater than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email is already taken"]
    },
    password: {
        type: String    ,
        required: [true, "password is required"],
    },
    phNumber: {
        type: String,
        minLenght: [10, "phNumber must be  10 characters"],
    },
    avatar: {
        public_Id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
}, { timestamps: true })

// hasing password here!
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }
    this.password = bcrypt.hashSync(this.password);
})


const User = mongoose.model("User", userSchema);


export default User;