type TReviews = {   
    user: {},
    rating: number,
    comment: string
}

type TImage = {
    image: string
}

export interface IRoom {
    _id: string,
    name: string
    description: string,
    images: TImage[],
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
    reviews?: TReviews[],
    createdAt: Date,
}