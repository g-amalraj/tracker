import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }, 
    role: {
        type: String,
        enum: ["User", "Admin", "Manager"],
       
    },
    place: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String, 
    },
    manager: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true,
        maxlength: [10, 'Phone number can not be longer than 10 characters'],
    },
},{
    timestamps: true,
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 })

const User = mongoose.model("User", userSchema);

export default User;