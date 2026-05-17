import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default:"https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema)

export default User
