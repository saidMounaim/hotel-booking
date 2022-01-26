import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {

    name: string,
    email: string,
    password: string,
    avatar?: string,
    createdAt: Date,
    updatedAt: Date

}

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
    },

}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;