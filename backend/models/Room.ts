import mongoose from 'mongoose';

interface IReviews {   
    user: string,
    name: string,
    rating: number,
    comment: string
}

interface IImage {
    image: string
}

export interface IRoom extends mongoose.Document {
    name: string
    description: string,
    images: IImage[],
    pricePerNight: Number,
    address: string,
    guestCapacity: Number,
    numOfBeds: Number,
    internet: Boolean,
    airConditioned: Boolean,
    petsAllowed: Boolean,
    roomCleaning: Boolean,
    ratings?: Number,
    numOfReviews?: Number,
    category: 'King' | 'Single' | 'Twins',
    reviews?: IReviews[],
    user: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

const RoomSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    images: [
        {
            image: String
        }
    ],

    pricePerNight: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    guestCapacity: {
        type: Number,
        required: true,
    },

    numOfBeds: {
        type: Number,
        required: true,
    },

    internet: {
        type: Boolean,
        default: false,
    },

    breakfast: {
        type: Boolean,
        default: false,
    },

    airConditioned: {
        type: Boolean,
        default: false,
    },

    petsAllowed: {
        type: Boolean,
        default: false
    },

    roomCleaning: {
        type: Boolean,
        default: false
    },

    ratings: {
        type: Number,
        default: 0
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        required: true,
        enum: ['King', 'Single', 'Twins']
    },

    reviews: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
});

const Room = mongoose.model<IRoom>("Room", RoomSchema);

export default Room;